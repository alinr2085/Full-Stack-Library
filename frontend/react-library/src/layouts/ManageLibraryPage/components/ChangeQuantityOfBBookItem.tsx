import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/context/AuthContext";
import type { BookModel } from "../../../models/BookModel";

export const ChangeQuantityOfBookItem = ({
  book,
  deleteBook,
  isDeleting,
}: {
  book: BookModel;
  deleteBook: (bookId: number) => Promise<void>;
  isDeleting: boolean;
}) => {
  const auth = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);
  const [remaning, setRemaining] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  useEffect(() => {
    const fetchAllBooks = () => {
      setQuantity(Number(book.copies));
      setRemaining(Number(book.copiesAvailable));
    };
    fetchAllBooks();
  }, []);

  async function increaseCopies() {
    setIsIncreasing(true);
    try {
      const url: string = `https://localhost:8081/admin/secure/increase/copies?bookId=${book.id}`;
      const requestOption = {
        method: "PUT",
        headers: {
          authorization: `Bearer ${auth.session?.access_token}`,
          "Content-Type": "application/json",
        },
      };

      const increaseCopiesResponse = await fetch(url, requestOption);
      if (!increaseCopiesResponse.ok)
        throw new Error("Error in increase coopies");
      setQuantity(quantity + 1);
      setRemaining(remaning + 1);
      console.log("INNNNNN");
    } finally {
      setIsIncreasing(false);
    }
  }

  async function decreaseCopies() {
    setIsDecreasing(true);
    try {
      const url: string = `https://localhost:8081/admin/secure/decrease/copies?bookId=${book.id}`;
      const requestOption = {
        method: "PUT",
        headers: {
          authorization: `Bearer ${auth.session?.access_token}`,
          "Content-Type": "application/json",
        },
      };

      const decreaseCopiesResponse = await fetch(url, requestOption);
      if (!decreaseCopiesResponse.ok)
        throw new Error("Error in decrease coopies");
      setQuantity(quantity - 1);
      setRemaining(remaning - 1);
    } finally {
      setIsDecreasing(false);
    }
  }

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

        <div className="col-md-4">
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
        <div className="col-md-3">
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Total Quantity: <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books Remaining: <b>{remaning}</b>
            </p>
          </div>
        </div>
        <div className="col-md-3 d-flex flex-column gap-3 p-5">
          <button
            className="btn btn-success btn-lg"
            onClick={() => increaseCopies()}
            disabled={isIncreasing}
          >
            {isIncreasing ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Increasing...
              </>
            ) : (
              "Increase Quantity"
            )}
          </button>
          <button
            className="btn btn-warning btn-lg text-white"
            onClick={() => decreaseCopies()}
            disabled={isDecreasing}
          >
            {isDecreasing ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Decreasing...
              </>
            ) : (
              "Decrease Quantity"
            )}
          </button>
          <button
            className="btn btn-danger btn-lg"
            onClick={() => deleteBook(book.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
