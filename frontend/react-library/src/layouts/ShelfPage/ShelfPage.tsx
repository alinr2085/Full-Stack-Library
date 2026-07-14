import { useState } from "react";
import { History } from "./components/History";
import { Loans } from "./components/Loans";

export const ShelfPage = () => {
  const [historyClicked, setHistoryClicked] = useState(false);

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="tablist">
            <button
              onClick={() => setHistoryClicked(false)}
              className="nav-link active"
              id="nav-loans"
              data-bs-toggle="tab"
              data-bs-target="#loans-content"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
            >
              Your Loans
            </button>

            <button
              onClick={() => setHistoryClicked(true)}
              className="nav-link"
              id="nav-history"
              data-bs-toggle="tab"
              data-bs-target="#history-content"
              type="button"
              role="tab"
              aria-controls="history"
              aria-selected="false"
            >
              Your History
            </button>
          </div>
        </nav>

        <div className="tab-content" id="content">
          <div
            className="tab-pane fade show active"
            id="loans-content"
            role="tabpanel"
            aria-labelledby="nav-loans"
          >
            <Loans mobile={false} />
          </div>
          <div
            className="tab-pane fade"
            id="history-content"
            role="tabpanel"
            aria-labelledby="nav-history"
          >
            {historyClicked ? <History /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
