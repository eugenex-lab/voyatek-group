// src/pages/overview.tsx
import React from "react";
import DashboardLayout from "../layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        <h1 className="text-lg font-semibold md:text-2xl text-primary">
          Overview
        </h1>
        <div>
          <DatePickerWithRange />
        </div>
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
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
