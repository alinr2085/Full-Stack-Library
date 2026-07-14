import { Link } from "react-router-dom";

export const ExploreBooks = () => {
  return (
    <div className="header bg-dark p-5">
      <div className="container-fluid py-4 text-white text-center">
        <h2 className="fw-bold">Browse books and choose whatever you like</h2>
        <Link className="btn btn-primary mt-3" to="/search">
          Explore books
        </Link>
      </div>
    </div>
  );
};
