import React from 'react'
import ServicesListComponent from "@/components/services-list-component";
import { SearchBar } from "@/components/search-bar";
import Greeting from "@/components/greeting";
import Scratchpad from "@/components/scratchpad";
import HexPomodoro from "@/components/hex-pomodoro";

const HomePage = () => {
  return (
    <div className="p-2 lg:mx-4">

      {/* 1. Greeting - Moved outside the grid so it sits on top */ }
      <div className="mb-4">
        <Greeting/>
      </div>

      {/* Grid Layout: Starts below Greeting */ }
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-6">

        {/* LEFT COLUMN - Now starts with Search */ }
        <div className="flex flex-col space-y-4 lg:col-span-7">
          <SearchBar/>

          <div className="pt-4">
            <ServicesListComponent/>
          </div>
        </div>

        {/* RIGHT COLUMN - Starts at the same height as Search */ }
        <div className="flex flex-col space-y-4 lg:col-span-5">
          <div className="w-full">
            <HexPomodoro/>
          </div>

          <div className="flex-1">
            <Scratchpad/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage