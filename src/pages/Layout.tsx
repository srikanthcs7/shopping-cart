import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Layout = styled(Box)(() => ({
  // border: "1px solid red",
  display: "flex",
  flexGrow: 1,
  overflowY: "scroll",
  margin: "24px",
  maxHeight: "90vh",
}));

export default Layout;
