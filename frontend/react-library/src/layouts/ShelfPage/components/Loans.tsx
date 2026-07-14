import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/context/AuthContext";
import type { ShelfLoan } from "../../../models/ShrelfLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { LoansModal } from "./LoansModal";

export const Loans = ({ mobile }: { mobile: boolean }) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const [operation, setOperation] = useState("");

  const [shelfLoans, setShelfLoans] = useState<ShelfLoan[]>([]);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/books/secure/loans`;
        const requestOption = {
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
          },
        };
        const shelfLoansResponse = await fetch(url, requestOption);
        if (!shelfLoansResponse.ok)
          throw new Error("error in get user current loans");
        const shelfLoansResponseJson = await shelfLoansResponse.json();
        setShelfLoans(shelfLoansResponseJson);
      }
      setIsLoading(false);
    };

    fetchUserCurrentLoans().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [auth.session, checkout]);

  console.log(shelfLoans.length);

  if (isLoading) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url = `https://localhost:8081/books/secure/return/book?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${auth.session?.access_token}`,
      },
    };
    const returnBookResponse = await fetch(url, requestOption);
    if (!returnBookResponse.ok) throw new Error("error in return the book");
    setCheckout(!checkout);
    setSuccess(true);
    setOperation("return");
    setTimeout(() => setSuccess(false), 3000);
  }

  async function renewLoan(bookId: number) {
    const url = `https://localhost:8081/books/secure/renew/loan?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${auth.session?.access_token}`,
      },
    };
    const renewLoanResponse = await fetch(url, requestOption);
    if (!renewLoanResponse.ok)
      throw new Error("error in renew loan for this book");
    setCheckout(!checkout);
    setSuccess(true);
    setOperation("renew");
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div>
      {success && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          {operation === "return"
            ? "✅ Book returned successfully!"
            : "✅ Renew loan successfully!"}
        </div>
      )}
      <div
        className={mobile ? "d-block d-lg-none mt-2" : "d-none d-lg-block mt-2"}
      >
        {shelfLoans.length > 0 ? (
          <>
            <h4>Current Loans: </h4>
            {shelfLoans.map((loan) => (
              <div key={loan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-6 col-md-4 container">
                    {loan.book.img ? (
                      <img
                        src={loan.book.img}
                        alt="book"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src="/images/download (1).jfif"
                        alt="book"
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className="card col-6 col-md-8 container d-flex">
                    <div className="card-body mt-1">
                      <h4>Loan Option: </h4>
                      {loan.daysLeft > 0 ? (
                        <p className="text-secendory">
                          Due in {loan.daysLeft} days
                        </p>
                      ) : loan.daysLeft === 0 ? (
                        <p className="text-success">Due Today</p>
                      ) : (
                        <p className="text-danger">
                          Past due by {loan.daysLeft} days
                        </p>
                      )}
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#modal${loan.book.id}`}
                        >
                          Manage Loan
                        </button>
                        <Link
                          to="../search"
                          className="list-group-item list-group-item-action"
                        >
                          Search more books
                        </Link>
                      </div>
                    </div>
                    <p className="mt-2 mb-1">
                      Help other find their adventure by reviewing your loan
                    </p>
                    <Link
                      to={`/checkout/${loan.book.id}`}
                      className="btn btn-primary mb-1"
                    >
                      Leave a review
                    </Link>
                  </div>
                </div>
                <hr />
                <LoansModal
                  shelfLoan={loan}
                  mobile={mobile}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link to="../search" className="btn btn-primary btn-lg">
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
