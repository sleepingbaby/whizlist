import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Stack, Typography, TextField, Box, Link, Button } from "@mui/material";
import { api } from "../utilities";
import { userContext } from "../contexts/UserContext";
import { motion } from "framer-motion";

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
  "& .MuiFilledInput-underline:hover::before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover": {
    borderBottom: "none",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiInputBase-root:hover": {
    borderBottom: "none",
  },
  "& .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
};

const ForgotPassword = () => {
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
          <Typography sx={{ fontSize: "1.5em" }}>Forgot Password</Typography>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            sx={{ ...InputCSS }}
          />
          <Link
            component={RouterLink}
            to="/login"
            mt={2}
            sx={{
              color: "white",
              textDecoration: "underline",
              fontSize: ".8em",
              "&:hover": { color: "secondary.main" },
            }}
          >
            Back to Login
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
            Reset Password
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ForgotPassword;
