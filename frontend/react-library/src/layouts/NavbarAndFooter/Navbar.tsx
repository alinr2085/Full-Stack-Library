import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/AuthContext";
import { supabase } from "../../api/supabaseClient";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useContext(AuthContext);

  console.log(session);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-style py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Library</span>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarOptions"
          aria-expanded={isOpen}
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarOptions"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            {session.session && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/shelf">
                  Shelf
                </NavLink>
              </li>
            )}
            {session.session && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/fees">
                  Payments
                </NavLink>
              </li>
            )}
            {session.session?.user.user_metadata.userType == "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <h4
            className="flex-grow-1 text-center m-0 text-white fs-5"
            style={{ fontStyle: "italic" }}
          >
            {session.session
              ? `Welcome back ${session.session?.user.email}`
              : `Please Log in`}
          </h4>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {session.session ? (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              ) : (
                <Link className="btn btn-outline-light" to="/login">
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
