import { useState } from "react";
import UploadResume from "./UploadResume";
import JobDescriptionInput from "./JobDescriptionInput";
import ATSScoreMeter from "./ATSScoreMeter";
import KeywordMatchChart from "./KeywordMatchChart";
import SectionScoreCards from "./SectionScoreCards";
import SuggestionsList from "./SuggestionsList";
import { analyzeATS } from "../services/atsApi";

const ATSAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jd) {
      alert("Upload resume and enter job description");
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeATS(resume, jd);
      setResult(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="ats-analyzer">
      <UploadResume setResume={setResume} />
      <JobDescriptionInput jd={jd} setJd={setJd} />

      <button
        className="ats-analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze ATS"}
      </button>

      {result && (
        <div className="ats-results">
          <ATSScoreMeter score={result.ats_score} />
          <KeywordMatchChart match={result.keyword_match} />
          <SectionScoreCards sections={result.section_scores} />
          <SuggestionsList suggestions={result.suggestions} />
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;
