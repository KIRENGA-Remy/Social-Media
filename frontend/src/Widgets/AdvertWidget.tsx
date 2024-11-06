import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper";

const AdvertWidget: React.FC = () => {
  // const { palette } = useTheme();
  const theme = useTheme();
  const dark = theme.palette.secondary.dark;
  const main = theme.palette.secondary.main;
  const medium = theme.palette.secondary.light;

  return (
    <WidgetWrapper>
      <div className="flex justify-between gap-2">
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </div>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:4321/assets/ba.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <div className="flex justify-between gap-2">
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </div>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty, ensuring your skin
        is exfoliated and shines like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
