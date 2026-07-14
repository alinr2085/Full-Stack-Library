import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/context/AuthContext";
import type { MessageModel } from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Messages = () => {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [messsages, setMessages] = useState<MessageModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (auth.session) {
        const url = `https://localhost:8081/api/messages/search/findByUserEmail?userEmail=${auth.session.user.email}&page=${currentPage}&size=5`;
        const messagesResponse = await fetch(url);
        if (!messagesResponse.ok) throw new Error("error in get user messages");
        const messageReponseJson = await messagesResponse.json();
        const responseData = messageReponseJson._embedded.messages;
        setMessages(responseData);
        setTotalPages(messageReponseJson.page.totalPages);
      }
      setIsLoading(false);
    };

    fetchUserMessages().catch((err) => {
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
      {messsages.length > 0 ? (
        <>
          <br />
          <h4>Current Q/A: </h4>
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
                  {message.adminEmail && message.response ? (
                    <>
                      <h5>Response:</h5>
                      <h6>{message.adminEmail} (admin) : </h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p className="text-warning">
                      Pending response from administration, Please be patient...
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <br />
          <h4>All question you submit will be shown here</h4>
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
