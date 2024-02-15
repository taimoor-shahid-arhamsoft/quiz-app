import React from "react";

const Questions = ({
  question,
  options,
  id,
  selectedOption, 
  setSelectedOption,
}) => {
  
  const handleOptionChange = (option) => {
    const newSelectedOption = selectedOption === option ? "" : option;
    setSelectedOption(newSelectedOption);
  };

  return (
    <div>
      <span className="active-question-no">Question NO {id}</span>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label className={selectedOption === option ? "checked" : ""}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              <span className="ms-2">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;