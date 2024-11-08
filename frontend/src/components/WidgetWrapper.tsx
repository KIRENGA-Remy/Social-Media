import { Box, styled } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export default WidgetWrapper;
