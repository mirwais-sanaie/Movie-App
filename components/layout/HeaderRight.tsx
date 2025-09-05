"use client";

import { Search, Sun, Moon, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // shadcn switch

export default function HeaderRight() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* Search Button */}
      <Button
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Theme Toggle */}
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={darkMode}
          onCheckedChange={setDarkMode}
          className="data-[state=checked]:bg-primary"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Logout */}
      <Button
        size="icon"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 rounded-lg"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}
