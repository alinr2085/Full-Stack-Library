import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/context/AuthContext";
import { MessageRequestModel } from "../../../models/MessageRequestModel";

export const NewMessage = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [successSend, setSuccessSend] = useState(false);
  const [warningSend, setWarningSend] = useState(false);

  async function submitQuesiton(title: string, question: string) {
    if (auth.session?.user.email) {
      if (!title.trim() || !question.trim()) {
        setSuccessSend(false);
        setWarningSend(true);
        setTimeout(() => setWarningSend(false), 3000);
        return;
      }
      const reviewRequest = new MessageRequestModel(
        auth.session.user.email,
        title,
        question,
      );
      const url = `https://localhost:8081/messages/secure/new/message`;

      const requestOption = {
        method: "POST",
        headers: {
          authorization: `Bearer ${auth.session?.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewRequest),
      };

      const addNewMessage = await fetch(url, requestOption);
      if (!addNewMessage.ok) throw new Error("Error in submit message");
      setTitle("");
      setQuestion("");
      setWarningSend(false);
      setSuccessSend(true);
      setTimeout(() => setSuccessSend(false), 3000);
    }
  }

  return (
    <div className="card mt-5">
      {successSend && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ✅ Message sent successfully!
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
      <div className="card-header">Ask question to my supporters</div>
      <div className="card-body">
        <div className="mb-3">
          <label className="fw-bold form-label">Title:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            placeholder="You can write your question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label className="fw-bold form-label">Question:</label>
          <textarea
            className="form-control"
            id="reviewDescription"
            placeholder="You can write your question text"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={() => submitQuesiton(title, question)}
          type="button"
          className="btn btn-primary btn-sm mt-3"
        >
          Submit Question
        </button>
      </div>
    </div>
  );
};
