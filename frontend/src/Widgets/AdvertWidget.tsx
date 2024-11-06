import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper";

const AdvertWidget: React.FC = () => {
  const theme = useTheme();
  const dark = theme.palette.secondary?.dark || theme.palette.text.primary;
  const main = theme.palette.secondary?.main || theme.palette.text.secondary;
  const medium = theme.palette.secondary?.light || theme.palette.text.disabled;

  return (
    <WidgetWrapper>
      <div className="flex justify-between gap-2">
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium} variant="body2">Create Ad</Typography>
      </div>
      <img
        src="http://localhost:4321/assets/ba.png"
        alt="advert"
        width="100%"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <div className="flex justify-between gap-2">
        <Typography color={main} variant="subtitle1">MikaCosmetics</Typography>
        <Typography color={medium} variant="body2">mikacosmetics.com</Typography>
      </div>
      <Typography color={medium} sx={{ margin: "0.5rem 0" }}>
        Your pathway to stunning and immaculate beauty, ensuring your skin is exfoliated and shines like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
