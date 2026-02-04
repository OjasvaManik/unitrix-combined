import Link from "next/link";
import { ArrowUpRight, Box } from "lucide-react";

export const ServiceCard = ( { app }: { app: any } ) => {
  const Icon = app.icon || Box;

  return (
    <Link
      href={ app.link }
      className="group relative flex items-center gap-4 rounded-4xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md active:border-primary active:shadow-md active:scale-[0.98]"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-active:bg-primary group-active:text-primary-foreground">
        <Icon className="h-5 w-5"/>
      </div>

      <div className="flex-1">
        <h4 className="font-sans text-lg leading-none tracking-tight">
          { app.title }
        </h4>
      </div>

      <ArrowUpRight
        className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 group-active:opacity-100 group-active:-translate-y-1 group-active:translate-x-1"/>
    </Link>
  )
}