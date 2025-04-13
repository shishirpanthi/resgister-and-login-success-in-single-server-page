import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import styles from "./Registerform.module.css"; // Import CSS module

function Registerform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Destructure reset function
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Disable the button and show loading
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("User registered successfully!"); // Show success toast
        reset(); // Reset the form fields
        navigate("/login"); // Navigate to the "login" page
      } else {
        toast.error(result.message || "Registration failed"); // Show error toast
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            id="username"
            className={styles.input}
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z\s]+$/, // Only allow letters and spaces
                message: "Username must contain only letters and spaces",
              },
            })}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>

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
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
      <p className={styles.redirect}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Go to Login
        </Link>
      </p>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
}

export default Registerform;
