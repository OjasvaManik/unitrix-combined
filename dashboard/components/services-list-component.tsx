import React from 'react'
import { services } from "@/lists/services";
import { ServiceCard } from "@/components/service-card";

const ServicesListComponent = () => {
  const nativeApps = services.filter( ( s ) => s.category === 'native' )
  const externalApps = services.filter( ( s ) => s.category === 'external' )

  // Reusable scroll container
  const ScrollableSection = ( { title, apps }: { title: string, apps: typeof services } ) => (
    <section className="space-y-4">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        { title }
      </h3>

      {/* UPDATED HEIGHT LOGIC:
         1. Card Height approx: 74px (40px icon + 32px padding + 2px border)
         2. 3 Rows calculation: (74px * 3) + (16px gap * 2) = ~254px
         3. Set max-h-[260px] to cut off right after the 3rd row.
      */ }
      <div
        className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:grid-rows-4 lg:overflow-y-auto lg:pb-0 lg:max-h-[344px]">
        { apps.map( ( app ) => (
          <div
            key={ app.title }
            className="w-[min(85vw,300px)] shrink-0 snap-center lg:w-auto"
          >
            <ServiceCard app={ app }/>
          </div>
        ) ) }
      </div>
    </section>
  );

  return (
    <div className="w-full space-y-2 lg:space-y-6">
      <ScrollableSection title="Native Apps" apps={ nativeApps }/>
      <ScrollableSection title="External Apps" apps={ externalApps }/>
    </div>
  )
}

export default ServicesListComponent