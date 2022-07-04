import { useState } from "react";
import "./start.css";
import Blank from "../../img/blank.jpg";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { db, auth, user } from "../../firebase.js";

const Start = () => {
  const question = {
    title: "Untitled question",
    type: 3,
    answers: ["Option 1"],
    required: false,
  };
  const createForm = async (e) => {
    try {
      const docData = {
        user: "test user",
        date: new Date(),
      };
      const docRef = await addDoc(collection(db, "quizzes"), docData);
      if (docRef.id) {
        const questionRef = await addDoc(
          collection(db, "quizzes", docRef.id, "questions"),
          { question }
        );
        window.location.replace(`/${docRef.id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="start-container">
      <div className="start-wrapper">
        <p className="start-new">Start a new form</p>
        <div className="blank-form" onClick={() => createForm()}>
          <img src={Blank} alt="" className="blank-form-img" />
          <p className="start-form-title">Blank</p>
        </div>
      </div>
    </div>
  );
};

export default Start;
