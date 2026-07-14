import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/context/AuthContext";
import library from "/images/download (7).jfif";

export const Services = () => {
  const session = useContext(AuthContext);

  return (
    <div className="container my-5">
      <div className="row align-items-center shadow-lg g-0">
        <div className="col-lg-7 p-4">
          <h2>Can't find the book you're looking for?</h2>
          <p className="lead">
            Send a message to our support team so that your problem can be
            resolved as soon as possible.
          </p>

          {session.session ? (
            <Link
              type="button"
              className="btn btn-outline-dark fw-bold"
              to="/messages"
            >
              Library Services
            </Link>
          ) : (
            <Link
              type="button"
              className="btn btn-outline-dark fw-bold"
              to="../login"
            >
              Sign up
            </Link>
          )}
        </div>
        <div className="col-lg-5">
          <img src={library} alt="Book" height={300} />
        </div>
      </div>
    </div>
  );
};
