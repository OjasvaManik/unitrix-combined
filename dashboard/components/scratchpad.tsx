"use client";
import React, { useEffect, useState } from 'react';

const Scratchpad = () => {
  const [ note, setNote ] = useState( '' );

  // 1. Fetch data from server on mount
  useEffect( () => {
    fetch( '/api/scratchpad' )
      .then( res => res.json() )
      .then( data => {
        if ( data.content ) setNote( data.content );
      } );
  }, [] );

  // 2. Auto-save with a debounced (waits 1s after typing stops)
  useEffect( () => {
    const timeoutId = setTimeout( () => {
      fetch( '/api/scratchpad', {
        method: 'POST',
        body: JSON.stringify( { content: note } ),
      } );
    }, 1000 );

    return () => clearTimeout( timeoutId );
  }, [ note ] );

  return (
    <div
      className="flex flex-col h-full min-h-[200px] w-full rounded-4xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50">
      <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-2">
        <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Scratchpad
        </label>
        {/* Simple visual indicator that it's a local file */ }
        <span className="font-mono text-[10px] text-muted-foreground opacity-50">
          ./scratchpad.txt
        </span>
      </div>
      <textarea
        value={ note }
        onChange={ ( e ) => setNote( e.target.value ) }
        placeholder="// Local buffer..."
        className="flex-1 resize-none bg-transparent font-sans text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/30 focus:outline-none custom-scrollbar"
        spellCheck={ false }
      />
    </div>
  );
};

export default Scratchpad;