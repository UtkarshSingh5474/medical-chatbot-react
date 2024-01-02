import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ImageAvatars from "../Avatar/Avatar";
import MedicalHistory from "./MedicalHistory/MedicalHistory";
import UserInfo from "./UserInfo/UserInfo";
import { Button, CircularProgress } from "@mui/material";
import Tesseract from "tesseract.js";
import { generateText } from "../../libs/Gemini";

function Header(props) {
  const [choice, setChoice] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const setChange = (n) => {
    setChoice(n);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setLoading(true);
      setProgress(0); // Reset progress when a new file is selected

      // Handle the file based on your requirements
      if (file.type.startsWith("image/")) {
        await readImageFile(file);
      } else if (file.type === "application/pdf") {
        await readPdfFile(file);
      } else {
        alert("Unsupported file type. Please select an image or a PDF.");
        setLoading(false);
      }
    }
  };

  const readImageFile = async (file) => {
    console.log("Processing image file:", file);

    await generateText(file).then((text) => {
      console.log("OCR Result:", text);
      props.fileUpload(text);
      setLoading(false);
    }
    );

    setLoading(false);
  };

  const readPdfFile = async (file) => {
    console.log("Processing PDF file:", file);

    // Handle PDF file (if needed)

    setLoading(false);
  };

  const handleOcrProgress = (info) => {
    console.log("OCR Progress:", info);

    // Update progress state
    setProgress(info.progress);

    if (info.status === "recognizing text" && info.progress === 1) {
      // OCR is complete
      setLoading(false);
    }
    
  };

  const handleUploadReport = () => {
    console.log("Uploaded file:", selectedFile);
  };

  return (
    <>
      <div
        className="main"
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Navbar
          expand="lg"
          variant="dark"
          className="justify-content-center"
          style={{
            backgroundColor: "#498FFF",
            borderRadius: "100px",
            paddingLeft: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex align-items-center w-100 justify-content-center">
              <ImageAvatars updateUserInfo={props.updateUserInfo} />
              <div
                className="line"
                style={{
                  borderLeft: "1px solid yellow",
                  height: "40px",
                  marginLeft: "20px",
                }}
              ></div>
              <Container>
                <Nav className="me-auto">
                  <Nav.Link
                    className={`text-center ${choice === 1 ? "active" : ""}`}
                    style={{ color: "white",border: "1px solid white",
                    borderRadius: "10px", margin:"5px" }}
                    onClick={() => {
                      setChoice(1);
                    }}
                  >
                    User Info
                  </Nav.Link>
                  <Nav.Link
                    className={`text-center ${choice === 2 ? "active" : ""}`}
                    style={{ color: "white" ,border: "1px solid white",
                    borderRadius: "10px",margin:"5px" }}
                    onClick={() => {
                      setChoice(2);
                    }}
                  >
                    Medical History
                  </Nav.Link>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    ref={(input) => (fileInputRef.current = input)}
                  />
                  <Button
                    variant="text"
                    startIcon={<i className="fa-solid fa-file-import"></i>}
                    style={{
                      color: "white",
                      textAlign: "center",
                      border: "4px solid yellow",
                      borderRadius: "10px",
                      margin:"5px"
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload Report
                  </Button>
                  {loading && (
                    <CircularProgress size={24} thickness={5} style={{color:"yellow",textAlign:'center',alignContent:'center',alignItems:'center'}} />
                  )}
                </Nav>
              </Container>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Container>
        {choice === 1 ? (
          <UserInfo
            userInfo={props.userInfo}
            updateUserInfo={props.updateUserInfo}
            change={setChange}
          />
        ) : null}
        {choice === 2 ? (
          <MedicalHistory
            updateUserMedicalHistory={props.updateUserMedicalHistory}
            change={setChange}
          />
        ) : null}
      </Container>
    </>
  );
}

export default Header;
