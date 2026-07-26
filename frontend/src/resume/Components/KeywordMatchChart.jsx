const KeywordMatchChart = ({ match }) => {
  return (
    <div className="keyword-match">
      <h3 className="keyword-match-title">Keyword Match</h3>

      <progress
        className="keyword-progress"
        value={match}
        max="100"
      />

      <p className="keyword-match-text">{match}% matched</p>
    </div>
  );
};

export default KeywordMatchChart;
