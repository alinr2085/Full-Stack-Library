import type { ShelfLoan } from "../../../models/ShrelfLoans";

export const LoansModal = ({
  shelfLoan,
  mobile,
  returnBook,
  renewLoan,
}: {
  shelfLoan: ShelfLoan;
  mobile: boolean;
  returnBook: (bookId: number) => Promise<void>;
  renewLoan: (bookId: number) => Promise<void>;
}) => {
  return (
    <div
      className="modal fade"
      id={`modal${shelfLoan.book.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby=""
      aria-hidden="true"
      key={shelfLoan.book.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="">
              Loan Option
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container mt-2">
              <div className="row">
                <div className="col-3">
                  {shelfLoan.book.img ? (
                    <img
                      src={shelfLoan.book.img}
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
                <div className="col-9">
                  <h6>{shelfLoan.book.author}</h6>
                  <h5>{shelfLoan.book.title}</h5>
                </div>
              </div>
              <div className="list-group mt-3">
                <button
                  onClick={() => returnBook(shelfLoan.book.id)}
                  data-bs-dismiss="modal"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                >
                  Return Book
                </button>
                <button
                  onClick={
                    shelfLoan.daysLeft > 0
                      ? () => renewLoan(shelfLoan.book.id)
                      : (event) => event.preventDefault()
                  }
                  data-bs-dismiss="modal"
                  className={
                    shelfLoan.daysLeft > 0
                      ? "list-group-item list-group-item-action"
                      : "list-group-item list-group-item-action inactiveLink"
                  }
                  aria-current="true"
                >
                  {shelfLoan.daysLeft < 0
                    ? "Late dues can not be renewed"
                    : "Renew loan for 14 days"}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-danger"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
