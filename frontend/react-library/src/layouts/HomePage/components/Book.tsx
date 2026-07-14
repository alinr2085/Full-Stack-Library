import { Link } from "react-router-dom";
import type { BookModel } from "../../../models/BookModel";

export const Book = ({ book }: { book: BookModel }) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
      <div className="text-center">
        {book.img ? (
          <img src={book.img} alt="book" width={150} height={200} />
        ) : (
          <img
            src="/images/download (1).jfif"
            alt="book"
            width={150}
            height={200}
          />
        )}
        <br />
        <p
          className="fw-bold mb-0 mt-1 text-nowrap"
          style={{ fontSize: "14px" }}
        >
          {book.title}
        </p>
        <p className="mb-0" style={{ fontSize: "10px" }}>
          {book.author}
        </p>
        <Link className="btn btn-primary mt-3" to={`../checkout/${book.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
