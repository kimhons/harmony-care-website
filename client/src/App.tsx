import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GroupHomes from "./pages/GroupHomes";
import IcfId from "./pages/IcfId";
import Pricing from "./pages/Pricing";
import Agents from "./pages/Agents";
import Demo from "./pages/Demo";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Referrals from "./pages/Referrals";
import About from "./pages/About";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/signup"} component={Signup} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/referrals"} component={Referrals} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/agents" component={Agents} />
      <Route path="/demo" component={Demo} />
      <Route path={"/solutions/group-homes"} component={GroupHomes} />
      <Route path={"/solutions/icf-id"} component={IcfId} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
