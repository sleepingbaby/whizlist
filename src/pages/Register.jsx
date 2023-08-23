import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Stack,
  Typography,
  TextField,
  Box,
  Link,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { api } from "../utilities";
import { userContext } from "../contexts/UserContext";
import { motion } from "framer-motion";
import axios from "axios";

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
  "& .MuiFilledInput-underline:hover": {
    borderBottom: "none",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    let response = await api
      .post("users/register/", {
        email: userName,
        password: password,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response.data);
        } else {
          setError("Unknown error occurred.");
        }
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
        return;
      });
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    navigate("/");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <form onSubmit={(event) => register(event)}>
        <Stack
          sx={{
            animation: isShaking ? "shake 0.5s" : "none",
            backgroundColor: "primary.main",
            alignItems: "center",
            padding: "25px",
            color: "white",
            borderRadius: "8px",
            width: { xs: "90%", sm: "380px" },
          }}
          mb={2}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Typography sx={{ fontSize: "1.5em" }}>Register</Typography>
          <TextField
            required
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            label="Email"
            type="email"
            variant="filled"
            sx={{ ...InputCSS }}
          />
          <TextField
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            label="First Name"
            type="text"
            variant="filled"
            required
            sx={{ ...InputCSS }}
          />
          <TextField
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            label="Last Name"
            type="text"
            variant="filled"
            required
            sx={{ ...InputCSS }}
          />
          <TextField
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            label="User Name"
            type="text"
            variant="filled"
            required
            sx={{ ...InputCSS }}
          />
          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            type="password"
            variant="filled"
            required
            sx={{ ...InputCSS }}
          />
          <TextField
            onChange={(event) => setConfirmPassword(event.target.value)}
            label="Confirm Password"
            type="password"
            variant="filled"
            required
            sx={{ ...InputCSS }}
          />
          {error && (
            <Stack direction="row" alignItems="center">
              <Typography sx={{ color: "red" }}>{error}</Typography>
              <IconButton onClick={() => setError("")}>
                <Close />
              </IconButton>
            </Stack>
          )}

          {password !== confirmPassword && (
            <Alert
              severity="warning"
              sx={{
                marginTop: "15px",
                backgroundColor: "inherit",
                color: "red",
                textShadow: "0px 0px 2px black",
              }}
            >
              Passwords do not match.
            </Alert>
          )}
          <Stack direction="row" mt={2} alignItems="center">
            <Typography sx={{ fontSize: ".8em" }}>
              Already have an account?&nbsp;
            </Typography>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "white",
                textDecoration: "underline",
                fontSize: ".8em",
                "&:hover": { color: "secondary.main" },
              }}
            >
              Log In
            </Link>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "secondary.main",
              "&:hover": { backgroundColor: "#324754" },
              height: { sm: "56px" },
              width: { xs: "90%", sm: "100%" },
              borderRadius: "8px",
              marginTop: "15px",
            }}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
