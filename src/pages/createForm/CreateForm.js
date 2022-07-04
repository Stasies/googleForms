import React, { useState } from "react";
import Header from "../../components/header/Header";
import Form from "../../components/form/Form";
import Responses from "../../components/responses/Responses";
import "./createForm.css";

const CreateForm = () => {
  const [selectedSection, setSelectedSection] = useState("Questions");
  const changeSection = (val) => {
    setSelectedSection(val);
  };
  return (
    <div>
      <Header
        page="create"
        changeSection={changeSection}
        selectedSection={selectedSection}
      />
      {selectedSection === "Questions" && <Form view={false} />}
      {selectedSection === "Responses" && <Responses />}
    </div>
  );
};

export default CreateForm;
