import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import type { BookModel } from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Book } from "./Book";

export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "https://localhost:8081/api/books";
      const usedUrl: string = `${baseUrl}?page=0&size=6`;
      const response = await fetch(usedUrl);

      if (!response.ok) {
        throw new Error("error in data loading");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      const carouselBooks: BookModel[] = [];
      for (const key in responseData) {
        carouselBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBooks(carouselBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div className="container" style={{ height: 400 }}>
      <div className="carousel-title">
        <h2 className="text-center mt-5 mb-3">Find your favorite book</h2>
      </div>
      <div
        id="booksCarouselDesktop"
        className="carousel slide carousel-dark mt-3 d-none d-md-block desktop"
        data-bs-ride="carousel"
        data-bs-pause="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row-car row d-flex justify-content-center align-items-center g-1">
              <Book book={books[0]} key={books[0].id} />
              <Book book={books[3]} key={books[3].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row-car row d-flex justify-content-center align-items-center g-3">
              <Book book={books[1]} key={books[1].id} />
              <Book book={books[4]} key={books[4].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row-car row d-flex justify-content-center align-items-center g-5">
              <Book book={books[2]} key={books[2].id} />
              <Book book={books[5]} key={books[5].id} />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#booksCarouselDesktop"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#booksCarouselDesktop"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div
        id="booksCarouselMobile"
        className="carousel slide carousel-dark mt-3 d-block d-md-none mobile"
        data-bs-ride="carousel"
        data-bs-pause="false"
      >
        {/* Mobile */}
        <div className="carousel-inner d-block d-md-none">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[0]} key={books[0].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[1]} key={books[1].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[2]} key={books[2].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[3]} key={books[3].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[4]} key={books[4].id} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book book={books[5]} key={books[5].id} />
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#booksCarouselMobile"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#booksCarouselMobile"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="carousel-title d-flex justify-content-center">
        <Link className="btn btn-outline-dark" to="/search">
          View more
        </Link>
      </div>
    </div>
  );
};
