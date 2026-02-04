"use client";

import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [ greeting, setGreeting ] = useState( "" );
  const [ date, setDate ] = useState( "" );

  useEffect( () => {
    const update = () => {
      const now = new Date();
      const hour = now.getHours();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };

      setDate( now.toLocaleDateString( 'en-US', options ) );

      if ( hour < 12 ) setGreeting( "Good morning." );
      else if ( hour < 18 ) setGreeting( "Good afternoon." );
      else setGreeting( "Good evening." );
    };

    update();
  }, [] );

  return (
    <div className="flex flex-col space-y-1 py-2 pl-2">
      <h1 className="font-sans text-4xl font-black tracking-wide text-foreground lg:text-5xl">
        { greeting }
      </h1>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        { date }
      </p>
    </div>
  );
};

export default Greeting;