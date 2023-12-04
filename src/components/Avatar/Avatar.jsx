import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageAvatars(props) {
  const [selectedAvatar, setSelectedAvatar] = useState("Female");

  const handleAvatarClick = (avatarType) => {
    var newUserInfo = {};
    
    if (avatarType === "Male") {
      newUserInfo = {
        Age: 26,
        City: "Ghaziabad",
        BodyType: "Fit",
        Sex: "Male",
      };
    } else if (avatarType === "Female") {
      newUserInfo = {
        Age: 26,
        City: "Delhi",
        BodyType: "Fit",
        Sex: "Female",
      };
    }
    
    props.updateUserInfo(JSON.stringify(newUserInfo));
    
    console.log(`Clicked on ${avatarType} avatar`);
    
    setSelectedAvatar(avatarType); // Set the selected avatar
    
    toast.success(
      `Changed User info to:${JSON.stringify(newUserInfo)} \nChat History is reset`,
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

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Male"
        src="https://img.freepik.com/free-icon/user_318-219687.jpg?t=st=1692208885~exp=1692209485~hmac=13e93c1cb9061c535132f1dffae2f2a80dca8dfc7adb2e56df21dbb52815f157"
        onClick={() => handleAvatarClick('Male')}
        style={{
          border: selectedAvatar === 'Male' ? '4px solid yellow' : 'none',
          borderRadius: '50%',
        }}
      />
      <Avatar
        alt="Female"
        src="https://img.freepik.com/free-icon/girl_318-157505.jpg?t=st=1692208944~exp=1692209544~hmac=a465ac974f2d8f278167772329eb0ec94e98cd19924051aefb2ad90613a2eecd"
        onClick={() => handleAvatarClick('Female')}
        style={{
          border: selectedAvatar === 'Female' ? '4px solid yellow' : 'none',
          borderRadius: '50%',
        }}
      />
    </Stack>
  );
}

export default ImageAvatars;
