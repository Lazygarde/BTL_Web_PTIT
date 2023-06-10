import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Book.css";

export const Book = () => {
  const params = useParams();
  const id = params.id;
  const [isAdding, setIsAdding] = useState(id < 0 ? true : false);
  const [bookItem, setBookItem] = useState({});
  const [category, setCategory] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [editing, setEditing] = useState(id < 0 ? true : false);
  const [editingCover, setEditingCover] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBookItem(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:8080/category")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  }, []);
  const handleAdd = () => {
    // Tạo một đối tượng chứa dữ liệu mới
    const newData = {
      title: bookItem.title,
      author: bookItem.author,
      description: bookItem.description,
      releaseDate: bookItem.releaseDate,
      pageNumber: bookItem.pageNumber,
      idCategory: bookItem.idCategory,
      cover: bookItem.cover
    };

    // Gửi dữ liệu mới lên server
    fetch("http://localhost:8080/book", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu phản hồi từ server (nếu cần)
        console.log('Data added:', data);
        // Cập nhật trạng thái và chuyển hướng đến trang chi tiết sách
        setIsAdding(false);
        // Chuyển hướng đến trang chi tiết sách với ID mới
        window.location.href = `/library`;
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error('Error:', error);
      });
  };


  const handleUpload = () => {
    setBookItem({ ...bookItem, cover: uploadedImage });
    setShowUploadModal(false);
    setEditingCover(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    setEditing(false);
    setEditingCover(false); // Thêm dòng này để kết thúc việc chỉnh sửa cover

    // Tạo một đối tượng chứa dữ liệu cần cập nhật
    const updatedData = {
      title: bookItem.title,
      author: bookItem.author,
      description: bookItem.description,
      releaseDate: bookItem.releaseDate,
      pageNumber: bookItem.pageNumber,
      idCategory: bookItem.category,
      cover: bookItem.cover
    };

    // Gửi dữ liệu cập nhật lên server
    fetch(`http://localhost:8080/book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu phản hồi từ server (nếu cần)
        console.log('Data updated:', data);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error('Error:', error);
      });
  };



  return (
    <div className="Bookdetail">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="title-author d-flex">
              <div className="title">
                <label htmlFor="Text">Tiêu đề: </label> <br />
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={bookItem.title}
                  onChange={(e) =>
                    setBookItem({ ...bookItem, title: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
              <div className="author">
                <label htmlFor="Text">Tác giả: </label> <br />
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={bookItem.author}
                  onChange={(e) =>
                    setBookItem({ ...bookItem, author: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="description">
              <label htmlFor="Text">Mô tả về sách: </label> <br />
              <textarea
                name="description"
                id="description"
                value={bookItem.description}
                onChange={(e) =>
                  setBookItem({ ...bookItem, description: e.target.value })
                }
                disabled={!editing}
              ></textarea>
            </div>
            <div className="date-pageNumber d-flex">
              <div className="date">
                <label htmlFor="text">Ngày phát hành:</label> <br />
                <input
                  type="date"
                  name="releasedate"
                  id="releasedate"
                  value={bookItem.releaseDate}
                  onChange={(e) =>
                    setBookItem({ ...bookItem, releaseDate: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
              <div className="pagenumber">
                <label htmlFor="text">Số trang:</label> <br />
                <input
                  type="text"
                  name="pageNumber"
                  id="pageNumber"
                  value={bookItem.pageNumber} // Thay đổi tại đây
                  onChange={(e) =>
                    setBookItem({ ...bookItem, pageNumber: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="category">
              <label htmlFor="text">Thể Loại: </label> <br />
              {id < 0 ? (
                <select
                  value={bookItem.category}
                  onChange={(e) =>
                    setBookItem({ ...bookItem, category: e.target.value })
                  }>
                  <option value="">Thể loại</option>
                  {category.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div>
                  {editing ? (
                    <select
                      value={bookItem.category}
                      onChange={(e) =>
                        setBookItem({ ...bookItem, category: e.target.value })
                      }
                    >
                      <option value="" aria-required>Thể loại</option>
                      {category.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={bookItem.category}
                      onChange={(e) =>
                        setBookItem({ ...bookItem, category: e.target.value })
                      }
                      disabled={!editing}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-4 text-center">
            <div className="cover d-flex flex-column">
              <span>{id < 0 ? "" : `Trang bìa`} </span>
              {isAdding || (editing && editingCover) ? (
                <div className="upload-modal">
                  <input
                    className="img-url"
                    type="text"
                    placeholder="Nhập đường link hoặc kéo thả đường link ảnh"
                    value={uploadedImage}
                    onChange={(e) => setUploadedImage(e.target.value)}
                  />
                  <input
                    className="img-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <button onClick={handleUpload}>Upload</button>
                </div>
              ) : (
                <>
                  {editing && (<button onClick={() => setEditingCover(true)}>Edit Cover</button>
                  )}

                  {bookItem.cover && (
                    <img className="cover" src={bookItem.cover} alt="bìa sách" />
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        {isAdding ? (
          <button class="btn btn-success" onClick={handleAdd}>Add</button>
        ) : (
          <>
            {editing ? (
              <button class="btn btn-success" onClick={handleUpdate}>Update</button>
            ) : (
              // Kiểm tra token là "client" thì không hiển thị nút "Edit"
              localStorage.getItem("token") !== "client" && (
                <button class="btn btn-warning" onClick={handleEdit}>Edit</button>
              )
            )}
          </>
        )}
        <div className="footer-decoration"></div>
      </div>
    </div>
  );
};
