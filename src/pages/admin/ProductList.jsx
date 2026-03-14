import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import "../../styles/product.css";
import { getProducts, softDeleteProduct, bulkSoftDeleteProducts } from "../../services/productApi";

function ProductList({ reloadTrashCount}) {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const current = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        getProducts({ q: query, page: current })
            .then(res => {
                setProducts(res.data.products);
                setPages(res.data.pages);
                setSelectedIds([]);
            });
    }, [query, current]);

    const toggleAll = (checked) => {
        setSelectedIds(checked ? products.map(p => p._id) : []);
    };

    const toggleOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            if (deleteId) {
                const res = await softDeleteProduct(deleteId);
                alert(res.data.message);

            } else {
                const res = await bulkSoftDeleteProducts(selectedIds);
                alert(res.data.message);

                setSelectedIds([]);
            }

            reload();
            reloadTrashCount();
        } catch (error) {
            console.error(error);
            alert("Xóa sản phẩm thất bại");
        } finally {
            setDeleteId(null);
        }
    };

    const reload = () => {
        setSelectedIds([]);

        getProducts({ q: query, page: current }).then(res => {
            setProducts(res.data.products);
            setPages(res.data.pages);

            if (current > res.data.pages && res.data.pages > 0) {
                setSearchParams({ page: res.data.pages });
            }
        });
    };

    return (
        <div className="mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold">
                    <i className="bi bi-list-ul me-2"></i>Danh sách sản phẩm
                </h3>
                <Link to="/products/create" className="btn btn-success rounded-pill">
                    <i className="bi bi-plus-circle me-1"></i> Thêm sản phẩm
                </Link>
            </div>

            {/* BULK ACTION */}
            <div className="mb-3 d-flex align-items-center gap-3">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedIds.length === products.length && products.length > 0}
                        onChange={e => toggleAll(e.target.checked)}
                    />
                    <label className="form-check-label">
                        Chọn tất cả
                    </label>
                </div>

                {selectedIds.length > 0 && (
                    <button
                        className="btn btn-sm btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                        onClick={() => setDeleteId(null)}
                    >
                        <i className="bi bi-trash me-1"></i>Xóa đã chọn
                    </button>
                )}
            </div>

            {/* SEARCH */}
            <Search />

            {/* TABLE */}
            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm">
                    <thead className="table-warning">
                        <tr>
                            <th></th>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th className="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((p, i) => (
                                <tr key={p._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(p._id)}
                                            onChange={() => toggleOne(p._id)}
                                        />
                                    </td>
                                    <td className="fw-semibold">
                                        {(current - 1) * 3 + i + 1}
                                    </td>
                                    <td>{p.name}</td>
                                    <td className="text-danger fw-semibold">
                                        {p.price} đ
                                    </td>
                                    <td>
                                        <img
                                            src={p.image}
                                            className="img-product rounded"
                                            alt={p.name}
                                            width="60"
                                        />
                                    </td>
                                    <td style={{ maxWidth: 220 }}>
                                        {p.description}
                                    </td>
                                    <td className="text-center">
                                        <Link
                                            to={`/products/${p._id}/edit`}
                                            className="btn btn-sm btn-outline-primary me-1"
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>Sửa
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteProductModal"
                                            onClick={() => setDeleteId(p._id)}
                                        >
                                            <i className="bi bi-trash me-1"></i>Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <Pagination
                current={current}
                pages={pages}
                onPageChange={(page) => {
                    const params = {};
                    if (query) params.q = query;
                    params.page = page;
                    setSearchParams(params);
                }}
            />

            {/* DELETE MODAL */}
            <div className="modal fade" id="deleteProductModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title text-danger fw-bold">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Xác nhận xóa
                            </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn xóa?</p>
                        </div>
                        <div className="modal-footer border-0 justify-content-center">
                            <button
                                className="btn btn-danger px-4"
                                onClick={handleDelete}
                                data-bs-dismiss="modal"
                            >
                                <i className="bi bi-trash-fill me-1"></i>Xóa bỏ
                            </button>
                            <button
                                className="btn btn-secondary px-4"
                                data-bs-dismiss="modal"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductList;
