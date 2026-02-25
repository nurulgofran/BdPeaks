import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Mountain, Menu, X, Compass, Map, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { to: "/", label: "Home", icon: Mountain },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/map", label: "Map", icon: Map },
  { to: "/contribute", label: "Contribute", icon: PlusCircle },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 md:h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Mountain className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tight">
            BD <span className="text-primary">Peaks</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              activeClassName="text-primary bg-primary/10"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background border-border">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col gap-2 mt-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                  activeClassName="text-primary bg-primary/10"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
