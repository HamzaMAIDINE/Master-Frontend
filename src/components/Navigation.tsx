import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Home, Activity, Video, FileText, BarChart3 } from "lucide-react";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Home className="h-5 w-5 mr-2" /> 
    },
    { 
      name: "Injury Prediction", 
      path: "/injury-prediction", 
      icon: <Activity className="h-5 w-5 mr-2" /> 
    },
    { 
      name: "Video Analysis", 
      path: "/video-analysis", 
      icon: <Video className="h-5 w-5 mr-2" /> 
    },
    { 
      name: "Video Summarization", 
      path: "/video-summarization", 
      icon: <FileText className="h-5 w-5 mr-2" /> 
    },
    /*{ 
      name: "Team Statistics", 
      path: "/team-statistics", 
      icon: <BarChart3 className="h-5 w-5 mr-2" /> 
    },*/
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title on the left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
                <span className="text-secondary-foreground font-bold">CS</span>
              </span>
              <span className="font-bold text-lg hidden sm:inline-block">Combat Insight</span>
            </Link>
          </div>

          {/* Desktop Navigation on the right */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary bold"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-16 z-50 bg-background border-b md:hidden",
          isOpen ? "block animate-fade-in" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-accent"
                onClick={closeMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
