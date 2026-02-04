"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [ query, setQuery ] = useState( "" );

  const handleSearch = ( e: React.FormEvent ) => {
    e.preventDefault();
    if ( !query ) return;

    const url = `https://www.google.com/search?q=${ encodeURIComponent( query ) }`;
    // '_blank' opens the URL in a new tab
    window.open( url, '_blank' );

    // Optional: Clear the search bar after searching
    setQuery( "" );
  };

  return (
    <form
      onSubmit={ handleSearch }
      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-4xl border border-border bg-card px-6 py-4 shadow-sm transition-all focus-within:border-primary focus-within:shadow-md hover:border-primary/50"
    >
      <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors"/>
      <input
        type="text"
        value={ query }
        onChange={ ( e ) => setQuery( e.target.value ) }
        placeholder="Where to?"
        className="w-full bg-transparent font-sans text-xl font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
      />
      <div
        className="pointer-events-none absolute right-6 rounded border border-border bg-muted/20 px-2 py-0.5 text-xs font-mono text-muted-foreground opacity-50">
        ENTER
      </div>
    </form>
  );
};