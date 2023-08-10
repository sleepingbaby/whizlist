import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from "react";

const Listing = ({ toilet }) => {
  return (
    <Accordion sx={{ "&.MuiAccordion-root": { boxShadow: "none" } }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack sx={{ width: "100%" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {toilet.name}{" "}
            </Typography>
            <Typography sx={{ fontSize: ".8rem" }}>
              ({String(toilet.distance).slice(0, 4)}mi)
            </Typography>
          </Stack>

          <Typography color={"#8d8d8d"}>{toilet.street}</Typography>
        </Stack>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        {toilet.directions && (
          <>
            <Typography sx={{ fontWeight: "bold", fontSize: ".75rem" }}>
              Directions:
            </Typography>{" "}
            <Typography fontSize={".75rem"}>{toilet.directions}</Typography>
          </>
        )}
        {toilet.comment && (
          <>
            <Typography sx={{ fontWeight: "bold", fontSize: ".75rem" }}>
              Notes:
            </Typography>{" "}
            <Typography fontSize={".75rem"}>{toilet.comment}</Typography>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Listing;
