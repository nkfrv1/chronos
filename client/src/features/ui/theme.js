import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mono: {
            main: grey[800],
            contrastText: grey[50]
        }
    },
    typography: {
        fontFamily: `"Montserrat", sans-serif`,
    }
});

export default theme;