import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "@/components/commons/header"; // Import the new Header component
import SidebarMd from "@/components/commons/side-bar-md";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="grid min-h-screen w-full md:grid-row-[220px_1fr] lg:grid-row-[280px_1fr] bg-background">
      <Header />
      <div className="flex flex-row w-full p-6">
        {/* Use the new Header component here */}
        <SidebarMd />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="flex flex-col flex-1 gap-4 p-4 rounded md:ml-8 bg-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
          <Toaster />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
