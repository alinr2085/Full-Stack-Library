import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(email);
    if (error) setErrorMsg("email or password is wrong");
    else navigate("/home");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container my-5 p-4 shadow-lg border border-3">
        <h2>Welcome To Library</h2>
        <input
          className="form-control mt-5"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mt-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="d-flex justify-content-center align-items-center fw-bold text-danger my-3"
          style={{ height: 40 }}
        >
          <p className="my-1">{errorMsg}</p>
        </div>{" "}
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-2">
          No account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
