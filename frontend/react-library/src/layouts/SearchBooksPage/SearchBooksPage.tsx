import { useEffect, useState } from "react";

import type { BookModel } from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBooks } from "./components/SearchBooks";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [titleSearched, setTitleSerached] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "https://localhost:8081/api/books";
      const usedUrl: string = `${baseUrl}${searchUrl}${searchUrl === "" ? "?" : "&"}page=${currentPage}&size=5`;
      const response = await fetch(usedUrl);
      console.log(usedUrl);

      if (!response.ok) {
        throw new Error("error in data loading");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      setTotalPages(responseJson.page.totalPages);
      setTotalBooks(responseJson.page.totalElements);

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

    window.scrollTo(0, 0);
  }, [currentPage, searchUrl, category]);

  if (isLoading) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchChange = () => {
    setCurrentPage(0);
    let newUrl = "";
    if (titleSearched !== "") {
      newUrl = `/search/title?title=${titleSearched}`;
      setCurrentPage(0);
    }
    setSearchUrl(newUrl);
    setCategory("All");
  };

  const categoryChange = (selectedCategory: string) => {
    setCurrentPage(0);
    let newUrl = "";
    if (selectedCategory !== "All") {
      newUrl = `/search/category?category=${selectedCategory}`;
    }
    setCategory(selectedCategory);
    setSearchUrl(newUrl);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <div className="d-flex gap-1">
            <input
              className="form-control"
              type="search"
              placeholder="search any books..."
              aria-labelledby="search-title"
              onChange={(e) => setTitleSerached(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => searchChange()}
            >
              Search
            </button>
          </div>
        </div>

        <div className="col-4">
          <div className="dropdown">
            <button
              className="btn btn-secondary btn btn-secondary dropdown-toggle"
              id="categoryMenu"
              type="button"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {category}
            </button>

            {open && (
              <ul
                className="dropdown-menu bg-secondary d-block"
                aria-labelledby="categoryMenu"
              >
                <li
                  onClick={() => {
                    categoryChange("All");
                    setOpen(false);
                  }}
                >
                  <a className="dropdown-item bg-secondary" href="#">
                    All
                  </a>
                </li>
                <li
                  onClick={() => {
                    categoryChange("Backend");
                    setOpen(false);
                  }}
                >
                  <a className="dropdown-item bg-secondary" href="#">
                    Backend
                  </a>
                </li>
                <li
                  onClick={() => {
                    categoryChange("Frontend");
                    setOpen(false);
                  }}
                >
                  <a className="dropdown-item bg-secondary" href="#">
                    Frontend
                  </a>
                </li>
                <li
                  onClick={() => {
                    categoryChange("Data");
                    setOpen(false);
                  }}
                >
                  <a className="dropdown-item bg-secondary" href="#">
                    Data
                  </a>
                </li>
                <li
                  onClick={() => {
                    categoryChange("DevOps");
                    setOpen(false);
                  }}
                >
                  <a className="dropdown-item bg-secondary" href="#">
                    DevOps
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {totalBooks > 0 ? (
        <>
          <div className="mt-4">
            <h4>Number of results: {totalBooks}</h4>
            <p>
              {currentPage * 5 + 1} to{" "}
              {Math.min((currentPage + 1) * 5, totalBooks)} of {totalBooks}{" "}
              items:
            </p>
            {books.map((book) => (
              <SearchBooks book={book} key={book.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="m-5">
          <h4>Can't find what you are looking for?</h4>
          <a className="btn btn-primary fw-bold btn-md" type="button" href="#">
            Library Services
          </a>
        </div>
      )}

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
  );
};
