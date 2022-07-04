import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import PaletteIcon from "@mui/icons-material/Palette";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../../img/logo.png";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Header = ({ page, changeSection, selectedSection }) => {
  const [changeTitle, setChangeTitle] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [title, setTitle] = useState(quiz.title);
  let path = window.location.pathname;
  const quizId = path.split("/").slice(-2)[0];
  console.log(quizId);

  useState(() => {
    const getQuiz = onSnapshot(doc(db, "quizzes", quizId || 0), (doc) => {
      console.log("Current data: ", doc.data());
      setQuiz(doc.data());
    });
  }, [quiz]);

  const sendData = async () => {
    const answerRef = doc(db, "quizzes", quizId);
    try {
      await setDoc(answerRef, { title }, { merge: true });
    } catch (error) {
      console.log(error);
    }
    setChangeTitle(false);
  };

  console.log(quiz);
  return (
    <div
      className={page == "home" ? "header-container-home" : "header-container"}
    >
      <div className="header-wrapper">
        <div className="header-top">
          {page == "create" ? (
            <div className="header-top-title">
              <img src={Logo} className="logo" alt="google forms logo" />
              {changeTitle ? (
                <input
                  type="text"
                  className="form-title-input"
                  placeholder={title || "Untitled form"}
                  onBlur={() => sendData()}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <span
                  className="header-top-title-text"
                  onClick={() => setChangeTitle(true)}
                >
                  {title || "Untitled form"}
                </span>
              )}
              <StarOutlineIcon
                className="menu-icon"
                style={{ paddingBottom: "5px" }}
              />
            </div>
          ) : (
            <div className="header-top-title">
              <img src={Logo} className="logo" alt="google forms logo" />
              <span
                className="header-top-title-text"
                onClick={() => setChangeTitle(true)}
              >
                Forms
              </span>
            </div>
          )}
          {page == "create" ? (
            <div className="header-top-navigation">
              <div className="header-top-navigation-item">
                <PaletteIcon className="menu-icon" />
              </div>
              <div className="header-top-navigation-item">
                <Link to={`/${quizId}/view`}>
                  <VisibilityIcon className="menu-icon" />
                </Link>
              </div>
              <div className="header-top-navigation-item">
                <UndoIcon className="menu-icon" />
              </div>
              <div className="header-top-navigation-item">
                {" "}
                <RedoIcon className="menu-icon" />
              </div>
              <div className="header-top-navigation-item">
                <button className="send-button">Send</button>
              </div>
              <div className="header-top-navigation-item">
                <div className="user-icon">A</div>
              </div>
            </div>
          ) : (
            <div className="header-top-navigation">
              <div className="header-top-navigation-item">
                <div className="user-icon">A</div>
              </div>
            </div>
          )}
        </div>
        {page == "create" && (
          <div className="header-bottom">
            <div className="header-bottom-select">
              <div
                className={
                  selectedSection === "Questions"
                    ? "select-item selected"
                    : "select-item"
                }
                onClick={() => changeSection("Questions")}
              >
                Questions
              </div>
              <div
                onClick={() => changeSection("Responses")}
                className={
                  selectedSection === "Responses"
                    ? "select-item selected"
                    : "select-item"
                }
              >
                Responses
              </div>
              <div className="select-item" style={{ cursor: "not-allowed" }}>
                Settings
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
