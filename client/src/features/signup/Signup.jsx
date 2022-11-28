import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import Input from "../ui/Input";
import { CustomButton as Button } from "../ui/Button";
import { CustomSnackbar as Snackbar } from "../ui/Snackbar";


function Signup() {
    const initialCreds = {
        username: '',
        password: '',
        confirmation: '',
        email: ''
    };

    const [credentials, setCredentials] = useState(initialCreds);
    const [open, setOpen] = useState(true);
    const errors = useActionData();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = () => {
        setOpen(true);
        setTimeout(() => {
            setCredentials(initialCreds);
        }, 500);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {errors &&
                <Snackbar open={open} duration={3000} onClose={handleClose} errors={errors} />
            }
            <Form method="post">
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Sign Up
                </Typography>
                <Input name="username" label="Username" value={credentials.username} onChange={handleChange} autofocus />
                <Input name="password" label="Password" type="password" value={credentials.password} onChange={handleChange} />
                <Input name="confirmation" label="Confirmation" type="password" value={credentials.confirmation} onChange={handleChange} />
                <Input name="email" label="Email" type="email" value={credentials.email} onChange={handleChange} />
                <Button type="submit" value="Sign Up" onClick={handleClick} />
                <Divider sx={{ width: '100%' }} />
                <Typography sx={{ mt: 2 }}>
                    <Link to={'/login'} style={{ textDecoration: 'none' }}>Already have an account?</Link>
                </Typography>
            </Form>
        </>
    );
}

export default Signup;