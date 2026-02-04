"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function HexClock() {
  const [ time, setTime ] = useState<Date | null>( null );
  const [ copied, setCopied ] = useState( false );

  useEffect( () => {
    setTime( new Date() );
    const timer = setInterval( () => setTime( new Date() ), 1000 );
    return () => clearInterval( timer );
  }, [] );

  const copyToClipboard = ( text: string ) => {
    navigator.clipboard.writeText( text );
    setCopied( true );
    setTimeout( () => setCopied( false ), 2000 );
  };

  if ( !time ) return <div className="h-96 w-full animate-pulse rounded-4xl bg-muted/20"/>;

  const format = ( n: number ) => n.toString().padStart( 2, "0" );

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hexColor = `#${ format( h ) }${ format( m ) }${ format( s ) }`;

  // Scale time to 0-255RGB for a vibrant background
  const r = Math.round( ( h / 23 ) * 255 );
  const g = Math.round( ( m / 59 ) * 255 );
  const b = Math.round( ( s / 59 ) * 255 );
  const visualColor = `rgb(${ r }, ${ g }, ${ b })`;

  return (
    <div className="w-full lg:min-w-2xl mx-auto">
      <div
        className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/10 bg-background">

        {/* --- BACKGROUND LAYER --- */ }
        {/* FIXED: Removed 'opacity-20' so it is fully solid and matches the swatch */ }
        <div
          className="absolute inset-0 transition-colors duration-1000 ease-linear"
          // style={ { backgroundColor: visualColor } }
        />

        {/* Optional: Subtle vignette to help text pop on very bright colors */ }
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none"/>

        {/* --- CONTENT --- */ }
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center">

          <span
            className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mix-blend-normal dark:text-white/80 dark:mix-blend-overlay">
            Current Hex Value
          </span>

          <div className="group relative cursor-default">
            {/* Added stronger drop-shadow to ensure readability on bright backgrounds */ }
            <h1
              className="font-sans text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-9xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              <span className="text-zinc-300 dark:text-white/60">#</span>
              { format( h ) }
              { format( m ) }
              { format( s ) }
            </h1>

            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-bold text-zinc-600 dark:text-white/90 whitespace-nowrap drop-shadow-md">
                (Visualized as RGB: { r }, { g }, { b })
              </span>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={ () => copyToClipboard( hexColor ) }
              className="group flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/20 bg-zinc-100 dark:bg-black/20 px-6 py-2 font-mono text-sm font-medium backdrop-blur-md transition-all hover:bg-zinc-200 dark:hover:bg-black/40 hover:scale-105 active:scale-95"
            >
              { copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400"/>
                  <span className="text-green-600 dark:text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy
                    className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:text-white/70 dark:group-hover:text-white"/>
                  <span
                    className="text-zinc-500 group-hover:text-zinc-900 dark:text-white/70 dark:group-hover:text-white">
                    { hexColor }
                  </span>
                </>
              ) }
            </button>

            {/* Swatch matches background perfectly now */ }
            <div
              className="h-8 w-8 rounded-full border-2 border-zinc-200 dark:border-white/20 shadow-lg transition-colors duration-1000"
              style={ { backgroundColor: visualColor } }
            />
          </div>
        </div>

        {/* Grid Overlay */ }
        <div
          className="pointer-events-none absolute inset-0
  bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]
  dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
  bg-size-[24px_24px]
  mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
      </div>
    </div>
  );
}