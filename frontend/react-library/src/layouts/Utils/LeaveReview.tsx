import { useState } from "react";
import { StarsReview } from "./StarsReview";

export const LeaveReview = ({
  submitReview,
}: {
  submitReview: (
    reviewStar: number,
    reviewDescription: string,
  ) => Promise<void>;
}) => {
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");

  return (
    <div className="container">
      <h6 className="fw-bold mb-0">Score: </h6>
      <div className="d-flex justify-content-center align-items-center p-0">
        <button
          onClick={() => setReviewStar(reviewStar > 0 ? reviewStar - 0.5 : 0)}
          className="btn ripple-btn"
        >
          Worse
        </button>
        <StarsReview rating={reviewStar} size={20} />
        <button
          className="btn ripple-btn"
          onClick={() => setReviewStar(reviewStar < 5 ? reviewStar + 0.5 : 5)}
        >
          Better
        </button>
      </div>
      <div className="mt-2">
        <label className="fw-bold form-label">Description:</label>
        <textarea
          className="form-control"
          id="reviewDescription"
          placeholder="You can write your opinion"
          rows={3}
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
        ></textarea>
        <button
          onClick={() => submitReview(reviewStar, reviewDescription)}
          type="button"
          className="btn btn-primary btn-sm mt-3"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};
