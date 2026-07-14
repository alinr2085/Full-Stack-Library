import { useState } from "react";
import { Messages } from "./components/Messages";
import { NewMessage } from "./components/NewMessage";

export const MessagePage = () => {
  const [messageClicked, setMessageClicked] = useState(false);

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="tablist">
            <button
              onClick={() => setMessageClicked(false)}
              className="nav-link active"
              id="nav-send-message"
              data-bs-toggle="tab"
              data-bs-target="#send-message-content"
              type="button"
              role="tab"
              aria-controls="send-message-content"
              aria-selected="true"
            >
              Submit Question
            </button>

            <button
              onClick={() => setMessageClicked(true)}
              className="nav-link"
              id="nav-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#message-tab-content"
              type="button"
              role="tab"
              aria-controls="message-tab-content"
              aria-selected="false"
            >
              Q/A Response/Pending
            </button>
          </div>
        </nav>

        <div className="tab-content" id="content">
          <div
            className="tab-pane fade show active"
            id="send-message-content"
            role="tabpanel"
            aria-labelledby="nav-send-message-tab"
          >
            <NewMessage />
          </div>
          <div
            className="tab-pane fade"
            id="message-tab-content"
            role="tabpanel"
            aria-labelledby="nav-message-tab"
          >
            {messageClicked ? <Messages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
