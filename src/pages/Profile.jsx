import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/UserContext";
import {
  TextField,
  Typography,
  Stack,
  Box,
  Avatar,
  FormControl,
  Button,
  Tooltip,
} from "@mui/material";
import { FileUpload, SentimentSatisfied } from "@mui/icons-material";
import { api } from "../utilities";

const InputCSS = {
  width: { xs: "90%", sm: "100%" },
  borderRadius: "8px",
  backgroundColor: "#D9D9D9",
  color: "#828282",
  marginTop: "25px",
  "& label.Mui-focused": { color: "#828282" },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:before": {
    borderBottom: "none",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
};

const Profile = () => {
  const { user, getUser } = useContext(userContext);
  const [profilePic, setProfilePic] = useState(
    user.profile_pic
      ? `${import.meta.env.VITE_BACKEND_URL}/${user.profile_pic}`
      : null
  );
  const [previewURL, setPreviewURL] = useState(null);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [userName, setUserName] = useState(user.display_name);
  const [showUpload, setShowUpload] = useState(false);
  const handleMouseEnter = () => {
    setShowUpload(true);
  };

  const handleMouseLeave = () => {
    setShowUpload(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewURL(previewURL);
  };

  const handleSaveChanges = async () => {
    const formData = {};
    if (profilePic) {
      formData["profile_pic"] = profilePic;
    }
    formData["first_name"] = firstName;
    formData["last_name"] = lastName;
    formData["display_name"] = userName;
    await api
      .patch(`users/update-profile/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile updated successfully: ", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });

    getUser();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="primary.main"
        width={{ xs: "90%", sm: "380px" }}
        borderRadius="8px"
        padding="15px"
      >
        <Typography mb={2} sx={{ color: "white", fontWeight: "bold" }}>
          Profile
        </Typography>
        <FormControl>
          <Stack alignItems="center">
            <Button
              component="label"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {showUpload ? (
                <Tooltip title="Upload Image">
                  <Avatar sx={{ width: 75, height: 75, marginBottom: "15px" }}>
                    <FileUpload />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                      id="profile-pic-input"
                    />
                  </Avatar>
                </Tooltip>
              ) : (
                <>
                  {profilePic ? (
                    <Avatar
                      src={
                        previewURL ||
                        (user.profile_pic &&
                          `${import.meta.env.VITE_BACKEND_URL}/${
                            user.profile_pic
                          }`)
                      }
                      alt="Preview"
                      sx={{ width: 75, height: 75, marginBottom: "15px" }}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 75, height: 75, marginBottom: "15px" }}
                    >
                      <SentimentSatisfied fontSize="large" />
                    </Avatar>
                  )}
                </>
              )}
            </Button>

            <Stack>
              <Stack>
                <TextField
                  variant="filled"
                  label="Email"
                  disabled
                  value={user.email}
                  sx={{ ...InputCSS }}
                />
              </Stack>
              <Stack>
                <TextField
                  variant="filled"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ ...InputCSS }}
                />
              </Stack>
              <Stack>
                <TextField
                  variant="filled"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ ...InputCSS }}
                />
              </Stack>
              <Stack mb={2}>
                <TextField
                  variant="filled"
                  label="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ ...InputCSS }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Button
            type="submit"
            onClick={handleSaveChanges}
            sx={{ color: "orange" }}
          >
            Save Changes
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Profile;