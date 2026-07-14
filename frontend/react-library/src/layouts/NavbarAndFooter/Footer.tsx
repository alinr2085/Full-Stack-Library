import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="nav-style" style={{ height: 100 }}>
      <footer className="container d-flex justify-content-between flex-wrap align-items-center h-100">
        <p className="text-white my-auto">© Example Library App, Inc</p>
        <ul className="nav navbar-dark justify-content-end">
          <li className="nav-item ml-5">
            <Link className="nav-link text-white" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/search">
              Search
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};
