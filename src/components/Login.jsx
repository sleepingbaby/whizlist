import React from "react";
import { Stack, Typography, TextField, Box, Link, Button } from "@mui/material";

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
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Stack
        sx={{
          backgroundColor: "primary.main",
          alignItems: "center",
          padding: "25px",
          color: "white",
          borderRadius: "8px",
          width: { xs: "90%", sm: "380px" },
        }}
      >
        <Typography sx={{ fontSize: "1.5em" }}>Log In</Typography>
        <TextField
          id="filled-basic"
          label="Username"
          variant="filled"
          sx={{ ...InputCSS }}
        />
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          sx={{ ...InputCSS }}
        />
        <Stack direction="row" mt={2} alignItems="center">
          <Typography sx={{ fontSize: ".8em" }}>
            Don't have an account?&nbsp;
          </Typography>
          <Link
            href="#"
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
          href="#"
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
    </Box>
  );
};

export default Login;
