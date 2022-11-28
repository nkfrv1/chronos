import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import Input from "../ui/Input";
import { CustomButton as Button } from "../ui/Button";
import { CustomSnackbar as Snackbar } from "../ui/Snackbar";


function Login() {
    const initialCreds = {
        username: '',
        password: ''
    };

    const [credentials, setCredentials] = useState(initialCreds);
    const [passwordVisibility, setVisibility] = useState(false);
    const [open, setOpen] = useState(true);
    const errors = useActionData();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const clearFormFields = () => {
        setOpen(true);
        setTimeout(() => {
            setCredentials(initialCreds);
        }, 500);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const toggleVisibility = () => {
        setVisibility(!passwordVisibility);
    }

    return (
        <>
            {errors &&
                <Snackbar open={open} duration={3000} onClose={handleClose} errors={errors} />
            }
            <Form method="post">
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Sign In
                </Typography>
                <Input name="username" label="Username" value={credentials.username} onChange={handleChange} autofocus />
                <Input
                    name="password"
                    label="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    showPass={passwordVisibility}
                    onClick={toggleVisibility}
                    showToggler
                />
                <Typography sx={{ alignSelf: 'end' }}>
                    <Link to={'/password-reset'} style={{ color: 'inherit', textDecoration: 'none' }}>Forgot password?</Link>
                </Typography>
                <Button type="submit" onClick={clearFormFields} value="Sign In" />
                <Divider sx={{ width: '100%' }} />
                <Typography sx={{ mt: 2 }}>
                    <Link to={'/signup'} style={{ textDecoration: 'none' }}>Don't have an account?</Link>
                </Typography>
            </Form>
        </>
    );
}

export default Login;