// src/components/Campaign.tsx
import { DataTable } from "@/components/all-campaign/campaign-table";
import PageLayout from "@/layouts/page-layout";
import React from "react";

const Campaign: React.FC = () => {
  return (
    <PageLayout title="All Campaign">
      <DataTable />
    </PageLayout>
  );
};

export default Campaign;
