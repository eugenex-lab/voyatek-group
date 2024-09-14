// src/components/PageLayout.tsx
import React, { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  headerComponent?: ReactNode; // Optional component
}


const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  headerComponent,
}) => {
  return (
    <>
      <div className="flex items-center justify-between w-full gap-4 md:flex-row">
        <h1 className="text-lg font-bold md:text-2xl text-primary">{title}</h1>
        {headerComponent && <div>{headerComponent}</div>}{" "}
        {/* Render the optional header component */}
      </div>
      <div
        className="flex flex-1 border rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center w-full gap-1 p-6 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default PageLayout;
