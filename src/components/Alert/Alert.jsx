import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../reducers/alertSlice";

export default function Alert({ btnText, btnAction, message }) {
  const dispatch = useDispatch();
  const alertProps = useSelector((state) => state.alertMMS);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert());
  };

  //   setTimeout(() => {
  //     dispatch(hideAlert());
  //   }, 8000);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={alertProps.btnAction}>
        {alertProps.btnText}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={alertProps.isVisible}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
      autoHideDuration={4000}
      message={alertProps.message}
      action={action}
    />
  );
}
