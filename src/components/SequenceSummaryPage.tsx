import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import HeaderWithNav from "./Nav";
import ProgressStepsBar from "./ProgressStepsBar";
import SummaryContent from "./SummaryContent";

const SequenceSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      <Breadcrumb />
      <ProgressStepsBar currentStep={3} />
      <div className="max-w-7xl mx-auto">
        <SummaryContent onPrev={() => navigate("/")} onNext={() => {}} />
      </div>
    </div>
  );
};

export default SequenceSummaryPage;
