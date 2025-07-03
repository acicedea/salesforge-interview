import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressStepsBar from "./ProgressStepsBar";

describe("ProgressStepsBar", () => {
  it("renders all steps and highlights the current step", () => {
    render(<ProgressStepsBar currentStep={2} />);
    expect(screen.getAllByTestId(/step-/)).toHaveLength(3);

    expect(screen.getByTestId("current-dot-1")).toBeInTheDocument();

    expect(screen.getByTestId("checkmark-0")).toBeInTheDocument();

    expect(screen.getByTestId("future-dot-2")).toBeInTheDocument();

    expect(screen.getByText("Name & Product")).toBeInTheDocument();
    expect(
      screen.getByText("Provide sequence name & product")
    ).toBeInTheDocument();
    expect(screen.getByText("Sequence steps")).toBeInTheDocument();
    expect(
      screen.getByText("Create sequence steps for your sequence")
    ).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Summary of your sequence")).toBeInTheDocument();
  });

  it("renders the first step as current when currentStep=1", () => {
    render(<ProgressStepsBar currentStep={1} />);
    expect(screen.getByTestId("current-dot-0")).toBeInTheDocument();
  });

  it("renders the last step as current when currentStep=3", () => {
    render(<ProgressStepsBar currentStep={3} />);
    expect(screen.getByTestId("current-dot-2")).toBeInTheDocument();
  });
});
