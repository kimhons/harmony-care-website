import { Button } from "@/components/ui/button";
import { APP_TITLE, APP_LOGO } from "@/const";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setSolutionsOpen(false);
    }, 300); // 300ms delay before closing
    setCloseTimeout(timeout);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-14">
            <Link href="/">
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                 <img src={APP_LOGO} alt="HarmonyCare" className="h-10" />
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/agents" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Agents
              </Link>
              
              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {solutionsOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href="/solutions/group-homes" className="block px-4 py-3 hover:bg-accent/10 transition-colors">
                      <div className="font-medium text-sm text-foreground">Group Homes</div>
                      <div className="text-xs text-muted-foreground mt-0.5">For 1-10 residents</div>
                    </Link>
                    <Link href="/solutions/icf-id" className="block px-4 py-3 hover:bg-accent/10 transition-colors border-t border-border">
                      <div className="font-medium text-sm text-foreground">ICF-ID Facilities</div>
                      <div className="text-xs text-muted-foreground mt-0.5">For 16-50+ residents</div>
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              
              <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
              
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>         </div>

            <div className="flex items-center gap-3">
              <Button 
                className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                onClick={() => window.location.href = '/demo'}
              >
                Schedule Demo
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-out Panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Slide-out Panel */}
        <div
          className={`absolute top-14 right-0 bottom-0 w-[280px] bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <nav className="flex flex-col gap-1">
              <Link href="/agents">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Agents
                </div>
              </Link>
              
              {/* Solutions Section */}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Solutions
              </div>
              <Link href="/solutions/group-homes">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div>Group Homes</div>
                  <div className="text-xs text-muted-foreground mt-0.5">For 1-10 residents</div>
                </div>
              </Link>
              <Link href="/solutions/icf-id">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div>ICF-ID Facilities</div>
                  <div className="text-xs text-muted-foreground mt-0.5">For 16-50+ residents</div>
                </div>
              </Link>
              
              <Link href="/pricing">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </div>
              </Link>
              <Link href="/about">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </div>
              </Link>
              <a 
                href="#resources" 
                className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </a>
              <Link href="/blog">
                <div 
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </div>
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-border">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/demo';
                }}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
