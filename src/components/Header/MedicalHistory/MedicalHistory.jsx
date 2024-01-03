import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "../blurEffect.css";
import app from '../../../firebase.config';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  const [customMedicalHistory, setCustomMedicalHistory] = useState("");

  const closePopup = () => {
    props.change(null);
  };

  const fetchDataFromFirestore = async (userUID) => {
    const db = getFirestore(app);
    const userDocRef = doc(db, 'users', userUID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setCustomMedicalHistory(userData.medicalHistory || "");
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

        // Update medicalHistory field in Firestore
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', userUID);

        // Fetch existing user data
        const userDocSnapshot = await getDoc(userDocRef);
        const existingUserData = userDocSnapshot.data();

        // Update the medicalHistory field with the new customMedicalHistory
        await updateDoc(userDocRef, {
          medicalHistory: customMedicalHistory,
        });

        // Update the parent component state or take any other necessary action
        props.updateUserMedicalHistory(customMedicalHistory);
        setCustomMedicalHistory("");
        closePopup();
      }
    });
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
                onChange={(e) => setCustomMedicalHistory(e.target.value)}
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
