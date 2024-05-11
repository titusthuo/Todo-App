import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    });
    const [resetEmail, setResetEmail] = useState("");
    const [resetPasswordSent, setResetPasswordSent] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [resetPasswordMode, setResetPasswordMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage");
            }
        });
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/homepage");
            })
            .catch((err) => alert(err.message));
    };

    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
            alert("Please confirm that emails are the same");
            return;
        } else if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("Please confirm that passwords are the same");
            return;
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
            .then(() => {
                navigate("/homepage");
            })
            .catch((err) => alert(err.message));
    };

    const handleResetPassword = () => {
        setIsResettingPassword(true);
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                setResetPasswordSent(true);
            })
            .catch((error) => {
                console.error("Error sending reset password email:", error.message);
            })
            .finally(() => {
                setIsResettingPassword(false);
            });
    };

    const handleSignInWithNewPassword = () => {
        signInWithEmailAndPassword(auth, resetEmail, password)
            .then(() => {
                navigate("/homepage");
            })
            .catch((err) => alert(err.message));
    };

    return ( <
        div className = "welcome" >
        <
        h1 > Todo - List < /h1> <
        div className = "login-register-container" > {
            isRegistering ? ( <
                >
                <
                input type = "email"
                placeholder = "Email"
                value = { registerInformation.email }
                onChange = {
                    (e) =>
                    setRegisterInformation({
                        ...registerInformation,
                        email: e.target.value
                    })
                }
                /> <
                input type = "email"
                placeholder = "Confirm Email"
                value = { registerInformation.confirmEmail }
                onChange = {
                    (e) =>
                    setRegisterInformation({
                        ...registerInformation,
                        confirmEmail: e.target.value
                    })
                }
                /> <
                input type = "password"
                placeholder = "Password"
                value = { registerInformation.password }
                onChange = {
                    (e) =>
                    setRegisterInformation({
                        ...registerInformation,
                        password: e.target.value
                    })
                }
                /> <
                input type = "password"
                placeholder = "Confirm Password"
                value = { registerInformation.confirmPassword }
                onChange = {
                    (e) =>
                    setRegisterInformation({
                        ...registerInformation,
                        confirmPassword: e.target.value
                    })
                }
                /> <
                button className = "sign-in-register-button"
                onClick = { handleRegister } > Register < /button> <
                button className = "create-account-button"
                onClick = {
                    () => setIsRegistering(false) } > Have an account ? Go back < /button> <
                />
            ) : ( <
                >
                <
                input type = "email"
                placeholder = "Email"
                onChange = { handleEmailChange }
                value = { email }
                /> <
                input type = "password"
                onChange = { handlePasswordChange }
                value = { password }
                placeholder = "Password" /
                >
                <
                button className = "sign-in-register-button"
                onClick = { handleSignIn } >
                Sign In <
                /button> <
                button className = "create-account-button"
                onClick = {
                    () => setIsRegistering(true) } >
                Create an account <
                /button> <
                />
            )
        }

        {
            resetPasswordMode ? ( <
                > {
                    resetPasswordSent ? ( <
                        >
                        <
                        p style = {
                            { fontSize: "1.5em", fontWeight: "bold", color: "red" } } > Check your email to reset your password. < /p>

                        <
                        input type = "email"
                        placeholder = "Enter your email"
                        value = { resetEmail }
                        onChange = {
                            (e) => setResetEmail(e.target.value) }
                        /> <
                        input type = "password"
                        placeholder = "Enter your new password"
                        value = { password }
                        onChange = {
                            (e) => setPassword(e.target.value) }
                        /> <
                        button className = "sign-in-register-button"
                        onClick = { handleSignInWithNewPassword } >
                        Sign In with New Password <
                        /button> <
                        />
                    ) : ( <
                        >
                        <
                        input type = "email"
                        placeholder = "Enter your email"
                        value = { resetEmail }
                        onChange = {
                            (e) => setResetEmail(e.target.value) }
                        /> <
                        button className = "reset-password-button"
                        onClick = { handleResetPassword }
                        disabled = {!resetEmail || isResettingPassword } >
                        { isResettingPassword ? "Resetting..." : "Reset Password" } <
                        /button> <
                        />
                    )
                } <
                />
            ) : ( <
                >
                <
                button className = "create-account-button"
                onClick = {
                    () => setResetPasswordMode(true) } >
                Forgot Password ? Reset Your Password <
                /button> <
                />
            )
        } <
        /div> <
        /div>
    );
}