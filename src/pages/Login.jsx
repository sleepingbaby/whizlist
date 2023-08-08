import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Stack, Typography, TextField, Box, Link, Button } from "@mui/material";
import { api } from "../utilities";
import { userContext } from "../contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";

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

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    let response = await api
      .post("users/login/", {
        email: userName,
        password: password,
      })
      .catch((err) => {
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
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
      <form onSubmit={(event) => login(event)}>
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
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Typography sx={{ fontSize: "1.5em" }}>Log In</Typography>
          <TextField
            id="filled-basic"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            label="Username"
            variant="filled"
            sx={{ ...InputCSS }}
          />
          <TextField
            id="filled-basic"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            type="password"
            variant="filled"
            sx={{ ...InputCSS }}
          />
          <Stack direction="row" mt={2} alignItems="center">
            <Typography sx={{ fontSize: ".8em" }}>
              Don't have an account?&nbsp;
            </Typography>
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: "white",
                textDecoration: "underline",
                fontSize: ".8em",
                "&:hover": { color: "secondary.main" },
              }}
            >
              Sign Up
            </Link>
          </Stack>
          <Link
            component={RouterLink}
            to="/forgotpassword"
            sx={{
              color: "white",
              textDecoration: "underline",
              marginTop: "10px",
              fontSize: ".8em",
              "&:hover": { color: "secondary.main" },
            }}
          >
            Forgot Password
          </Link>
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

export default Login;
