import { Link } from "react-router-dom";
import type { BookModel } from "../../models/BookModel";
import { LeaveReview } from "../Utils/LeaveReview";

export const CheckoutReviewBox = ({
  book,
  checkoutCount,
  isAuthenticated,
  isCheckedout,
  checkout,
  isReviewLeft,
  submitReview,
}: {
  book: BookModel | undefined;
  checkoutCount: number;
  isAuthenticated: unknown;
  isCheckedout: boolean;
  checkout: () => Promise<void>;
  isReviewLeft: boolean;
  submitReview: (
    reviewStar: number,
    reviewDescription: string,
  ) => Promise<void>;
}) => {
  const reviewRender = () => {
    if (isAuthenticated) {
      if (isReviewLeft) return <p>Thank you for your review!</p>;
      else return <LeaveReview submitReview={submitReview} />;
    }
    return <div>sign in to be able to leave a review</div>;
  };

  const buttonRender = () => {
    if (isAuthenticated) {
      if (!isCheckedout && checkoutCount < 5)
        return (
          <button onClick={() => checkout()} className="btn btn-success">
            Checkout
          </button>
        );
      else if (isCheckedout)
        return (
          <p className="fw-bold text-success">
            This book is checked out. Enjoy!!
          </p>
        );
      else if (checkoutCount >= 5)
        return (
          <p className="fw-bold text-danger">Too many books checked out.</p>
        );
    }
    return (
      <Link to="/login" className="btn btn-success">
        Sign in
      </Link>
    );
  };

  return (
    <div className="card col-lg-3 d-flex container p-2 d-md-block mb-2">
      <div className="card-header">{checkoutCount}/5 Books checked out</div>
      <div className="card-body container">
        {book && book?.copiesAvailable ? (
          <h4 className="text-success">Available</h4>
        ) : (
          <h4 className="text-danger">Wait list</h4>
        )}
        <div className="block">
          <p className="lead">
            <b>
              {book?.copies} copies and {book?.copiesAvailable} available
            </b>
          </p>
        </div>
        <p className="mt-4">this numbers can be changed</p>
        {buttonRender()}
        {reviewRender()}
      </div>
    </div>
  );
};
