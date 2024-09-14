// src/components/Campaign.tsx
import PageLayout from "@/layouts/page-layout";
import React from "react";

const Campaign: React.FC = () => {
  return (
    <PageLayout title="Campaign">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no products
      </h3>
      <p className="text-sm text-muted-foreground">
        You can start selling as soon as you add a product.
      </p>
    </PageLayout>
  );
};

export default Campaign;
