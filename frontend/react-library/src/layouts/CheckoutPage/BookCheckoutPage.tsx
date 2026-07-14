import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../Auth/context/AuthContext";
import type { BookModel } from "../../models/BookModel";
import type { ReviewModel } from "../../models/ReviewModel";
import { ReviewRequestModel } from "../../models/ReviewRequestModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutReviewBox } from "./CheckoutReviewBox";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
  const auth = useContext(AuthContext);

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(false);
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [isLoadingCheckoutCount, setIsLoadingCheckoutCount] = useState(true);
  const [isCheckedout, setIsCheckedout] = useState(false);
  const [isLoadingBookCheckedout, setIsLoadingBookCheckedout] = useState(true);
  const [displayError, setDisplayError] = useState(false);

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `https://localhost:8081/api/books/${bookId}`;
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("error in data loading");
      }

      const responseJson = await response.json();
      const selectedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(selectedBook);
      setIsLoading(false);
    };

    fetchBook().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [isCheckedout]);

  useEffect(() => {
    const fetchBookReview = async () => {
      const reviewUrl: string = `https://localhost:8081/api/reviews/search/bookId?bookId=${bookId}`;
      const responseReviews = await fetch(reviewUrl);
      if (!responseReviews.ok) {
        throw new Error("error in data loading");
      }
      const reponseJsonReviews = await responseReviews.json();
      const responseData = reponseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];
      let starCounter = 0;
      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          user_email: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          review_description: responseData[key]?.reviewDescription,
        });
        starCounter += responseData[key].rating;
      }
      if (loadedReviews) {
        const score = (starCounter / loadedReviews.length).toFixed(1);
        setTotalStars(Number(score));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReview().catch((err) => {
      setIsLoadingReview(false);
      setHttpError(err.message);
    });
  }, [isReviewLeft]);

  useEffect(() => {
    const fetchUserReview = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/reviews/secure/user/review?bookId=${bookId}`;
        const requestOption = {
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
          },
        };
        const userReview = await fetch(url, requestOption);
        if (!userReview.ok)
          throw new Error("error in check user review for this book");
        const userReviewJson = await userReview.json();
        setIsReviewLeft(userReviewJson);
      }
    };
    fetchUserReview().catch((err) => {
      setIsLoadingUserReview(false);
      setHttpError(err.message);
    });
  }, [auth.session]);

  useEffect(() => {
    const fetchUserCheckoutCount = async () => {
      if (auth.session) {
        const url = "https://localhost:8081/books/secure/checkout/count";
        const requestOption = {
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
          },
        };
        const checkoutCountResponse = await fetch(url, requestOption);
        if (!checkoutCountResponse.ok) {
          throw new Error("error in get checkouted books by user");
        }
        const checkoutCountResponseJson = await checkoutCountResponse.json();
        setCheckoutCount(checkoutCountResponseJson);
      }
      setIsLoadingCheckoutCount(false);
    };

    fetchUserCheckoutCount().catch((err) => {
      setIsLoadingCheckoutCount(false);
      setHttpError(err.message);
    });
  }, [auth.session, isCheckedout]);

  useEffect(() => {
    const fetchBookCheckedOut = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/books/secure/ischeckedout?bookId=${bookId}`;
        const requestOption = {
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
          },
        };
        const isCheckedoutResponse = await fetch(url, requestOption);
        if (!isCheckedoutResponse.ok) {
          throw new Error("error in checking ckeckedout book by user");
        }
        const isCheckedoutResponseJson = await isCheckedoutResponse.json();
        setIsCheckedout(isCheckedoutResponseJson);
      }
      setIsLoadingBookCheckedout(false);
    };

    fetchBookCheckedOut().catch((err) => {
      setIsLoadingBookCheckedout(false);
      setHttpError(err.message);
    });
  }, [auth.session]);

  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCheckoutCount ||
    isLoadingBookCheckedout ||
    isLoadingUserReview
  )
    return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkout() {
    const url = `https://localhost:8081/books/secure/checkout?bookId=${bookId}`;
    const requestOption = {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.session?.access_token}`,
      },
    };
    const checkoutBook = await fetch(url, requestOption);
    if (!checkoutBook.ok) {
      setDisplayError(true);
      setTimeout(() => setDisplayError(false), 3000);
      throw new Error("Error in submit review");
    }
    setDisplayError(false);
    setIsCheckedout(true);
  }

  async function submitReview(reviewStar: number, reviewDescription: string) {
    const reviewRequest = new ReviewRequestModel(
      reviewStar,
      bookId ? Number(bookId) : 0,
      reviewDescription,
    );
    const url = `https://localhost:8081/reviews/secure/newReview`;

    const requestOption = {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.session?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequest),
    };

    const addReviewReponse = await fetch(url, requestOption);
    if (!addReviewReponse.ok) throw new Error("Error in submit review");
    setIsReviewLeft(true);
  }

  return (
    <div>
      {displayError && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-danger"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ❌ Please pay outstanding fees or return late books
        </div>
      )}
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            {book?.img ? (
              <img src={book?.img} alt="book" className="img-fluid" />
            ) : (
              <img
                src="/images/download (1).jfif"
                alt="book"
                className="img-fluid"
              />
            )}
          </div>

          <div className="col-6 col-md-6 mb-1">
            <div className="ml-2">
              <h3>{book?.title}</h3>
              <h5>{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={25} />
            </div>
          </div>
          <CheckoutReviewBox
            book={book}
            checkoutCount={checkoutCount}
            isAuthenticated={auth.session}
            isCheckedout={isCheckedout}
            checkout={checkout}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          ></CheckoutReviewBox>
          <hr />
          <LatestReviews reviews={reviews} bookId={book?.id}></LatestReviews>
        </div>
      </div>
    </div>
  );
};
