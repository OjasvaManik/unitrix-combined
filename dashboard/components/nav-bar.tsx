"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { ballet } from "@/types/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Copy, HomeIcon } from "lucide-react";

const HexTime = () => {
  const [ time, setTime ] = useState<Date | null>( null );
  const [ copied, setCopied ] = useState( false );

  useEffect( () => {
    setTime( new Date() );
    const timer = setInterval( () => setTime( new Date() ), 1000 );
    return () => clearInterval( timer );
  }, [] );

  if ( !time ) return <div className="w-32 animate-pulse bg-muted/20 rounded-4xl"/>;

  const format = ( n: number ) => n.toString().padStart( 2, "0" );
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hexColor = `#${ format( h ) }${ format( m ) }${ format( s ) }`;

  const r = Math.round( ( h / 23 ) * 255 );
  const g = Math.round( ( m / 59 ) * 255 );
  const b = Math.round( ( s / 59 ) * 255 );
  const visualColor = `rgb(${ r }, ${ g }, ${ b })`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText( hexColor );
    setCopied( true );
    setTimeout( () => setCopied( false ), 2000 );
  };

  return (
    <button
      onClick={ copyToClipboard }
      className="group flex items-center gap-2 transition-all active:scale-95"
    >
      { copied ? (
        <Check className="h-3 w-3 text-green-500 animate-in zoom-in"/>
      ) : (
        <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"/>
      ) }
      <div
        className="text-xl leading-none tracking-widest text-zinc-900 dark:text-white flex items-center gap-2">
        <span>{ hexColor }</span>
      </div>
      <div
        className="h-4 w-4 lg:h-7 lg:w-7 rounded-full shadow-sm border border-black/10 dark:border-white/10 transition-colors duration-1000"
        style={ { backgroundColor: visualColor } }
      />
    </button>
  );
};

const NavBar = () => {
  const [ isAtBottom, setIsAtBottom ] = useState( false );

  useEffect( () => {
    const handleScroll = () => {
      // Logic: (Scroll Position + Window Height) >= Total Document Height - small buffer
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

      setIsAtBottom( scrolledToBottom );
    };

    handleScroll(); // Check immediately on mount (in case page is short)
    window.addEventListener( "scroll", handleScroll );
    window.addEventListener( "resize", handleScroll ); // Check on resize too

    return () => {
      window.removeEventListener( "scroll", handleScroll );
      window.removeEventListener( "resize", handleScroll );
    };
  }, [] );

  return (
    <div
      className={ cn(
        "flex gap-1 m-2 mx-3 lg:mx-4 px-1 rounded-4xl border transition-colors duration-300 bg-background border-border/50 shadow-lg",
        // Logic flipped: apply styling only when at bottom
        isAtBottom ? 'bg-sidebar' : 'bg-background border-transparent'
      ) }
    >
      <div
        className="flex-1 py-4 flex justify-between items-center">
        <Link
          href={ "/" }
          className={ cn(
            ballet.className,
            "text-3xl hover:text-destructive transition-colors duration-300 ml-4"
          ) }
        >
          <Button className={ 'rounded-full h-10 w-10' }>
            <HomeIcon/>
          </Button>
        </Link>
        <HexTime/>
        <div className="flex justify-center items-center space-x-1">
          <Button className="rounded-full">Services</Button>
          <ThemeToggle/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;