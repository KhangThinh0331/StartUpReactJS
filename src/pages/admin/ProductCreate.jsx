import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productApi";

function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: ""
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("image", image);

        try {
            await createProduct(formData).then(res => { alert(res.data.message) });
            navigate("/products/list");
        } catch (err) {
            console.error(err);
            alert("Thêm sản phẩm thất bại");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: 700 }}>
            <div className="card shadow-sm rounded-4">
                <div className="card-body p-4">
                    <h3 className="fw-bold mb-4 text-center">
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm sản phẩm mới
                    </h3>

                    <form onSubmit={handleSubmit}>
                        {/* NAME */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-cup-straw me-1"></i>
                                Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control rounded-3"
                                placeholder="Nhập tên sản phẩm"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* PRICE */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-cash-stack me-1"></i>
                                Giá sản phẩm (đ)
                            </label>
                            <input
                                type="number"
                                name="price"
                                min="0"
                                className="form-control rounded-3"
                                placeholder="Nhập giá"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* IMAGE */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-image me-1"></i>
                                Hình ảnh
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control rounded-3"
                                onChange={handleImageChange}
                                required
                            />

                            {preview && (
                                <div className="mt-3 text-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="img-thumbnail rounded-3"
                                        style={{ maxHeight: 200 }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-card-text me-1"></i>
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                className="form-control rounded-3"
                                placeholder="Mô tả sản phẩm..."
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="d-flex justify-content-between">
                            <Link
                                to="/products/list"
                                className="btn btn-outline-secondary rounded-pill px-4"
                            >
                                <i className="bi bi-arrow-left me-1"></i>
                                Quay lại
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-success rounded-pill px-4"
                            >
                                <i className="bi bi-save me-1"></i>
                                Thêm sản phẩm
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddProduct;
