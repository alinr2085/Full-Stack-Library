import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectRoute } from "./Auth/components/ProtectRoute";
import { LoginPage } from "./Auth/pages/LoginPage";
import { RegisterPage } from "./Auth/pages/RegisterPage";
import { BookCheckoutPage } from "./layouts/CheckoutPage/BookCheckoutPage";
import { ReviewListPage } from "./layouts/CheckoutPage/ReviewListPage/ReviewListPage";
import { HomePage } from "./layouts/HomePage/HomePage";
import { ManageLibraryPage } from "./layouts/ManageLibraryPage/ManageLibraryPage";
import { MessagePage } from "./layouts/MessagePage/MessagePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { PaymentPage } from "./layouts/PaymentPage/PaymentPage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { ShelfPage } from "./layouts/ShelfPage/ShelfPage";

export const App = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/shelf"
              element={
                <ProtectRoute>
                  <ShelfPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectRoute>
                  <MessagePage />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectRoute>
                  <ManageLibraryPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/fees"
              element={
                <ProtectRoute>
                  <PaymentPage />
                </ProtectRoute>
              }
            />
            {/* <Route
              path="/home"
              element={
                <ProtectRoute>
                  <HomePage />
                </ProtectRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectRoute>
                  <SearchBooksPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/checkout/:bookId"
              element={
                <ProtectRoute>
                  <BookCheckoutPage />
                </ProtectRoute>
              }
            /> */}
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/reviews/:bookId" element={<ReviewListPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};
