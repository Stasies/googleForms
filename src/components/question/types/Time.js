import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Time = () => {
  return (
    <div className="question-options">
      <div className="question-option">
        <div className="question-option-left">
          <div className="date-input">
            <input type="text" placeholder="Time" disabled="true" />
            <AccessTimeIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
