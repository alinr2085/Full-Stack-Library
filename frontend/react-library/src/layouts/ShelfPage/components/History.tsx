import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/context/AuthContext";
import type { HistoryModel } from "../../../models/HistoryModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const History = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [histories, setHistories] = useState<HistoryModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/api/histories/search/findByUserEmail?userEmail=${auth.session.user.email}&page=${currentPage}&size=5`;
        const historyReponse = await fetch(url);
        if (!historyReponse.ok)
          throw new Error("error in get user checkout history");
        const historyReponseJson = await historyReponse.json();
        const responseData = historyReponseJson._embedded.histories;
        setHistories(responseData);
        setTotalPages(historyReponseJson.page.totalPages);
      }
      setIsLoading(false);
    };

    fetchUserHistory().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [auth, currentPage]);

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
      {histories.length > 0 ? (
        <>
          <br />
          <h4>Recent History:</h4>
          {histories.map((history) => (
            <div key={history.id}>
              <div className="card shadow mt-3 p-1 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    {history.img ? (
                      <img src={history.img} alt="book" className="img-fluid" />
                    ) : (
                      <img
                        src="/images/download (1).jfif"
                        alt="book"
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">{history.author}</h5>
                      <h4>{history.title}</h4>
                      <p className="card-text">{history.description}</p>
                      <p className="card-text">
                        Checked out on: {history.checkoutDate}
                      </p>
                      <p className="card-text">
                        Returned on: {history.returnDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <LoansModal
                shelfLoan={loan}
                mobile={mobile}
                returnBook={returnBook}
                renewLoan={renewLoan}
              /> */}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <br />
          <h3>Currently no history.</h3>
          <br />
          <Link className="btn btn-primary btn-lg" to="../search">
            Search for new book
          </Link>
        </>
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
