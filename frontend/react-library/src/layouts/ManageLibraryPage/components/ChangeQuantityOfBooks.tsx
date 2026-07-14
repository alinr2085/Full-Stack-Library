import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/context/AuthContext";
import type { BookModel } from "../../../models/BookModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ChangeQuantityOfBookItem } from "./ChangeQuantityOfBBookItem";

export const ChangeQuantityOfBooks = () => {
  const auth = useContext(AuthContext);

  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [bookDeleted, setBookDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const url: string = `https://localhost:8081/api/books?page=${currentPage}&size=5`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("error in data loading");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      setTotalPages(responseJson.page.totalPages);
      setTotalBooks(responseJson.page.totalElements);

      const allBooks: BookModel[] = [];
      for (const key in responseData) {
        allBooks.push({
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
      setBooks(allBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, bookDeleted]);

  async function deleteBook(bookId: number) {
    setIsDeleting(true);
    try {
      const url: string = `https://localhost:8081/admin/secure/delete/book?bookId=${bookId}`;
      const requestOption = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${auth.session?.access_token}`,
          "Content-Type": "application/json",
        },
      };

      const deleteBookResponse = await fetch(url, requestOption);
      if (!deleteBookResponse.ok) throw new Error("Error in delete book");
      setBookDeleted(!bookDeleted);
    } finally {
      setIsDeleting(false);
    }
  }

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
    <div>
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
              <ChangeQuantityOfBookItem
                book={book}
                key={book.id}
                deleteBook={deleteBook}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        </>
      ) : (
        <h4>Add a book before changing quantity</h4>
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
