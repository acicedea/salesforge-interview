import React from "react";
import { render, screen } from "@testing-library/react";
import SequenceSummaryPage from "./SequenceSummaryPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
jest.mock("./Breadcrumb", () => () => <div>Breadcrumb</div>);
jest.mock("./HeaderWithNav", () => {
  return ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
    <div>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
});
jest.mock(
  "./ProgressStepsBar",
  () =>
    ({ currentStep }: { currentStep: number }) =>
      <div>Step {currentStep}</div>
); // Added semicolon here
jest.mock("./SummaryContent", () => () => <div>Summary Content</div>);

describe("SequenceSummaryPage", () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <SequenceSummaryPage />
      </MemoryRouter>
    );

  test("renders Breadcrumb component", () => {
    renderPage();
    expect(screen.getByText(/breadcrumb/i)).toBeInTheDocument();
  });

  test("renders HeaderWithNav component", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  test("renders ProgressStepsBar component", () => {
    renderPage();
    expect(screen.getByText(/step 3/i)).toBeInTheDocument();
  });

  test("renders SummaryContent component", () => {
    renderPage();
    expect(screen.getByText(/summary content/i)).toBeInTheDocument();
  });
});
