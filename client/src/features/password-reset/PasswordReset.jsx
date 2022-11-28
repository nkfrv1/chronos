import { useState } from "react";
import { Form, Link, useActionData, useLocation } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import Input from "../ui/Input";
import { CustomButton as Button } from "../ui/Button";
import { CustomSnackbar as Snackbar } from "../ui/Snackbar";


function PasswordReset() {
    const initialCreds = {
        email: '',
        new_password: ''
    };

    const location = useLocation();
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
        }, 1000);
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
                    Reset Password
                </Typography>
                {location.pathname.length <= 16 ?
                    <>
                        <Input name="email" label="Email" type="email" value={credentials.email} onChange={handleChange} autofocus />
                        <Button type="submit" onClick={clearFormFields} value="Send Recovery Email" />
                    </>
                    :
                    <>
                        <Input
                            name="new_password"
                            label="New Password"
                            value={credentials.new_password}
                            onChange={handleChange}
                            showPass={passwordVisibility}
                            onClick={toggleVisibility}
                            showToggler
                            autofocus
                        />
                        <Button type="submit" onClick={clearFormFields} value="Apply New Password" />
                    </>
                }
                <Divider sx={{ width: '100%' }} />
                <Typography sx={{ mt: 2 }}>
                    <Link to={'/signup'} style={{ textDecoration: 'none' }}>Don't have an account?</Link>
                </Typography>
            </Form>
        </>
    );
}

export default PasswordReset;