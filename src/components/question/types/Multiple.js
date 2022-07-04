import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";

const Multiple = ({
  editQuestion,
  setCurrentAnswer,
  answers,
  deleteOption,
  addOption,
  index,
}) => {
  return (
    <div className="question-options">
      {answers?.map((n, index) => (
        <div className="question-option">
          <div className="question-option-left">
            <RadioButtonUncheckedIcon className="icon" />
            <input
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
          <RadioButtonUncheckedIcon className="icon" />

          <p className="new-option">
            <span className="add-option" onClick={() => addOption(index)}>
              Add option{" "}
            </span>{" "}
            or <span className="option-link"> add "Other"</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Multiple;
