import type { ReviewModel } from "../../models/ReviewModel";
import { StarsReview } from "../Utils/StarsReview";

export const Review = ({ review }: { review: ReviewModel }) => {
  const date = new Date(review.date);
  const month = date.toLocaleTimeString("ir", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  console.log(date.toLocaleString);

  const dateRender = month + ", " + day + ", " + year;

  console.log(review);
  return (
    <div className="col-md-8">
      <h5>{review.user_email}</h5>
      <div className="row">
        <div className="col">{dateRender}</div>
        <div className="col">
          <StarsReview rating={review.rating} size={15}></StarsReview>
        </div>
      </div>
      <div className="mt-2">
        <p>{review.review_description}</p>
      </div>
    </div>
  );
};
