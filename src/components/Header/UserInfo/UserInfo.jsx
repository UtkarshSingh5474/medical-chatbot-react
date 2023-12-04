import React, { useState } from "react";
import "../blurEffect.css";
  
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

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

function UserInfo(props) {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [sex, setSex] = useState("Female"); // Update the default gender as needed
  const [customUserInfo, setCustomUserInfo] = useState("");
  const [bodytype, setBodyType] = useState("");

  const closePopup = () => {
    props.change(null);
  };

  const handleSubmit = () => {

    if(customUserInfo !== ""){
      props.updateUserInfo(JSON.stringify(customUserInfo));
      setCustomUserInfo(customUserInfo);
      setAge("");
      setCity("");
      setBodyType("");

      closePopup();
      
    }else{
      const newUserInfo = {
        Age: age,
        City: city,
        BodyType: bodytype,
        Sex: sex,
      };
      props.updateUserInfo(JSON.stringify(newUserInfo));
      setAge(age);
      setCity(city);
      setBodyType(sex);
      setCustomUserInfo("")
      closePopup();
    };

    }

    

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  return (
<div>
  <div>
    <div style={popupContainerStyle} className="popup">
      <div style={popupStyle} className="popup blurEffect">
        <div style={popupHeaderStyle} className="popup-header">
          <h1>Set User Info</h1>
          <h1 onClick={closePopup} style={{ cursor: "pointer" }}>
            X
          </h1>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <TextField
              id="outlined-basic"
              label="Age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Body Type"
              variant="outlined"
              value={bodytype}
              onChange={(e) => setBodyType(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={sex}
                onChange={handleSexChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              multiline
              rows={12}
              style={{ width: "80%", height: "80%", minHeight: "80%" }}
              id="outlined-basic"
              label="Add Custom User Info"
              variant="outlined"
              value={customUserInfo}
              onChange={(e) => setCustomUserInfo(e.target.value)}
            />
           
          </div>
          
        </div>
        <br />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
      </div>
    </div>
  </div>
</div>

  );
}

export default UserInfo;
