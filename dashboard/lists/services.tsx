import { HardDrive, StickyNote, TerminalSquare } from "lucide-react";
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
    title: 'Drive',
    link: '/drive',
    category: 'external',
    icon: HardDrive
  },
  {
    title: 'Terminal',
    link: '/terminal',
    category: 'external',
    icon: TerminalSquare
  },
]