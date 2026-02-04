"use client";

import React, { useEffect, useRef, useState } from "react";
import { Brain, Coffee, Pause, Play, RotateCcw, Zap } from "lucide-react";

type Mode = "focus" | "shortBreak" | "longBreak";

const MODES: Record<Mode, { label: string; minutes: number }> = {
  focus: {
    label: "FOCUS",
    minutes: 25,
  },
  shortBreak: {
    label: "SHORT BREAK",
    minutes: 5,
  },
  longBreak: {
    label: "LONG BREAK",
    minutes: 15,
  },
};

export default function HexPomodoro() {
  const [ mode, setMode ] = useState<Mode>( "focus" );
  const [ timeLeft, setTimeLeft ] = useState( MODES.focus.minutes * 60 );
  const [ isActive, setIsActive ] = useState( false );

  const timerRef = useRef<NodeJS.Timeout | null>( null );
  const audioRef = useRef<HTMLAudioElement | null>( null );

  useEffect( () => {
    setIsActive( false );
    setTimeLeft( MODES[ mode ].minutes * 60 );
    if ( timerRef.current ) clearInterval( timerRef.current );
  }, [ mode ] );

  useEffect( () => {
    if ( isActive && timeLeft > 0 ) {
      timerRef.current = setInterval( () => {
        setTimeLeft( ( prev ) => prev - 1 );
      }, 1000 );
    } else if ( timeLeft === 0 ) {
      setIsActive( false );
      if ( timerRef.current ) clearInterval( timerRef.current );

      // Play Audio when time is up
      if ( audioRef.current ) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch( ( e ) => console.error( "Audio play failed:", e ) );
      }
    }
    return () => {
      if ( timerRef.current ) clearInterval( timerRef.current );
    };
  }, [ isActive, timeLeft ] );

  const format = ( n: number ) => n.toString().padStart( 2, "0" );
  const minutes = Math.floor( timeLeft / 60 );
  const seconds = timeLeft % 60;

  const toggleTimer = () => setIsActive( !isActive );
  const resetTimer = () => {
    setIsActive( false );
    setTimeLeft( MODES[ mode ].minutes * 60 );
    if ( audioRef.current ) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="w-full lg:min-w-2xl mx-auto">
      <audio ref={ audioRef } src="/alarm.wav" preload="auto"/>
      <div
        className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/10">

        {/* --- BACKGROUND LAYER --- */ }
        <div className="absolute inset-0 bg-card transition-colors duration-300"/>

        {/* Vignette */ }
        {/*<div*/ }
        {/*  className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-foreground)) opacity-5 pointer-events-none"/>*/ }

        {/* --- CONTENT --- */ }
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center">

          {/* Mode Selector Pill */ }
          <div className="mb-6 flex gap-1 rounded-full bg-secondary/50 p-1 backdrop-blur-md">
            <button
              onClick={ () => setMode( "focus" ) }
              className={ `flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                mode === "focus"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }` }
            >
              <Brain className="h-3 w-3"/> Focus
            </button>
            <button
              onClick={ () => setMode( "shortBreak" ) }
              className={ `flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                mode === "shortBreak"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }` }
            >
              <Coffee className="h-3 w-3"/> Short
            </button>
            <button
              onClick={ () => setMode( "longBreak" ) }
              className={ `flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                mode === "longBreak"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }` }
            >
              <Zap className="h-3 w-3"/> Long
            </button>
          </div>

          <div className="group relative cursor-default select-none">
            {/* Main Time Display */ }
            <h1
              className="font-sans text-7xl lg:text-9xl font-black tracking-tight text-foreground drop-shadow-sm">
              { format( minutes ) }
              <span className="text-muted-foreground/50">:</span>
              { format( seconds ) }
            </h1>
          </div>

          {/* Controls */ }
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={ toggleTimer }
              className="group flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-8 py-3 font-mono text-lg font-medium text-secondary-foreground backdrop-blur-md transition-all hover:bg-secondary hover:scale-105 active:scale-95"
            >
              { isActive ? <Pause className="h-5 w-5 fill-current"/> :
                <Play className="h-5 w-5 fill-current"/> }
              <span>{ isActive ? "PAUSE" : "START" }</span>
            </button>

            <button
              onClick={ resetTimer }
              className="group flex items-center justify-center rounded-full border border-border bg-secondary/80 p-3 text-secondary-foreground backdrop-blur-md transition-all hover:bg-secondary hover:rotate-180 hover:scale-105 active:scale-95"
              aria-label="Reset Timer"
            >
              <RotateCcw className="h-5 w-5"/>
            </button>
          </div>
        </div>

        {/* Grid Overlay - Fixed: Single line class string to prevent hydration mismatch */ }
        {/*<div*/ }
        {/*  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-size-[24px_24px] opacity-5 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">*/ }
        {/*</div>*/ }
      </div>
    </div>
  );
}