import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

let shown = false;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    if (!shown) {
      toast.error("Please login first to continue 🔒");
      shown = true;

      setTimeout(() => {
        shown = false;
      }, 2000);
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;