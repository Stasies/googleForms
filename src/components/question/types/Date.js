import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

const Date = () => {
  return (
    <div className="question-options">
      <div className="question-option">
        <div className="question-option-left">
          <div className="date-input">
            <input type="text" placeholder="Month, day, year" disabled="true" />
            <DateRangeIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Date;
