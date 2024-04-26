"use client";

import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import logo from "@/assets/images/oyolloo-logo-color-horizontal.png";

import Link from "next/link";
import axiosInstance from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import { HrContext } from "@/context/HrProvider";

// icon
import ErrorIcon from "@mui/icons-material/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const { setControl, control, getUser } = useContext(HrContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { email, password };
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    // Format the expiration date as a string in UTC format
    const expiresUTC = expirationDate.toUTCString();

    console.log(user);
    try {
      const response = await axiosInstance.post("/api/login", user);
      const accessToken = response.data.data.token;
      const data = response.data.data;
      console.log(data);

      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("user", JSON.stringify(data));

      // set cookie

      // Set the cookie with the expiration time
      document.cookie = `session=${email}; expires=${expiresUTC}; path=/;`;

      router.push("/dashboard/me");
      // setControl(!control);
      getUser();
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
  };
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          padding: "50px 30px",
          marginTop: "50px",

          borderRadius: "16px",
        }}
      >
        <img
          style={{ maxWidth: "220px", marginBottom: "2.25rem" }}
          src={logo.src}
          alt=''
        />
        <Typography
          variant='h4'
          align='center'
          sx={{
            fontSize: "20px",
            display: "flex",
            gap: "5px",
            fontWeight: "600",
          }}
          gutterBottom
        >
          <FontAwesomeIcon
            style={{ width: "20px", color: "#2f7bff", marginBottom: "20px" }}
            icon={faShieldHalved}
          />
          Welcome to Oyolloo
        </Typography>
        <form onSubmit={handleSubmit}>
          {error ? (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #f1c959",
                background: "#F6F9FB",
                boxShadow: "rgba(9, 8, 61, 0.08) 0px 1px 4px;",
                borderRadius: "4px",
                padding: "10px",
                fontSize: ".75rem",
              }}
            >
              {" "}
              <ErrorIcon sx={{ color: "#f1c959" }} /> Invalid email or password
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            fullWidth
            margin='normal'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin='normal'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ textAlign: "right", padding: "5px 0" }}>
            <Link href='#'>Forgot Password</Link>
          </Box>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            //   onClick={handleLogin}
            sx={{ marginTop: "20px", padding: "15px", fontSize: "18px" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
