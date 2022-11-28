import { Button, ThemeProvider } from "@mui/material";
import theme from "./theme";

export function CustomButton(props) {
    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                size="medium"
                sx={{ my: 2 }}
                color="mono"
                type={props?.type}
                onClick={props?.onClick}
                fullWidth
            >
                {props.value}
            </Button>
        </ThemeProvider>
    );
}
