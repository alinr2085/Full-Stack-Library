import { Link } from "react-router-dom";
import type { ReviewModel } from "../../models/ReviewModel";
import { Review } from "../Utils/Review";

export const LatestReviews = ({
  reviews,
  bookId,
}: {
  reviews: ReviewModel[];
  bookId: number | undefined;
}) => {
  return (
    <div className="row mt-3">
      <div className="col-md-2">
        <h3>Latest Reviews: </h3>
      </div>
      <div className="col-md-10">
        {reviews?.length > 0 ? (
          <>
            {reviews?.slice(0, 3).map((review) => (
              <Review review={review} key={review.id}></Review>
            ))}
            <div className="m-2">
              <Link
                type="button"
                to={`/reviews/${bookId}`}
                className="btn btn-primary"
              >
                Load More
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
