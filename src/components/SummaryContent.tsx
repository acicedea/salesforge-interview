import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderWithNav from "./Nav";

type StepsFormProps = {
  onPrev: () => void;
  onNext: () => void;
};

type Step = {
  subject: string;
  content: string;
  label: string;
};

type Sequence = {
  id: number;
  name: string;
  steps: Step[];
  createdAt: string;
};

const API_URL = process.env.REACT_APP_API_URL;

const SummaryContent: React.FC<StepsFormProps> = ({ onPrev, onNext }) => {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Sequence[]>(`${API_URL}/sequences`)
      .then((response) => {
        setSequences(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sequences:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sequences.length) {
    return <div>No sequences found.</div>;
  }

  // Display the latest sequence (you can adjust this logic)
  const sequence = sequences[sequences.length - 1];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-semibold mb-1">Sequence Summary</h2>
        <HeaderWithNav onPrev={onPrev} onNext={onNext} />
      </div>
      <p className="text-gray-500 mb-6">Summary of your sequence</p>
      <div className="border-b mb-4"></div>
      <div className="flex">
        <div className="font-medium w-1/3">Sequence steps and details</div>
        <div className="w-2/3">
          {sequence.steps && sequence.steps.length > 0 ? (
            sequence.steps.map((step, idx) => (
              <div className="mb-4" key={idx}>
                <div className="font-semibold">
                  Step {idx + 1}: {step.label}
                </div>
                <div>Subject: {step.subject || "-"}</div>
                <br></br>
                <div>Content: {step.content || "-"}</div>
              </div>
            ))
          ) : (
            <div>No steps found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryContent;
