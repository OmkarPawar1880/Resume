const SectionScoreCards = ({ sections }) => {
  return (
    <div className="section-scores">
      <h3 className="section-scores-title">Section Scores</h3>

      <div className="section-score-grid">
        {Object.entries(sections).map(([section, score]) => (
          <div className="section-score-card" key={section}>
            <span className="section-name">
              {section.replace("_", " ").toUpperCase()}
            </span>
            <span className="section-score">{score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionScoreCards;
