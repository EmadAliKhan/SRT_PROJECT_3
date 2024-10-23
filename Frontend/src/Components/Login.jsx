import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Api";
const Login = () => {
  const navigate = useNavigate();
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
    const token = localStorage.getItem("token");

    console.log("token", token);

    // console.log("data", data);
    if (!data) {
      notifyError("🦄 Fill all the fields!");
    } else {
      console.log(data, "login Data");
      notifySuccess("🦄 Successfully signed In");

      try {
        const res = await axios.post(`${BASE_URL}/login`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.message);
        const userToken = res.data.token;
        // localStorage.setItem("token", userToken);
        // navigate("/home");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

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
              className="d-flex justify-content-center text-black mb-3 jacques-francois-shadow-regular"
              style={{
                fontSize: "50px",
                wordSpacing: "5px",
              }}
            >
              Sign In
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <Grid container spacing={1.5}>
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
                <div
                  className="ps-3 jacques-francois-shadow-regular"
                  style={{
                    fontSize: "19px",
                    cursor: "pointer",
                    color: "rgba(93, 221, 241, 0.856)",
                  }}
                >
                  <p>Forget Password ?</p>
                </div>
                {/* Login Button */}
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button className="button px-5" type="submit">
                    <span className="jacques-francois-shadow-regular">
                      Sign In
                    </span>{" "}
                    <LoginIcon className="fs-3" />
                  </button>
                </Grid>

                <Grid item xs={12}>
                  <p
                    className="jacques-francois-shadow-regular pt-1 text-center"
                    style={{ fontSize: "18px" }}
                  >
                    Don't Have an Account?{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        color: "rgba(93, 221, 241, 0.856)",
                        fontSize: "20px",
                      }}
                      onClick={() => navigate("/")}
                    >
                      SignUp Here
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

export default Login;
