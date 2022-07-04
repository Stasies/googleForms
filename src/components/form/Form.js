import React, { useRef, useState, useEffect } from "react";
import Question from "../question/Question";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewQuestion from "../viewQuestion/ViewQuestion";
import "./form.css";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Form = (view) => {
  const user = { email: "test.user@gmail.com" };
  const [editDesc, setEditDesc] = useState(false);
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [desc, setDesc] = useState();
  const [activeQuestion, setActiveQuestion] = useState(questions.length);
  const [quiz, setQuiz] = useState({});
  const [questionId, setQuestionId] = useState([]);
  let path = window.location.pathname;
  const quizId = path.split("/").slice(-2)[0];
  console.log(questions);

  useEffect(() => {
    const getQuiz = onSnapshot(doc(db, "quizzes", quizId), (doc) => {
      console.log("Current data: ", doc.data());
      setQuiz(doc.data());
    });

    const q = query(collection(db, "quizzes", quizId, "questions"));
    const allQuestions = onSnapshot(q, (querySnapshot) => {
      let questionList = [];
      querySnapshot.forEach((doc) => {
        questionList.push({ data: doc.data(), id: doc.id });
      });
      setQuestions(questionList);
    });

    console.log(questions);
  }, [quizId]);

  const sendData = async () => {
    // e.preventDefault();
    const answerRef = doc(db, "quizzes", quizId);
    try {
      await setDoc(
        answerRef,
        { title: title || quiz.title, desc: desc || quiz.desc },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
    setEditDesc(false);
  };

  const selectQuestion = (value) => {
    setActiveQuestion(value);
    setEditDesc(false);
  };
  const newQuestion = (question) => {
    // setQuestions((prevState) => [...prevState, questions.length + 1]);
    sendQuestionData(question);
    setActiveQuestion(questions.length);
  };

  const sendQuestionData = async (question) => {
    try {
      const questionRef = await addDoc(
        collection(db, "quizzes", quizId, "questions"),
        { question }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(quiz);
  const deleteQuestion = async (index) => {
    // if (questions.length > 1) {
    //   questions.splice(index, 1);
    //   setActiveQuestion(activeQuestion - 1);
    //   return questions;
    // }
    await deleteDoc(doc(db, "quizzes", quizId, "questions", index));
  };
  console.log(quizId);
  return (
    <div className="form-container">
      <div className={view.view ? "form-wrapper-view" : "form-wrapper"}>
        <div className="form-description">
          <div className="form-line"></div>
          {editDesc && !view.view ? (
            <div className="form-description-content">
              <input
                type="text"
                placeholder={quiz.title || title || "Untitled form"}
                className="form-description-input title-input"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => sendData()}
              />
              <input
                type="text"
                placeholder={quiz.desc || desc || "Form description"}
                className="form-description-input desc-input"
                onChange={(e) => setDesc(e.target.value)}
                onBlur={() => sendData()}
              />
            </div>
          ) : (
            <>
              <div
                className={
                  view.view
                    ? "form-description-content-view"
                    : "form-description-content"
                }
              >
                <h2
                  className="form-container-title"
                  onClick={() => setEditDesc(true)}
                >
                  {quiz.title || title || "Untitled form"}
                </h2>

                <p
                  className="form-container-desc"
                  onClick={() => setEditDesc(true)}
                >
                  {quiz.desc || desc || "Form description"}
                </p>
              </div>
              {view.view && (
                <div className="form-description-user-info">
                  <VisibilityOffIcon className="menu-icon" />
                  <p>
                    <b>{user.email}</b> (not shared)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <p>{questionId}</p>
        {view.view === true && (
          <div className="form-questions">
            {questions &&
              questions?.map((q, index) => (
                <ViewQuestion
                  key={index}
                  thisQuestion={q.data.question}
                  quizId={quizId}
                  questionId={q.id}
                  // qTitle={q.data.title}
                  // qType={q.data.type}
                  // qAnswers={q.data.answers}
                />
              ))}
          </div>
        )}
        {view.view === false && (
          <div className="form-questions">
            {questions?.map((q, index) => (
              <Question
                key={index}
                active={activeQuestion == index}
                index={index}
                selectQuestion={selectQuestion}
                newQuestion={newQuestion}
                deleteQuestion={deleteQuestion}
                quizId={quizId}
                // qTitle={q.title}
                // qType={q.type}
                // qAnswers={q.answers}
                // q={q}
                thisQuestion={q.data.question}
                questionId={q.id}
              />
            ))}
            {questions.length == 0 && (
              <Question
                key={1}
                active={true}
                index={0}
                selectQuestion={selectQuestion}
                newQuestion={newQuestion}
                deleteQuestion={deleteQuestion}
                quizId={quizId}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
