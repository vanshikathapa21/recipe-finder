import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import toast from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const signupUrl = `${API_BASE}/auth/signup`;
      console.log("[Signup.jsx] signupUrl:", signupUrl);
      const loadingToast = toast.loading("Creating account...");
      const res = await axios.post(signupUrl, {
        email,
        password,
      });

      if (res.status === 201 || res.data.message === "Signup successful") {
        toast.dismiss(loadingToast);
        toast.success("Signup successful. Please log in.");
        navigate("/", { replace: true });
        return;
      }

      toast.dismiss(loadingToast);
      toast.error(res.data.message || "Unable to sign up. Try again.");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to sign up.";
      toast.error(msg);
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
