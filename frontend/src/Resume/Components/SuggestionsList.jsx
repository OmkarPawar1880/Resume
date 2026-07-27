const SuggestionsList = ({ suggestions }) => {
  return (
    <div className="ats-suggestions">
      <h3 className="ats-suggestions-title">Suggestions</h3>

      <ul className="ats-suggestions-list">
        {suggestions.map((s, index) => (
          <li className="ats-suggestion-item" key={index}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
