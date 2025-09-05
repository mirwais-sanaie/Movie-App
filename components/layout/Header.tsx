import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      {/* Mobile menu button */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden p-2 rounded-md hover:bg-accent">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="px-4 py-2 text-lg font-semibold">
            {""}
          </SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Right side actions (if needed) */}
      <div className="flex-end">
        <HeaderRight />
      </div>
    </header>
  );
}
