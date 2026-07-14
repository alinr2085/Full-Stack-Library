import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ReviewModel } from "../../../models/ReviewModel";
import { Pagination } from "../../Utils/Pagination";
import { Review } from "../../Utils/Review";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookReview = async () => {
      const reviewUrl: string = `https://localhost:8081/api/reviews/search/bookId?bookId=${bookId}&page=${currentPage}&size=5`;
      const responseReviews = await fetch(reviewUrl);
      if (!responseReviews.ok) {
        throw new Error("error in data loading");
      }
      const reponseJsonReviews = await responseReviews.json();
      const responseData = reponseJsonReviews._embedded.reviews;
      setTotalPages(reponseJsonReviews.page.totalPages);

      const loadedReviews: ReviewModel[] = [];
      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          user_email: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          review_description: responseData[key]?.reviewDescription,
        });
      }

      setReviews(loadedReviews);
      setIsLoading(false);
    };

    fetchBookReview().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [currentPage]);

  if (isLoading) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="mt-4">
        <h4>Number of comments: {reviews.length}</h4>
        <p>
          {currentPage * 5 + 1} to{" "}
          {Math.min((currentPage + 1) * 5, reviews.length)} of {reviews.length}{" "}
          comments:
        </p>
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
      <div>
        <br />
        {totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            paginate={paginate}
          />
        ) : (
          <br />
        )}
      </div>
    </div>
  );
};
