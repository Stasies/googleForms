import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Dropdown = ({
  editQuestion,
  setCurrentAnswer,
  answers,
  deleteOption,
  addOption,
  index,
  numberOfOptions,
}) => {
  return (
    <div className="question-options">
      {answers.map((n, index) => (
        <div className="question-option">
          <div className="question-option-left">
            <span style={{ paddingBottom: "10px" }}>{index + 1}.</span>
            <input
              autoFocus={true}
              className="question-option-input"
              type="text"
              placeholder={n ? n : `Option ${index + 1}`}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onBlur={() => editQuestion(index)}
            />
          </div>

          <div className="question-option-right">
            <CloseIcon className="icon" onClick={() => deleteOption(index)} />
          </div>
        </div>
      ))}
      <div className="question-option">
        <div className="question-option-left">
          <p className="new-option">
            <span>{numberOfOptions + 1}.</span>
            <span className="add-option" onClick={() => addOption(index)}>
              Add option{" "}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
