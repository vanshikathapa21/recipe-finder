import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/signup`, {
        email,
        password,
      });

      if (res.status === 201 || res.data.message === "Signup successful") {
        alert("Signup successful. Please log in.");
        navigate("/", { replace: true });
        return;
      }

      alert(res.data.message || "Unable to sign up. Try again.");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to sign up.";
      alert(msg);
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
