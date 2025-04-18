import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Link,
    InputAdornment,
    IconButton,
    Divider,
    Alert,
    Grid,
    Snackbar,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setErrors({});
        setAuthError("");
        setAuthSuccess("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }

        if (authError) {
            setAuthError("");
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required";
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Last name is required";
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!isLogin && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                // Login request
                const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                    email: formData.email,
                    password: formData.password,
                });
                console.log("response:", response);
                

                dispatch(setCredentials({
                    user: response.data.user,
                    token: response.data.token,
                }));
                
                sessionStorage.setItem('auth', JSON.stringify({
                    user: response.data.user,
                    token: response.data.token,
                }));

                setAuthSuccess("Login successful!");
                navigate("/app/dashboard");
            } else {
                // Register request
                const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                });

                setAuthSuccess("Registration successful! You can now login.");
                setTimeout(() => {
                    setIsLogin(true);
                    setAuthSuccess("");
                }, 2000);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                "An error occurred. Please try again.";
            setAuthError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setAuthError("");
        setAuthSuccess("");
    };

    return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    p: 2,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        maxWidth: isLogin ? 450 : 550,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight="bold"
                            color="primary.main"
                        >
                            Super Admin
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {isLogin ? "Sign in to your account" : "Create your account"}
                        </Typography>
                    </Box>

                    <Snackbar
                        open={!!authError || !!authSuccess}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert
                            onClose={handleCloseAlert}
                            severity={authError ? "error" : "success"}
                            sx={{ width: "100%" }}
                        >
                            {authError || authSuccess}
                        </Alert>
                    </Snackbar>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {!isLogin && (
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}

                        {isLogin && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 3 }}>
                                <Link href="#" variant="body2" underline="hover">
                                    Forgot password?
                                </Link>
                            </Box>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mb: 3, py: 1.2 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    {isLogin ? "Signing In..." : "Registering..."}
                                </>
                            ) : (
                                isLogin ? "Sign In" : "Sign Up"
                            )}
                        </Button>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={toggleAuthMode}
                                    underline="hover"
                                    fontWeight="medium"
                                    color="primary.main"
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
    );
}