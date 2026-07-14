import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(" ");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setErrorMsg("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(email);
    if (error) setErrorMsg(error.message);
    else navigate("/home");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container p-5 shadow-lg">
        <h2>Welcome To Library</h2>
        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="d-flex justify-content-center align-items-center fw-bold text-danger my-3"
          style={{ height: 40 }}
        >
          <p className="my-1">{errorMsg}</p>
        </div>
        <button className="btn btn-success w-100" onClick={handleSignUp}>
          Sign up
        </button>
        <p className="mt-2">
          Have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
