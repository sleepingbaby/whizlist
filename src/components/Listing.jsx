import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Divider,
  Tooltip,
  IconButton,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import {
  ExpandMore,
  WcOutlined,
  AccessibleOutlined,
  BabyChangingStationOutlined,
  Comment,
  Close,
  DirectionsRun,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { userContext } from "../contexts/UserContext";
import { api } from "../utilities";

const Listing = ({ toilet }) => {
  const { user } = useContext(userContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [toiletCommentData, setToiletCommentData] = useState([]);

  const fetchCommentData = async () => {
    await api.get(`comments/toilet/${toilet.id}/`).then((response) => {
      setToiletCommentData(response.data);
    });
  };
  const handleModalOpen = async () => {
    fetchCommentData();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleMarkerClick = () => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${toilet.latitude},${toilet.longitude}`;
    window.open(googleMapsLink, "_blank");
  };

  const handleDeleteComment = async (commentId) => {
    await api
      .delete(`comments/delete/${commentId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Comment deleted successfully:", response.data);
        fetchCommentData();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleCommentSubmit = async () => {
    const formData = {};
    formData["commentText"] = commentText;
    formData["toilet"] = toilet.id;
    await api
      .post(`comments/${toilet.id}/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Comment added successfully: ", response.data);
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
    fetchCommentData();
  };

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
      <Divider>
        {toilet.accessible && (
          <Tooltip title="Handicap Accessible">
            <AccessibleOutlined />
          </Tooltip>
        )}
        {toilet.unisex && (
          <Tooltip title="Unisex Stalls">
            <WcOutlined />
          </Tooltip>
        )}
        {toilet.changing_table && (
          <Tooltip title="Changing Station">
            <BabyChangingStationOutlined />
          </Tooltip>
        )}
      </Divider>
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
        <Stack mt={3} alignItems={"center"} justifyContent={"center"}>
          <Stack direction="row">
            <Tooltip title="Comments">
              <IconButton aria-label="navigate" onClick={handleModalOpen}>
                <Comment />
              </IconButton>
            </Tooltip>
            <Tooltip title="Navigate">
              <IconButton aria-label="navigate" onClick={handleMarkerClick}>
                <DirectionsRun />
              </IconButton>
            </Tooltip>
          </Stack>

          <Modal open={modalOpen} onClose={handleModalClose}>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  width: { xs: "80%", sm: "400px" },
                  height: "600px",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <Stack alignItems="flex-end">
                  <IconButton onClick={handleModalClose}>
                    <Close />
                  </IconButton>
                </Stack>

                <List
                  sx={{
                    width: "100%",
                    height: "75%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    overflow: "scroll",
                    "::-webkit-scrollbar": {
                      width: "0",
                      background: "transparent",
                    },
                  }}
                >
                  {toiletCommentData.length < 1 ? (
                    <ListItem>No comments yet...</ListItem>
                  ) : (
                    toiletCommentData.map((obj, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline", fontWeight: "bold" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  mr={1}
                                >
                                  {obj.user.display_name} -
                                </Typography>
                                {obj.commentText}
                              </React.Fragment>
                            }
                          ></ListItemText>
                          {user && user.id === obj.user.id && (
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteComment(obj.id)}
                            >
                              <Close />
                            </IconButton>
                          )}
                        </ListItem>
                        <Divider
                          variant="inset"
                          component="li"
                          sx={{ margin: 0 }}
                        ></Divider>
                      </React.Fragment>
                    ))
                  )}
                </List>
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                  <TextField
                    type="text"
                    label="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{ width: "100%" }}
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{ height: "25px", width: "25%" }}
                    disabled={!user || !commentText}
                    onClick={handleCommentSubmit}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Modal>
          {!user && (
            <Typography fontSize=".5em">Must sign in to comment.</Typography>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Listing;
