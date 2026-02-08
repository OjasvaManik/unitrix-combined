import { HardDrive, ListChecks, StickyNote, TerminalSquare } from "lucide-react";
import { ServicesList } from "@/types/types";

// Make sure your type definition includes 'icon?: any' or 'icon?: React.ComponentType'

export const services: ServicesList[] = [
  // --- Native Apps ---
  {
    title: 'Notes',
    link: '/note-system',
    category: 'native',
    icon: StickyNote
  },

  // --- External Apps ---
  {
    title: 'Drive (FileBrowser)',
    link: '/drive',
    category: 'external',
    icon: HardDrive
  },
  {
    title: 'Terminal (ttyd)',
    link: '/terminal',
    category: 'external',
    icon: TerminalSquare
  },
  // {
  //   title: 'Tracker (Ryot)',
  //   link: 'https://lenovo.taildb46c9.ts.net:8443',
  //   category: 'external',
  //   icon: ScrollText
  // },
  {
    title: 'Todo (Todoist)',
    link: 'https://app.todoist.com/app/projects/active',
    category: 'external',
    icon: ListChecks
  }
]