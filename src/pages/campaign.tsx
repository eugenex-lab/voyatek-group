// src/pages/campaign.tsx
import React from "react";
import DashboardLayout from "../layouts/dashboard-layout";

const Campaign = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-2xl text-primary">Campaign</h1>
      </div>
      <div
        className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaign;
