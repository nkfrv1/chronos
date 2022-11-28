import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import theme from "./theme";

function Input(props) {
    return (
        <ThemeProvider theme={theme}>
            <TextField
                sx={{ my: 1 }}
                variant="outlined"
                required
                fullWidth
                color="mono"
                autoFocus={props.autofocus}
                label={props?.label}
                name={props?.name}
                type={
                    props?.showToggler ?
                        props.showPass ? 'text' : 'password'
                        :
                        props.type
                }
                value={props?.value}
                onChange={props?.onChange}
                InputProps={props.showToggler && {
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton edge="end" onClick={props?.onClick} onMouseDown={props?.onMouseDown}>
                                {props.showPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
        </ThemeProvider>
    );
}

export default Input;