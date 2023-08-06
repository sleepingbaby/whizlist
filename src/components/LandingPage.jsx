import { Button, Link, Stack, TextField } from "@mui/material";
import AppIcon from "./AppIcon";

const LandingPage = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", margin: "auto" }}
    >
      <AppIcon />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        mt={4}
        sx={{ width: "100%", maxWidth: "700px" }}
      >
        <TextField
          id="filled-basic"
          label="Location..."
          variant="filled"
          sx={{ ...InputCSS }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "#324754" },
            height: { sm: "56px" },
            width: { xs: "90%", sm: "100px" },
            borderRadius: "8px",
          }}
        >
          Submit
        </Button>
      </Stack>
      <Link
        href="#"
        mt={2}
        sx={{ color: "primary.main", textDecoration: "none" }}
        className="link"
      >
        Find My Location
      </Link>
    </Stack>
  );
};

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

export default LandingPage;
