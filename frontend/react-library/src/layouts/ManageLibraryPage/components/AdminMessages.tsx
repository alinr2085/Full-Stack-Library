import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/context/AuthContext";
import { AdminResponseModel } from "../../../models/AdminResponseModel";
import type { MessageModel } from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const AdminMessages = () => {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  const [messsages, setMessages] = useState<MessageModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [warningSend, setWarningSend] = useState(false);
  const [successSend, setSuccessSend] = useState(false);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchOpenMessages = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/api/messages/search/findByClosed?isClosed=false&page=${currentPage}&size=5`;
        const messagesResponse = await fetch(url);
        if (!messagesResponse.ok) throw new Error("error in get open messages");
        const messageReponseJson = await messagesResponse.json();
        const responseData = messageReponseJson._embedded.messages;
        setMessages(responseData);
        setTotalPages(messageReponseJson.page.totalPages);
      }
      setIsLoading(false);
    };

    fetchOpenMessages().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [auth, currentPage, btnSubmit]);

  if (isLoading) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function submitResponse(messageId: number, response: string) {
    if (auth.session?.user.email) {
      if (!response.trim()) {
        setSuccessSend(false);
        setWarningSend(true);
        setTimeout(() => setWarningSend(false), 3000);
        return;
      }
      const adminResponse = new AdminResponseModel(
        messageId,
        auth.session.user.email,
        response,
      );
      const url = `https://localhost:8081/messages/secure/admin/message/response`;
      const requestOption = {
        method: "PUT",
        headers: {
          authorization: `Bearer ${auth.session?.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminResponse),
      };

      const addNewMessage = await fetch(url, requestOption);
      if (!addNewMessage.ok) throw new Error("Error in submit reponse");
      setResponses((prev) => ({ ...prev, [messageId]: "" }));
      setBtnSubmit(!btnSubmit);
      setWarningSend(false);
      setSuccessSend(true);
      setTimeout(() => setSuccessSend(false), 3000);
    }
  }

  return (
    <div>
      {successSend && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ✅ Response sent successfully!
        </div>
      )}
      {warningSend && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-warning"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ⚠️ Please fill in all fields!
        </div>
      )}
      {messsages.length > 0 ? (
        <>
          <br />
          <h4>Pending Q/A: </h4>
          {messsages.map((message) => (
            <div key={message.id}>
              <div className="card shadow mt-3 p-3 bg-body rounded">
                <h5>
                  Case {message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <label className="fw-bold form-label">Response:</label>
                  <textarea
                    className="form-control"
                    id={`response${message.id}`}
                    placeholder="You can write your answer for this question"
                    rows={3}
                    value={responses[message.id] || ""}
                    onChange={(e) =>
                      setResponses((prev) => ({
                        ...prev,
                        [message.id]: e.target.value,
                      }))
                    }
                  ></textarea>
                  <button
                    onClick={() =>
                      submitResponse(message.id, responses[message.id] || "")
                    }
                    type="button"
                    className="btn btn-primary btn-sm mt-3"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <br />
          <h4>No pending Q/A</h4>
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
