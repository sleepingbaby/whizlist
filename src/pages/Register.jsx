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
} from "@mui/material";
import { api } from "../utilities";
import { userContext } from "../contexts/UserContext";

const InputCSS = {
  width: { xs: "90%", sm: "100%" },
  borderRadius: "8px",
  backgroundColor: "#D9D9D9",
  color: "#828282",
  marginTop: "25px",
  "& label.Mui-focused": { color: "#828282" },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    let response = await api
      .post("users/register/", {
        email: userName,
        password: password,
      })
      .catch((err) => {
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
        >
          <Typography sx={{ fontSize: "1.5em" }}>Register</Typography>
          <TextField
            id="filled-basic"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            label="Username"
            variant="filled"
            required="true"
            sx={{ ...InputCSS }}
          />
          <TextField
            id="filled-basic"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            type="password"
            variant="filled"
            required="true"
            sx={{ ...InputCSS }}
          />
          <TextField
            id="filled-basic"
            onChange={(event) => setConfirmPassword(event.target.value)}
            label="Confirm Password"
            type="password"
            variant="filled"
            required="true"
            sx={{ ...InputCSS }}
          />
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
            Log In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
