"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";
import HeaderRight from "./HeaderRight";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <header className="flex items-center justify-between lg:justify-end px-4 py-3">
      {/* Mobile menu button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden p-2 rounded-md hover:bg-accent">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="px-4 py-2 text-lg font-semibold">
            {""}
          </SheetTitle>
          <Sidebar closeSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Right side actions*/}
      <div className="flex-end">
        <HeaderRight />
      </div>
    </header>
  );
}
