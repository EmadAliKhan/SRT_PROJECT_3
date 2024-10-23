import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../BASE_Url/BASE_URL";
const Home = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  const decoded = jwtDecode(token);
  console.log(decoded, "decoded");

  const logout = async () => {
    const res = await axios.post(`${BASE_URL}/logout`);
    console.log(res.data);
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    setData(token);
  }, []);
  return (
    <>
      <div className="text-center mt-5">
        <h1 className="fw-bolder" style={{ fontSize: "60px" }}>
          <span>Welcome</span>{" "}
          <span className="jacques-francois-shadow-regular text-success ">
            {decoded.firstName.toUpperCase()}
          </span>
        </h1>
        <h1 className="jacques-francois-shadow-regular pt-3">
          You're <span className="text-success">Successfully</span> Signed in
          ...
        </h1>
        <div className="mt-5">
          <button
            className="btn btn-danger px-4 py-2 fs-3"
            onClick={() => logout()}
          >
            <span className="jacques-francois-shadow-regular"> Logout</span>{" "}
            <LogoutIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
