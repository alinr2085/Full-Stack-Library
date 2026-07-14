import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/AuthContext";
import { AddBook } from "./components/AddBook";
import { AdminMessages } from "./components/AdminMessages";
import { ChangeQuantityOfBooks } from "./components/ChangeQuantityOfBooks";

export const ManageLibraryPage = () => {
  const auth = useContext(AuthContext);
  const [changeQuantityClicked, setChangeQuantityClicked] = useState(false);
  const [messageClicked, setMessageClicked] = useState(false);

  if (auth.session?.user.user_metadata.userType !== "admin") {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="tablist">
            <button
              onClick={() => {
                setMessageClicked(false);
                setChangeQuantityClicked(false);
              }}
              className="nav-link active"
              id="nav-new-book"
              data-bs-toggle="tab"
              data-bs-target="#new-book-content"
              type="button"
              role="tab"
              aria-controls="new-book-content"
              aria-selected="true"
            >
              Add new book
            </button>
            <button
              onClick={() => {
                setChangeQuantityClicked(true);
                setMessageClicked(false);
              }}
              className="nav-link"
              id="nav-change-quantity"
              data-bs-toggle="tab"
              data-bs-target="#change-quantity-content"
              type="button"
              role="tab"
              aria-controls="change-quantity-content"
              aria-selected="false"
            >
              Change quantity
            </button>

            <button
              onClick={() => {
                setMessageClicked(true);
                setChangeQuantityClicked(false);
              }}
              className="nav-link"
              id="nav-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#message-tab-content"
              type="button"
              role="tab"
              aria-controls="message-tab-content"
              aria-selected="false"
            >
              Messages
            </button>
          </div>
        </nav>

        <div className="tab-content" id="content">
          <div
            className="tab-pane fade show active"
            id="new-book-content"
            role="tabpanel"
            aria-labelledby="nav-new-book"
          >
            <AddBook />
          </div>
          <div
            className="tab-pane fade"
            id="change-quantity-content"
            role="tabpanel"
            aria-labelledby="nav-change-quality"
          >
            {changeQuantityClicked ? <ChangeQuantityOfBooks /> : <></>}
          </div>
          <div
            className="tab-pane fade"
            id="message-tab-content"
            role="tabpanel"
            aria-labelledby="nav-message-tab"
          >
            {messageClicked ? <AdminMessages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
