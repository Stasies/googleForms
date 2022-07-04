import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Form from "../../components/form/Form";
import EditIcon from "@mui/icons-material/Edit";
import "./viewForm.css";

const ViewForm = () => {
  const [showHint, setShowHint] = useState(false);
  let path = window.location.pathname;
  const quizId = path.split("/").slice(-2)[0];
  return (
    <>
      <Form view={true} />
      <Footer />
      <div
        className="edit-icon-container"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        {showHint && (
          <div className="hint">
            <p>Edit this form</p>
          </div>
        )}
        <Link to={`/${quizId}/edit`}>
          <EditIcon className="edit-icon" />
        </Link>
      </div>
    </>
  );
};

export default ViewForm;
