import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Linear = ({
  setMinOpen,
  setMaxOpen,
  selectMin,
  selectMax,
  setRange,
  minOpen,
  maxOpen,
  maxRange,
  editQuestion,
  setRangeLabelMax,
  setRangeLabelMin,
  rangeLabelMax,
  rangeLabelMin,
}) => {
  return (
    <div className="question-options">
      <div className="question-option">
        <div className="question-option-left">
          <div className="select">
            <div
              className="select-range-input"
              onClick={() => setMinOpen(true)}
            >
              <span>{selectMin || 0}</span>
              <ArrowDropDownIcon className="menu-icon" />
            </div>
            {minOpen && (
              <div
                className="select-range-dropdown-menu"
                style={{ top: `${-(selectMin * 48 + 20)}px` }}
              >
                <div className="dropdown-menu-item">
                  <p
                    className="question-select-type-menu"
                    onClick={() => setRange("min", 0)}
                  >
                    0
                  </p>
                </div>
                <div className="dropdown-menu-item">
                  <p
                    className="question-select-type-menu"
                    onClick={() => setRange("min", 1)}
                  >
                    1
                  </p>
                </div>
              </div>
            )}
          </div>
          <p style={{ fontSize: "14px" }}>to</p>
          <div className="select">
            <div
              className="select-range-input"
              onClick={() => setMaxOpen(true)}
            >
              <span>{selectMax || 5}</span>
              <ArrowDropDownIcon className="menu-icon" />
            </div>
            {maxOpen && (
              <div
                className="select-range-dropdown-menu"
                style={{
                  top: `${-((selectMax - 2) * 48 + 20)}px`,
                }}
              >
                {maxRange.map((r) => (
                  <div
                    className="dropdown-menu-item"
                    onClick={() => setRange("max", r)}
                  >
                    <p className="question-select-type-menu">{r}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="question-option">
        <div className="question-option-left">
          <div className="new-option">
            <span className="add-option">{selectMin || 0}</span>
            <input
              type="text"
              className="range-label-input"
              placeholder={rangeLabelMin || "Label (optional)"}
              onChange={(e) => setRangeLabelMin(e.target.value)}
              onBlur={editQuestion}
              maxLength={15}
            />
          </div>
        </div>
      </div>
      <div className="question-option">
        <div className="question-option-left">
          <div className="new-option">
            <span className="add-option">{selectMax || 5}</span>
            <input
              type="text"
              className="range-label-input"
              placeholder={rangeLabelMax || "Label (optional)"}
              onChange={(e) => setRangeLabelMax(e.target.value)}
              onBlur={editQuestion}
              maxLength={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linear;
