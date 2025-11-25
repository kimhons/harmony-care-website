import { Link } from "wouter";
import { Heart } from "lucide-react";
import { APP_TITLE } from "@/const";

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">{APP_TITLE}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Native Care Management for Residential Facilities
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Overview</Link></li>
              <li><Link href="/agents" className="hover:text-foreground transition-colors">20 AI Agents</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions/group-homes" className="hover:text-foreground transition-colors">For Group Homes</Link></li>
              <li><Link href="/solutions/icf-id" className="hover:text-foreground transition-colors">For ICF-ID</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">For Families</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2 Certified</p>
        </div>
      </div>
    </footer>
  );
}
