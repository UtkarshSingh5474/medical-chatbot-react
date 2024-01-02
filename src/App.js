import React from "react";
import "./App.css";
import ChatBot from "react-simple-chatbot";
import CardListStep from "./components/CardListStep/CardListStep";
import {
  getCombinedOutfitTextWithSearchResultsApiRequest, getOpenAIResponse
} from "./libs/api";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { generateTextResponse,generateTextAndImageResponse } from "./libs/Gemini";

var chatbotKey = 0; // Key to trigger re-render

// Define initial system behavior and user information
var chatbotBehaviour =
  "Your name is: HealthGenie - As a Medical Assistant Chatbot, Your goal is to analyse the medical report text(if 'report=1'), tell the user possible symptoms,diagnosis,medicines and precautions. Don't talk outside the medical context.";
var userInfo = "";
var userMedicalHistory = "";


// Define the initial system message based on your variables
var initialSystemMessage = {
  role: "system",
  content: `${chatbotBehaviour},userInfo:${userInfo},userMedicalHistory:${userMedicalHistory}`,
};

var messages = [initialSystemMessage]; // Initialize messages array with initial system message

class Chatbot extends React.Component {
  // State to manage user information and Medical History
  state = {
    userInfo: userInfo,
    userMedicalHistory: userMedicalHistory,
    chatbotKey: chatbotKey,
  };

  
  // Callback function to update user information
  updateUserInfoCallback = (newUserInfo) => {
    this.setState({
      userInfo: newUserInfo,
      chatbotKey: this.state.chatbotKey + 1, // Trigger re-render
    });
    userInfo = newUserInfo;
    // Update the initial system message
    initialSystemMessage = {
      role: "system",
      content: `${chatbotBehaviour},userInfo:${userInfo},userMedicalHistory:${userMedicalHistory}`,
    };
    messages = [initialSystemMessage]; // Reset chat history

    // Display success toast
    toast.success(
      "User Information Updated Successfully!\nChat History is resetted",
      {
        // Toast configuration
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  // Callback function to update user Medical History
  updateUserMedicalHistory = (customMedicalHistory) => {
    this.setState({
      userMedicalHistory: customMedicalHistory,
      chatbotKey: this.state.chatbotKey + 1,
    });
    userMedicalHistory = customMedicalHistory;
    // Update the initial system message
    initialSystemMessage = {
      role: "system",
      content: `${chatbotBehaviour},userInfo:${userInfo},userMedicalHistory:${userMedicalHistory}`,
    };
    messages = [initialSystemMessage]; // Reset chat history

    // Display success toast
    toast.success(
      "Medical History Updated Successfully!\nChat History is resetted",
      {
        // Toast configuration
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  // Callback function to upload file recieve data
  fileUpload = (text) => {
    this.setState({
      chatbotKey: this.state.chatbotKey + 1,
    });
    console.log("text", text);
    // Update the initial system message
    initialSystemMessage = {
      role: "system",
      content: `${chatbotBehaviour},userInfo:${userInfo},userMedicalHistory:${userMedicalHistory}, medical report:${text}`,
    };
    messages = [initialSystemMessage]; // Reset chat history

    // Display success toast
    toast.success(
      "File Updated Successfully!\nChat History is resetted",
      {
        // Toast configuration
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  render() {
    // Chatbot steps configuration
    const steps = [
      {
        id: "1",
        message:
        "Hello,  I am HealthGenie - A Medical Assistant Chatbot. I can help you with your medical queries. Upload your medical report to get started.",
        trigger: "userInput",
      },
      {
        id: "userInput",
        user: true,
        trigger: "getResponse",
      },
      {
        id: "getResponse",
        component: <ApiResponseStep />,
        asMessage: true,
        waitAction: true,
        trigger: "showCardList",
      },
      {
        id: "showCardList",
        component: <CardListStep />,
        waitAction: true,
        trigger: "userInput",
      },
    ];

    // Render the Chatbot component
    return (
      <div className="root">
        <ToastContainer />
        {/* Header component */}
        <Header
          userInfo={this.state.userInfo}
          userMedicalHistory={this.state.userMedicalHistory}
          updateUserInfo={this.updateUserInfoCallback}
          updateUserMedicalHistory={this.updateUserMedicalHistory}
          fileUpload={this.fileUpload}
        />
        <div className="chatbot-container">
          <ChatBot
            key={this.state.chatbotKey}
            // Chatbot configuration
            submitButtonStyle={{ backgroundColor: "#FADB22" }}
            botAvatar="https://www.citypng.com/public/uploads/preview/hd-flipkart-round-logo-icon-transparent-png-11664325137typezbr9k9.png"
            headerTitle="HealthGenie - A Medical Assistant Chatbot"
            className="chatbot"
            hideHeader={false}
            customStyle={{
              // Apply custom styles for the chatbot container
              background: "transparent", // Completely transparent background
              boxShadow: "none", // No box shadow
              border: "none", // No border
            }}
            style={{
              height: "80vh", // Increase the height for desktop
              width: "100%", // Adjust the width to your preference
              margin: "0 auto", // Center horizontally
            }}
            steps={steps}
            handleEnd={() => console.log("Chat ended")}
          />
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {/* Due to trial credits of OpenAI API, the response is slow. */}
          </p>
        </div>
      </div>
    );
  }
}

// Component for displaying API response
class ApiResponseStep extends React.Component {
  state = {
    message: "Getting response...",
  };

  async componentDidMount() {
    const { previousStep, triggerNextStep } = this.props;
    // User input for API request
    const userInput = {
      role: "user",
      content: previousStep.value,
    };
    // Add user input to messages array
    messages.push(userInput);
    // Display logs for debugging

    // API request to get outfit information
    console.log("messages", messages);


    getOpenAIResponse(messages)
      .then((response) => {
        console.log("response:", response);
      
        const message = response;

        // Assistant's response
        const modelResponse = {
          role: "assistant",
          content: message,
        };
        messages.push(modelResponse); // Add model response to messages array



        this.setState({ message }, () => {
          triggerNextStep({
            trigger: "userInput",
          });
        });
      })
      .catch((error) => {
        console.error("API request error:", error);
        // Handle error and trigger next step
        this.setState({ message: "Oops! An error occurred." }, () => {
          triggerNextStep({
            value: "Oops! An error occurred.",
            trigger: "userInput",
          });
        });
      });
  }

  render() {
    return (
      <div className="responseMessage">
        <div dangerouslySetInnerHTML={{ __html: this.state.message }} />
      </div>
    );
  }
}

export default Chatbot;

// Component with background
// customStyle={{
//   // Apply custom styles for the chatbot container
//   width: "fit-content", // Set width to fit inner content
//   margin: "0 auto", // Center horizontally
//   marginBottom: "40px",
//   background: "rgba(0, 0, 0, 0)", // Transparent background
//   boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow for better visibility
//   borderRadius: "10px", // Rounded corners
// }}
