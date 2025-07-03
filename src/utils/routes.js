// routes.js
import SequenceStepsPage from "../components/SequenceStepsPage";
import SequenceSummaryPage from "../components/SequenceSummaryPage";

export const routes = [
  {
    path: "/",
    element: <SequenceStepsPage />
  },
  {
    path: "/summary",
    element: <SequenceSummaryPage />
  }
];
