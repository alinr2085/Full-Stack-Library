import { useContext, useState } from "react";
import { supabase } from "../../../api/supabaseClient";
import { AuthContext } from "../../../Auth/context/AuthContext";
import { AddBookRequestModel } from "../../../models/AddBookRequestModel";
export const AddBook = () => {
  const auth = useContext(AuthContext);
  const [title, setTtile] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState("Category");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [warningSend, setWarningSend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSend, setSuccessSend] = useState(false);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  }

  async function uploadImageAndGetUrl(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("books-image")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(`Error in book image upload`);
    }

    const { data } = supabase.storage
      .from("books-image")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function submitNewBook() {
    if (
      auth.session &&
      title !== "" &&
      author !== "" &&
      description !== "" &&
      category !== "Category" &&
      copies >= 0
    ) {
      setIsSubmitting(true);
      try {
        let imageUrl = "";
        if (imgFile) {
          imageUrl = await uploadImageAndGetUrl(imgFile);
        }
        const addNewBookRequest = new AddBookRequestModel(
          title,
          author,
          description,
          copies,
          category,
          imageUrl,
        );
        const url = `https://localhost:8081/admin/secure/new/book`;

        const requestOption = {
          method: "POST",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addNewBookRequest),
        };

        const addNewBook = await fetch(url, requestOption);
        if (!addNewBook.ok) throw new Error("Error in add new book");

        setTtile("");
        setAuthor("");
        setDescription("");
        setCopies(0);
        setImgFile(null);
        setImgPreview(null);
        setCategory("Category");
        setWarningSend(false);
        setSuccessSend(true);
        setTimeout(() => setSuccessSend(false), 3000);
      } catch (err) {
        console.error(err);
        setWarningSend(true);
        setTimeout(() => setWarningSend(false), 3000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSuccessSend(false);
      setWarningSend(true);
      setTimeout(() => setWarningSend(false), 3000);
    }
  }

  return (
    <div className="container mt-3">
      {successSend && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ✅ Book added successfuly!
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
      <div className="card">
        <div className="card-header">Add a new book</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                value={title}
                required
                onChange={(e) => setTtile(e.target.value)}
              ></input>
            </div>
            <div className="col-md-3">
              <label className="form-label">Author</label>
              <input
                className="form-control"
                type="text"
                id="author"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </div>
            <div className="col-md-3">
              <label className="form-label">Copies</label>
              <input
                className="form-control"
                type="number"
                id="copies"
                value={copies}
                required
                onChange={(e) => setCopies(Number(e.target.value))}
              ></input>
            </div>
            <div className="dropdown col-md-3">
              <label className="form-label">Category</label>
              <button
                className="form-control btn btn-secondary dropdown-toggle"
                id="category"
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                {category}
              </button>
              {open && (
                <ul
                  className="dropdown-menu bg-secondary d-block w-100"
                  aria-labelledby="category"
                >
                  <li
                    onClick={() => {
                      setCategory("Backend");
                      setOpen(false);
                    }}
                  >
                    <a className="dropdown-item bg-secondary" href="#">
                      Backend
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setCategory("Frontend");
                      setOpen(false);
                    }}
                  >
                    <a className="dropdown-item bg-secondary" href="#">
                      Frontend
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setCategory("Data");
                      setOpen(false);
                    }}
                  >
                    <a className="dropdown-item bg-secondary" href="#">
                      Data
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setCategory("DevOps");
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
            <div className="col-md-12 mt-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="col-md-12 mt-3">
              <label className="form-label">Image</label>
              <br />
              <input type="file" onChange={(e) => handleImageSelect(e)} />
              {imgPreview && (
                <div className="mt-2">
                  <img
                    src={imgPreview}
                    alt="preview"
                    style={{ maxHeight: 150 }}
                  />
                </div>
              )}
            </div>
            <div>
              <button
                className="btn btn-primary mt-4"
                type="button"
                onClick={submitNewBook}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Adding...
                  </>
                ) : (
                  "Add Book"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
