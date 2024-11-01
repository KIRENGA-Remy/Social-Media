import { Box, styled } from "@mui/material";

// Assuming you're styling Box with custom styles
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export default WidgetWrapper;
