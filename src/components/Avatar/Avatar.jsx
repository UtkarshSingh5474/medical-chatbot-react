import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase.config';

function ImageAvatars(props) {
  const [selectedAvatar, setSelectedAvatar] = useState("Male");
  const [profileUrl, setProfileUrl] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.providerData.forEach((profile) => {
          console.log(profile.photoURL);
          setProfileUrl(profile.photoURL);
        });
      } else {
        // Handle the case where the user is not logged in
        setProfileUrl(null);
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Male"
        src={profileUrl}
        style={{
          border: selectedAvatar === 'Male' ? '4px solid yellow' : 'none',
          borderRadius: '50%',
        }}
      />
    </Stack>
  );
}

export default ImageAvatars;
