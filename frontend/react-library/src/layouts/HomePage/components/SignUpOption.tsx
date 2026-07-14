import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/context/AuthContext";

export const SignUpOption = () => {
  const session = useContext(AuthContext);

  return (
    <div className="hero-selection d-flex justify-content-center align-items-center mt-2">
      <div>
        <div className="text-center">
          <h2 className="text-white">What are you looking for?</h2>
          <p className="lead text-white">
            You can get any book you need from any genre, from any period, from
            our library. Just register.
          </p>
          {session.session ? (
            <Link
              type="button"
              className="btn btn-outline-light fw-bold"
              to="../search"
            >
              Explore top books
            </Link>
          ) : (
            <Link
              type="button"
              className="btn btn-outline-light fw-bold"
              to="../login"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
