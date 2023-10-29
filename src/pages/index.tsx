import { Box } from "@mui/material";
import Calendario from "../components/Calendario";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "5rem",
      }}
    >
      <Calendario />
    </Box>
  );
}
