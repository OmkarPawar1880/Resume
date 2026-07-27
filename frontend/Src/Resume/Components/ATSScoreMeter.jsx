const ATSScoreMeter = ({ score }) => {
 
   return (
    <div className="ats-score-meter">
      <h2 className="ats-score-title">ATS Score</h2>

      <div className="ats-score-bar">
        <div
          className="ats-score-fill"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="ats-score-value">{score}%</div>
    </div>
  );
};


export default ATSScoreMeter;

