import styled from "@emotion/styled";
import { Button } from "@mui/material";

const CustomButton = styled(Button)(() => ({
  boxShadow: "none",
  textTransform: "none",
  padding: ".5rem 1rem .5rem 1rem",
  "&:hover": {
    boxShadow: "none",
  },
}));

export default CustomButton;
