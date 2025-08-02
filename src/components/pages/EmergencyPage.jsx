import React from "react";
import EmergencySupport from "@/components/organisms/EmergencySupport";

const EmergencyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <EmergencySupport />
      </div>
    </div>
  );
};

export default EmergencyPage;