import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (!res.data.token) {
        const message = res.data?.message || "Login failed. Please check your credentials.";
        alert(message);
        localStorage.removeItem("token");
        return;
      }

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Error during login. Please try again.";
      alert(message);
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