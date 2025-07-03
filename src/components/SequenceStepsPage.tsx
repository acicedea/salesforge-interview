import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import HeaderWithNav from "./Nav";
import ProgressStepsBar from "./ProgressStepsBar";
import StepsForm from "./StepsForm";
import axios from "axios";

export interface Step {
  subject: string;
  content: string;
  label: string;
}

const defaultStep: Step = {
  subject: "",
  content: "",
  label: "Email"
};

const STORAGE_KEY = "sequence_steps";

const SequenceStepsPage: React.FC = () => {
  // Load from sessionStorage if available, otherwise default
  const [steps, setSteps] = useState<Step[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved
      ? (JSON.parse(saved) as Step[])
      : [{ ...defaultStep, label: "Initial email" }];
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Persist steps to sessionStorage on every change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  }, [steps]);

  const handleAddStep = () => {
    setSteps([...steps, { ...defaultStep, label: `Step ${steps.length + 1}` }]);
  };

  const handleDeleteStep = (idx: number) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const handleChangeStep = (idx: number, field: keyof Step, value: string) => {
    setSteps((prev) =>
      prev.map((step, i) => {
        if (i !== idx) return step;
        if (field === "subject") {
          return {
            ...step,
            subject: value,
            label: value || (i === 0 ? "Initial email" : `Step ${i + 1}`)
          };
        }
        return { ...step, [field]: value };
      })
    );
  };

  const handleNext = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5050/sequences", {
        steps
      });
      setLoading(false);
      navigate("/summary");
    } catch (err) {
      setError("Failed to save sequence.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto">
        <ProgressStepsBar currentStep={2} />
        <StepsForm
          steps={steps}
          onAddStep={handleAddStep}
          onDeleteStep={handleDeleteStep}
          onChangeStep={handleChangeStep}
          onPrev={() => {}}
          onNext={handleNext}
        />
        {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default SequenceStepsPage;
