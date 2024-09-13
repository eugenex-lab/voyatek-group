import React from "react";
import DashboardLayout from "../layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Plus } from "lucide-react";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/json/empty-state.json";

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        <h1 className="text-lg font-bold md:text-2xl text-primary">Overview</h1>
        <div>
          <DatePickerWithRange />
        </div>
      </div>
      <div
        className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center lg:mb-20">
          <Lottie
            loop
            animationData={lottieJson}
            play
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80" // Responsive sizes
          />

          <p className="text-sm font-semibold text-black">
            No activity yet. Create a new campaign to get started
          </p>
          <Button className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3">
            <Plus className="w-5 h-5 text-white" />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
