import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let loadingToast ;
    try {
      const loginUrl = `${API_BASE}/auth/login`;
      console.log("[Login.jsx] loginUrl:", loginUrl);
      loadingToast = toast.loading("Logging in...");
      const res = await axios.post(loginUrl, {
        email,
        password,
      });

      if (!res.data.token) {
        toast.dismiss(loadingToast);
        const errorMessage = res.data.message || "Invalid credentials";
        toast.error(errorMessage);
        return;
      }

      localStorage.setItem("token", res.data.token);
      toast.dismiss(loadingToast);
      toast.success("Login successful");

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("[Login.jsx] login error", err);
      const message =
        err.response?.data?.message ||
        "Invalid email or password";

      toast.dismiss(loadingToast); 
      toast.error(message);

    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
