import React, { useState, useRef } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./viewQuestion.css";

const ViewQuestion = ({ quizId, thisQuestion, questionId }) => {
  const [reply, setReply] = useState();
  const [type, setType] = useState(thisQuestion.type);
  const [options, setOptions] = useState(thisQuestion.answers);
  const [selectedOption, setSelectedOption] = useState();
  const [height, setHeight] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [rangeMin, setRangeMin] = useState(thisQuestion.min);
  const [rangeMax, setRangeMax] = useState(thisQuestion.max);
  const [selectedItem, setSelectedItem] = useState();
  const [timePeriod, setTimePeriod] = useState("AM");
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [message, setMessage] = useState();
  const userInput = useRef();
  const handleChange = () => {
    console.log("cols" + userInput.current.cols);
    setHeight(userInput.current.scrollHeight);
    console.log(height);
    setReply(userInput.current.value);
  };
  console.log(thisQuestion);

  const selectRangeItem = (item) => {
    setSelectedItem(item);
  };
  console.log(options);
  const selectTime = (category, value) => {
    if (category === "period") {
      setTimePeriod(value);
      setOpenMenu(false);
      setMessage("");
    } else if (category === "hour" && value < 13 && value >= 0) {
      setHour(value);
      setMessage("");
    } else if (category === "min" && value < 60 && value >= 0) {
      setMin(value);
      setMessage("");
    } else {
      setMessage("Invalid time");
    }
    setReply({ hour, min, timePeriod });
  };
  const selectOption = async (val, index) => {
    setSelectedOption(val);
    setSelectedItem(index);
    index ? setReply(index + 1) : setReply(val);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    console.log(reply);
    await updateDoc(
      newQuestionRef,
      { "question.reply": reply },
      { merge: true }
    );
  };
  return (
    <div className="question-container">
      <div className="question-wrapper">
        <div className="question-title">{thisQuestion.title}</div>
        <div className="question-options">
          {type === 2 && (
            <textarea
              className="user-answer"
              type="text"
              ref={userInput}
              onScroll={handleChange}
              style={{ height: `${height}px` }}
              placeholder="Your answer"
              onChange={(e) => selectOption(e.target.value)}
            />
          )}
          {type === 1 && (
            <input
              type="text"
              className="user-input-short"
              maxLength={24}
              placeholder="Your answer"
              onChange={(e) => selectOption(e.target.value)}
            />
          )}

          {(type === 4 || type === 3) && (
            <>
              {options.map((a) => (
                <div className="question-option">
                  <div className="question-option-left">
                    {type === 3 ? (
                      <>
                        {selectedOption == a ? (
                          <RadioButtonCheckedIcon
                            className="menu-icon"
                            style={{ paddingBottom: "10px" }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            className="menu-icon"
                            style={{ paddingBottom: "10px" }}
                            onClick={() => selectOption(a)}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {selectedOption == a ? (
                          <CheckBoxIcon
                            className="menu-icon"
                            style={{ paddingBottom: "10px" }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            className="menu-icon"
                            style={{ paddingBottom: "10px" }}
                            onClick={() => selectOption(a)}
                          />
                        )}
                      </>
                    )}
                    <p className="question-answer-option">{a}</p>
                  </div>
                </div>
              ))}
            </>
          )}
          {type === 6 && (
            <div className="range-options">
              <div className="range-min">
                {thisQuestion.rangeLabelMin ? thisQuestion.rangeLabelMin : ""}
              </div>
              <div className="range-items">
                {[...Array(rangeMax - rangeMin + 1)].map((a, index) => (
                  <div className="range-item" key={index}>
                    <p>{index + 1}</p>
                    {selectedItem == index ? (
                      <div className="radio-item selected-range-item">
                        <RadioButtonCheckedIcon className="menu-icon" />
                      </div>
                    ) : (
                      <div className="radio-item">
                        <RadioButtonUncheckedIcon
                          className="menu-icon"
                          onClick={() => selectOption(a, index)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="range-max">
                {thisQuestion.rangeLabelMax ? thisQuestion.rangeLabelMax : ""}
              </div>
            </div>
          )}
          {type === 7 && (
            <div className="date-input">
              <input type="date" placeholder="Month, day, year" />
            </div>
          )}
          {type === 8 && (
            <div className="time-input-container">
              <div className="time-input-wrapper">
                <input
                  type="text"
                  className="time-input"
                  max="12"
                  maxLength={2}
                  onChange={(e) => selectTime("hour", e.target.value)}
                />
                <span>:</span>
                <input
                  type="text"
                  className="time-input"
                  max="59"
                  maxLength={2}
                  onChange={(e) => selectTime("min", e.target.value)}
                />
                <div className="select">
                  <div
                    className="select-range-input"
                    onClick={() => setOpenMenu(true)}
                  >
                    <p>{timePeriod}</p>
                    <ArrowDropDownIcon className="menu-icon" />
                  </div>
                  {openMenu && (
                    <div
                      className="select-range-dropdown-menu"
                      style={{ top: `${-(0 * 48 + 20)}px` }}
                    >
                      <div
                        className="dropdown-menu-item"
                        onClick={() => selectTime("period", "AM")}
                      >
                        <p className="question-select-type-menu">AM</p>
                      </div>
                      <div
                        className="dropdown-menu-item"
                        onClick={() => selectTime("period", "PM")}
                      >
                        <p
                          style={{ fontWeight: "400" }}
                          className="question-select-type-menu"
                        >
                          PM
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {message && (
                <div className="error-message">
                  <ErrorOutlineIcon className="error-icon" />
                  {message}
                </div>
              )}
            </div>
          )}

          {type === 5 && (
            <div
              className="question-select-type"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {type.icon}
              <p className="question-select-type-menu">
                {selectedOption ? selectedOption : "Choose"}
              </p>
              <ArrowDropDownIcon className="menu-icon" />
              {openMenu && (
                <div
                  className="select-type-dropdown-menu"
                  style={{ top: `0px` }}
                >
                  <div className="dropdown-menu-item">
                    <p className="question-select-type-menu">Choose</p>
                  </div>
                  <hr />
                  {options.map((o) => (
                    <div
                      onClick={() => selectOption(o)}
                      className={
                        selectedOption === o
                          ? "dropdown-menu-item selected-item"
                          : "dropdown-menu-item"
                      }
                    >
                      <p className="question-select-type-menu">{o}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
