import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../services/productApi";

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductBySlug(slug).then(res => setProduct(res.data.product));
    }, [slug]);

    if (!product) return <p className="text-center mt-5">Đang tải...</p>;

    return (
        <div className="container mt-5">
            <div className="row g-4 align-items-start">
                <div className="col-lg-5">
                    <div className="card shadow-sm border-0">
                        <img
                            src={product.image}
                            className="img-fluid rounded"
                            alt={product.name}
                        />
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="fw-bold mb-3 text-dark">
                            {product.name}
                        </h2>

                        <p className="text-dark mb-4">
                            {product.description}
                        </p>

                        <h4 className="text-danger fw-bold mb-4">
                            {product.price} đ
                        </h4>

                        {/*
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-secondary btn-lg px-4">
                                Thêm vào giỏ
                            </button>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
