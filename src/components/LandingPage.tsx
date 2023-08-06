import { Box, Button, Link, Stack, TextField } from "@mui/material";
import AppIcon from "./AppIcon";

const LandingPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <AppIcon />
      <Stack direction="row" spacing={2} mt={4} sx={{ width: "50%" }}>
        <TextField
          id="filled-basic"
          label="Location..."
          variant="filled"
          sx={{ ...InputCSS }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#597B91",
            "&:hover": { backgroundColor: "#324754" },
          }}
        >
          Submit
        </Button>
      </Stack>
      <Link href="#" mt={2} sx={{ color: "#597B91" }}>
        Find My Location
      </Link>
    </Box>
  );
};

const InputCSS = {
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#D9D9D9",
  color: "#828282",
  marginTop: "25px",
  "& label.Mui-focused": { color: "#828282" },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
};

export default LandingPage;
