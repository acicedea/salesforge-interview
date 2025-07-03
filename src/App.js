import React from "react";
import { Routes, Route } from "react-router-dom";
import SequenceStepsPage from "./SequenceStepsPage";
import SequenceSummaryPage from "./SequenceSummaryPage";

const App = () => (
  <Routes>
    <Route path="/" element={<SequenceStepsPage />} />
    <Route path="/summary" element={<SequenceSummaryPage />} />
  </Routes>
);

export default App;
