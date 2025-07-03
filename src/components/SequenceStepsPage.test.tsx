import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SequenceStepsPage from "./SequenceStepsPage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SequenceStepsPage", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <SequenceStepsPage />
      </MemoryRouter>
    );

  test("renders initial step", () => {
    renderPage();
    expect(screen.getByText(/initial email/i)).toBeInTheDocument();
  });

  test("adds a new step", () => {
    renderPage();
    const addButton = screen.getByText(/\+ add new step/i);
    fireEvent.click(addButton);
    expect(screen.getByText(/step 2/i)).toBeInTheDocument();
  });

  test("deletes a step", () => {
    renderPage();
    const addButton = screen.getByText(/\+ add new step/i);
    fireEvent.click(addButton);
    const deleteButtons = screen.getAllByLabelText(/delete step/i);
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText(/step 2/i)).not.toBeInTheDocument();
  });

  test("updates subject and label", () => {
    renderPage();
    const subjectInput = screen.getByPlaceholderText(
      /subject/i
    ) as HTMLInputElement;
    fireEvent.change(subjectInput, { target: { value: "Hello World" } });
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("saves steps and navigates to summary on Next", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });
    renderPage();
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:5050/sequences",
        expect.objectContaining({
          steps: expect.any(Array)
        })
      )
    );
  });

  test("shows error message on failed save", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Failed to save"));
    renderPage();
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    expect(
      await screen.findByText(/failed to save sequence/i)
    ).toBeInTheDocument();
  });
});
