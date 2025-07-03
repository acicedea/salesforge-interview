import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SummaryContent from "./SummaryContent";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SummaryContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
    render(
      <SummaryContent
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders no sequences found", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(
      <SummaryContent
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    await waitFor(() =>
      expect(screen.getByText(/no sequences found/i)).toBeInTheDocument()
    );
  });

  test("renders sequence summary", async () => {
    const mockSequence = {
      id: 1,
      name: "Test Sequence",
      steps: [
        {
          subject: "Step 1 Subject",
          content: "Step 1 Content",
          label: "Step 1"
        },
        {
          subject: "Step 2 Subject",
          content: "Step 2 Content",
          label: "Step 2"
        }
      ],
      createdAt: "2023-01-01T00:00:00Z"
    };
    mockedAxios.get.mockResolvedValueOnce({ data: [mockSequence] });
    render(
      <SummaryContent
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    await waitFor(() =>
      expect(screen.getByText(/sequence summary/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/test sequence/i)).toBeInTheDocument();
    expect(screen.getAllByText(/step 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/step 2/i)[0]).toBeInTheDocument();
  });

  test("renders no steps found", async () => {
    const mockSequence = {
      id: 1,
      name: "Test Sequence",
      steps: [],
      createdAt: "2023-01-01T00:00:00Z"
    };
    mockedAxios.get.mockResolvedValueOnce({ data: [mockSequence] });
    render(
      <SummaryContent
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    await waitFor(() =>
      expect(screen.getByText(/no steps found/i)).toBeInTheDocument()
    );
  });

  test("handles error fetching sequences", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(
      new Error("Error fetching sequences")
    );
    render(
      <SummaryContent
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    await waitFor(() =>
      expect(screen.getByText(/no sequences found/i)).toBeInTheDocument()
    );
  });
});
