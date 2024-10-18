import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../Api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  //Showing error using react-toastify
  const notifyError = (error) =>
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifySuccess = (Success) =>
    toast.success(Success, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  //Getting data using react-hook-form
  const { register, handleSubmit } = useForm();
  const onSubmitHandler = async (data) => {
    // console.log("data", data);
    if (!data) {
      notifyError("🦄 Fill all the fields!");
    } else if (data.password !== data.ConfirmPassword) {
      notifyError("🦄 Password and Confirm Password must be same!");
    } else {
      console.log(data, "final data");
      notifySuccess("🦄 Your Account created Successfully");
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url('https://cdn.pixabay.com/photo/2016/10/22/17/06/gradient-1761190_1280.jpg')`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "450px",
            margin: "0 auto",
            padding: "10px 20px 0px 20px",
            border: "1px solid black",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            borderRadius: "50px",
            boxSizing: "border-box",
          }}
        >
          <CardContent>
            <h1
              className="d-flex justify-content-center text-dark mb-3 jacques-francois-shadow-regular"
              style={{
                fontSize: "50px",
                wordSpacing: "5px",
              }}
            >
              Sign Up
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <Grid container spacing={1.5}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="First Name"
                    {...register("firstName")}
                    placeholder="First Name"
                    variant="outlined"
                    fullWidth
                    type="String"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      input: { color: "black" },
                    }}
                  />
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Last Name"
                    {...register("lastName")}
                    placeholder="Last Name"
                    variant="outlined"
                    fullWidth
                    type="String"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      input: { color: "black" },
                    }}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Email"
                    {...register("email")}
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      input: { color: "black" },
                    }}
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Password"
                    {...register("password")}
                    placeholder="password"
                    variant="outlined"
                    fullWidth
                    type="String"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      input: { color: "black" },
                    }}
                  />
                </Grid>
                {/* Confirm Password */}
                <Grid item xs={12}>
                  <TextField
                    required
                    label="ConfirmPassword"
                    {...register("ConfirmPassword")}
                    placeholder="confirmPassword"
                    variant="outlined"
                    fullWidth
                    type="String"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      input: { color: "black" },
                    }}
                  />
                </Grid>

                {/* SignUp Button */}
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button className="button px-5" type="submit">
                    <span className="jacques-francois-shadow-regular">
                      Sign Up
                    </span>{" "}
                    <PersonAddAlt1Icon className="fs-3" />
                  </button>
                </Grid>

                <Grid item xs={12}>
                  <p
                    className="jacques-francois-shadow-regular pt-1 text-center"
                    style={{ fontSize: "18px" }}
                  >
                    Already Have an Account?{" "}
                    <span
                      // className="text-light"
                      style={{
                        cursor: "pointer",
                        color: "rgba(93, 221, 241, 0.856)",
                        fontSize: "20px",
                      }}
                      onClick={() => navigate("/login")}
                    >
                      SignIn Here
                    </span>{" "}
                  </p>
                </Grid>
              </Grid>

              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
