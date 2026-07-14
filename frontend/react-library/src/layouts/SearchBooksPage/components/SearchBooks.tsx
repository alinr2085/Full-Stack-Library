import { Link } from "react-router-dom";
import type { BookModel } from "../../../models/BookModel";

export const SearchBooks = ({ book }: { book: BookModel }) => {
  return (
    <div className="card shadow p-1 bg-body mt-2">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-flex justify-content-center align-items-center d-md-block">
            {book.img ? (
              <img src={book.img} alt="book" className="img-fluid" />
            ) : (
              <img
                src="/images/download (1).jfif"
                alt="book"
                className="img-fluid"
              />
            )}
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{book.title}</h3>
            <h5>{book.author}</h5>
            <p
              className="card-text"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {book.description}
            </p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <Link className="btn btn-primary" to={`/checkout/${book.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
