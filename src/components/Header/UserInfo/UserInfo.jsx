import React, { useState, useEffect } from "react";
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


import app from '../../../firebase.config';
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';




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
  const [sex, setSex] = useState("Male");
  const [customUserInfo, setCustomUserInfo] = useState("");
  const [bodytype, setBodyType] = useState("");

  const closePopup = () => {
    props.change(null);
  };

  const fetchDataFromFirestore = async (userUID) => {
    const db = getFirestore(app);
    const userDocRef = doc(db, 'users', userUID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setAge(userData.userInfo.Age || "");
      setCity(userData.userInfo.City || "");
      setSex(userData.userInfo.Sex || "Male");
      setBodyType(userData.userInfo.BodyType || "");
      setCustomUserInfo(userData.userInfo.customUserInfo || "");
    }

  };

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUID = user.uid;
        fetchDataFromFirestore(userUID);
      }
    });
  }, []);

  const handleSubmit = async () => {
    const auth = getAuth(app);
  
    // Check if a user is authenticated
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUID = user.uid;
  
        if (customUserInfo !== "") {
          // Update userInfo field in Firestore
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', userUID);
  
          // Fetch existing user data
          const userDocSnapshot = await getDoc(userDocRef);
          const existingUserData = userDocSnapshot.data();
  
          // Update the userInfo field with the new customUserInfo
          await updateDoc(userDocRef, {
            userInfo: {
              ...existingUserData.userInfo,
              customUserInfo: customUserInfo,
            },
          });
  
          // Update the parent component state or take any other necessary action
          props.updateUserInfo(customUserInfo,1);
          setCustomUserInfo("");
          closePopup();
        } else {
          // Add newUserInfo to Firestore with the user UID as the document ID
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', userUID);
          const newUserInfo = {
            Age: age,
            City: city,
            BodyType: bodytype,
            Sex: sex,
          };
  
          // Set the userInfo field with the newUserInfo
          await setDoc(userDocRef, {
            userInfo: newUserInfo,
          });
  
          // Update the parent component state or take any other necessary action
          props.updateUserInfo(JSON.stringify(newUserInfo));
          setAge("");
          setCity("");
          setBodyType("");
          closePopup();
        }
      }
    });
  };

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
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
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
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;