import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import styles from "./Login.module.css"; // Import CSS module

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
const onSubmit = async (data) => {
  setIsSubmitting(true); // Disable the button and show loading
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success("Login successful!"); // Show success toast
      localStorage.setItem("authToken", result.token); // Save token to localStorage
      localStorage.setItem("userData", JSON.stringify(result.user)); // Save user data to localStorage
      navigate("/admin"); // Redirect to the /admin page
    } else {
      toast.error(result.message || "Login failed"); // Show error toast
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("An error occurred during login");
  } finally {
    setIsSubmitting(false); // Re-enable the button
  }
};
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className={styles.registerPrompt}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.link}>
          Register here
        </Link>
      </p>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
}

export default Login;
