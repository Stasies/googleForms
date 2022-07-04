import React, { useState, useEffect } from "react";
import "./question.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SegmentIcon from "@mui/icons-material/Segment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Time from "./types/Time";
import Date from "./types/Date";
import Paragraph from "./types/Paragraph";
import Short from "./types/Short";
import Linear from "./types/Linear";
import Multiple from "./types/Multiple";
import Dropdown from "./types/Dropdown";
import Checkbox from "./types/Checkbox";

const Question = ({
  active,
  index,
  selectQuestion,
  newQuestion,
  deleteQuestion,
  view,
  quizId,
  thisQuestion,
  // qTitle,
  // qType,
  // qAnswers,
  // q,
  questionId,
}) => {
  const menu = [
    {
      id: 1,
      icon: <ShortTextIcon className="menu-icon" />,
      type: "string",
      text: "Short answer",
    },
    {
      id: 2,
      icon: <SegmentIcon className="menu-icon" />,
      type: "paragraph",
      text: "Paragraph",
      separate: true,
    },
    {
      id: 3,
      icon: <RadioButtonCheckedIcon className="menu-icon" />,
      type: "radio",
      text: "Multiple choice",
      answerIcon: <RadioButtonUncheckedIcon className="icon" />,
    },
    {
      id: 4,
      icon: <CheckBoxIcon className="menu-icon" />,
      text: "Checkboxes",
      type: "checkbox",
      answerIcon: <CheckBoxOutlineBlankIcon className="icon" />,
    },
    {
      id: 5,
      icon: <ArrowDropDownCircleIcon className="menu-icon" />,
      type: "select",
      text: "Dropdown",
      separate: true,
    },
    {
      id: 6,
      icon: <LinearScaleIcon className="menu-icon" />,
      type: "range",
      text: "Linear scale",
      separate: true,
    },
    {
      id: 7,
      icon: <DateRangeIcon className="menu-icon" />,
      text: "Date",
      type: "date",
    },
    {
      id: 8,
      icon: <AccessTimeIcon className="menu-icon" />,
      text: "Time",
      type: "time",
    },
  ];
  const [type, setType] = useState(thisQuestion?.type || 3);
  const [openMenu, setOpenMenu] = useState(false);
  const [minOpen, setMinOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false);
  const [selectMin, setSelectMin] = useState(thisQuestion?.min || 0);
  const [selectMax, setSelectMax] = useState(thisQuestion?.max || 5);
  const [rangeLabelMin, setRangeLabelMin] = useState(
    thisQuestion?.rangeLabelMin
  );
  const [rangeLabelMax, setRangeLabelMax] = useState(
    thisQuestion?.rangeLabelMax
  );
  const [maxRange, setMaxRange] = useState([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [numberOfOptions, setNumberOfOptions] = useState(1);
  const [answers, setAnswers] = useState(["Option 1"]);
  const [currentAnswer, setCurrentAnswer] = useState();
  const [questionTitle, setQuestionTitle] = useState("Untitled question");
  const [required, setRequired] = useState(false);

  console.log(questionId);

  active && console.log(thisQuestion?.answers);
  // useEffect(() => {
  //   const getQuestion = onSnapshot(
  //     doc(db, "quizzes", quizId, "questions", questionId),
  //     (doc) => {
  //       console.log("Current data: ", doc.data());
  //       setThisQuestion(doc.data());
  //     }
  //   );
  // }, [questionId]);

  const setQuestionType = async (type) => {
    setType(type);
    setOpenMenu(false);
    console.log(type);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    await updateDoc(newQuestionRef, { "question.type": type }, { merge: true });
  };
  const setRange = async (type, val) => {
    type === "min" && setSelectMin(val);
    type === "max" && setSelectMax(val);
    setMinOpen(false);
    setMaxOpen(false);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    await updateDoc(
      newQuestionRef,
      { "question.min": selectMin, "question.max": selectMax },
      { merge: true }
    );
  };
  const editQuestion = async (index) => {
    answers[index] = currentAnswer;
    console.log(answers);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    await updateDoc(
      newQuestionRef,
      { "question.answers": answers },
      { merge: true }
    );
  };

  const addOption = async (index) => {
    setNumberOfOptions(numberOfOptions + 1);
    setAnswers((prevState) => [...prevState, `Option ${numberOfOptions + 1}`]);
  };
  const deleteOption = async (index) => {
    let newAnsw = answers.splice(index, 1);
    setAnswers(newAnsw);
  };
  const makeRequired = async (val) => {
    setRequired(val);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    await updateDoc(
      newQuestionRef,
      { "question.required": required },
      { merge: true }
    );
  };
  const newTitle = async (val) => {
    setQuestionTitle(val);
    const newQuestionRef = doc(db, "quizzes", quizId, "questions", questionId);
    await updateDoc(
      newQuestionRef,
      { "question.title": questionTitle || "Untitled question" },
      { merge: true }
    );
  };
  console.log(answers);
  const editedQuestion = {
    rangeLabelMax: thisQuestion?.rangeLabelMax || rangeLabelMax || "",
    rangeLabelMin: thisQuestion?.rangeLabelMin || rangeLabelMin || "",
    required: required,
  };
  const question = {
    title: "Untitled question",
    type: 3,
    answers: ["Option 1"],
    required: false,
  };

  return (
    <>
      {active === true ? (
        <div className="question-container question-container-active">
          <div className="question-navigation">
            <div className="question-navigation-item">
              <AddCircleOutlineIcon
                className="menu-icon"
                onClick={() => newQuestion(question)}
              />
            </div>
          </div>
          {active === true && <div className="question-left-line"></div>}
          <div className="question-wrapper">
            <div className="question-top">
              <div className="question-title">
                <input
                  type="text"
                  className="question-title-input"
                  placeholder={thisQuestion?.title || questionTitle}
                  onChange={(e) => newTitle(e.target.value)}
                />
              </div>
              <div
                className="question-select-type"
                onClick={() => setOpenMenu(!openMenu)}
              >
                {thisQuestion?.type ? menu[type - 1].icon : menu[2].icon}
                <p className="question-select-type-menu">
                  {thisQuestion?.type ? menu[type - 1].text : menu[2].text}
                </p>
                <ArrowDropDownIcon className="menu-icon" />
                {openMenu && (
                  <div
                    className="select-type-dropdown-menu"
                    style={{ top: `${-(type.id * 40 + 8)}px` }}
                  >
                    {menu.map((item) => (
                      <>
                        <div
                          className={
                            type === item.id
                              ? "dropdown-menu-item selected-item"
                              : "dropdown-menu-item"
                          }
                          onClick={() => setQuestionType(item.id)}
                        >
                          {item.icon}
                          <p className="question-select-type-menu">
                            {item.text}
                          </p>
                        </div>
                        {item.separate && <hr />}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {type == 6 && (
              <Linear
                setMinOpen={setMinOpen}
                setMaxOpen={setMaxOpen}
                selectMin={selectMin}
                selectMax={selectMax}
                setRange={setRange}
                minOpen={minOpen}
                maxOpen={maxOpen}
                maxRange={maxRange}
                editQuestion={editQuestion}
                setRangeLabelMax={setRangeLabelMax}
                setRangeLabelMin={setRangeLabelMin}
                rangeLabelMax={rangeLabelMax}
                rangeLabelMin={rangeLabelMin}
              />
            )}

            {type === 2 && <Paragraph />}
            {type === 1 && <Short />}
            {type === 7 && <Date />}
            {type === 8 && <Time />}
            {type === 3 && (
              <Multiple
                editQuestion={editQuestion}
                setCurrentAnswer={setCurrentAnswer}
                currentAnswer={currentAnswer}
                answers={answers}
                index={index}
                deleteOption={deleteOption}
                addOption={addOption}
              />
            )}
            {type === 4 && (
              <Checkbox
                editQuestion={editQuestion}
                setCurrentAnswer={setCurrentAnswer}
                answers={answers}
                index={index}
                deleteOption={deleteOption}
                addOption={addOption}
              />
            )}
            {type === 5 && (
              <Dropdown
                editQuestion={editQuestion}
                setCurrentAnswer={setCurrentAnswer}
                answers={answers}
                index={index}
                deleteOption={deleteOption}
                addOption={addOption}
                numberOfOptions={numberOfOptions}
              />
            )}

            <div className="question-bottom">
              <div className="question-bottom-icons">
                <DeleteOutlineIcon
                  onClick={() => deleteQuestion(questionId)}
                  className="menu-icon"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="required">
                <p>Required</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    onClick={() => makeRequired(!required)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="question-container"
          onClick={() => selectQuestion(index)}
        >
          <div className="question-wrapper">
            <div className="question-top">
              <div className="question-title">
                <p>{thisQuestion.title || questionTitle}</p>
              </div>
            </div>
            {type === 2 && <Paragraph />}
            {type === 1 && <Short />}
            {type === 7 && <Date />}
            {type === 8 && <Time />}
            {type === 5 && (
              <div className="question-options">
                {thisQuestion.answers.map((a) => (
                  <div className="question-option">{a}</div>
                ))}
              </div>
            )}
            {/* {answers.length <=
              0(
                <div className="range-items">
                  <div className="range-item">
                    <p className="question-answer-option">Option 1</p>
                  </div>
                </div>
              )} */}
            {type == 6 && (
              <div className="range-options">
                <div className="range-min">
                  {rangeLabelMin && rangeLabelMin}
                </div>
                <div className="range-items">
                  {[...Array(selectMax - selectMin + 1)].map((a, index) => (
                    <div className="range-item">
                      <p>{index + 1}</p>
                      <RadioButtonUncheckedIcon
                        key={index}
                        className="menu-icon"
                      />
                    </div>
                  ))}
                </div>
                <div className="range-max">
                  {rangeLabelMax && rangeLabelMax}
                </div>
              </div>
            )}
            {(type === 3 || type === 4) && (
              <div className="question-options">
                {thisQuestion?.answers.map((a) => (
                  <div className="question-option">
                    <div className="question-option-left">
                      {menu[type - 1].answerIcon}
                      <p className="question-answer-option">{a}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
