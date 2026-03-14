import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productApi";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: ""
    });

    const [oldImage, setOldImage] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        getProductById(id)
            .then(res => {
                const p = res.data.product;
                setForm({
                    name: p.name,
                    price: p.price,
                    description: p.description
                });
                setOldImage(p.image);
                setPreview(p.image);
            })
            .catch(err => console.error(err));
    }, [id]);

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
            setPreview(oldImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("oldImage", oldImage);

        if (image) {
            formData.append("image", image);
        }

        try {
            await updateProduct(id, formData).then(res => { alert(res.data.message) });
            navigate("/products/list");
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: 700 }}>
            <div className="card shadow-sm rounded-4">
                <div className="card-body p-4">
                    <h3 className="fw-bold mb-4 text-center">
                        <i className="bi bi-pencil-square me-2"></i>
                        Cập nhật sản phẩm
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
                            />
                        </div>

                        {preview && (
                            <div className="mb-3 text-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="img-thumbnail rounded-3"
                                    style={{ maxHeight: 180 }}
                                />
                            </div>
                        )}

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
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* ACTION */}
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
                                className="btn btn-primary rounded-pill px-4"
                            >
                                <i className="bi bi-save me-1"></i>
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
