import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../blurEffect.css";

// Define CSS constants
const popupContainerStyle = {
  textAlign: "center",
  backgroundColor: "rgba(39, 145, 216, 0.710)",
  width: "50%",
  position: "absolute",
  top: "10vh",
  zIndex: 1000000,
};

const popupStyle = {
  height: "500px",
  width: "100%",
  position: "absolute",
  top: "50%",
  left: "25%",
  zIndex: 100,
  backgroundColor: "#C0C0C0",
  borderRadius: "15px",
};

const popupHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 30px 0 15px",
  borderBottom: "2px solid black",
};

function MedicalHistory(props) {
  const [customMedicalHistory, setcustomMedicalHistory] = useState(
    ""
  );

  const handleSubmit = () => {
    props.updateUserMedicalHistory(JSON.stringify(customMedicalHistory));
    setcustomMedicalHistory("");
    closePopup();
  };
  const closePopup = () => {
    props.change(null);
  };
  return (
    <div>
      <div>
        <div style={popupContainerStyle} className="popup">
          <div style={popupStyle} className="popup blurEffect">
            <div style={popupHeaderStyle} className="popup-header">
              <h1>Medical History</h1>
              <h1 onClick={closePopup} style={{ cursor: "pointer" }}>
                X
              </h1>
            </div>
            <br />
            <br />

            <div className="flex">
            <TextField
            
            multiline
            rows={12}
              style={{ width: "80%", height: "80%", minHeight: "80%" }}
              id="outlined-basic"
              label="Enter Medical History"
              variant="outlined"
              value={customMedicalHistory}
              onChange={(e) => setcustomMedicalHistory(e.target.value)}
              />
            <br />
            <br />
            
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistory;
