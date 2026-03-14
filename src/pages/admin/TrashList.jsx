import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { getTrashedProducts, restoreProduct, bulkRestoreProducts, deleteProduct, bulkDeleteProducts } from "../../services/trashApi";

function TrashList({ reloadTrashCount }) {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1);
    const [checkedIds, setCheckedIds] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const current = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        getTrashedProducts({ q: query, page: current }).then(res => {
            setProducts(res.data.products);
            setPages(res.data.pages);
        });
    }, [query, current]);

    /* PAGINATION */
    const handlePageChange = (page) => {
        const params = {};
        if (query) params.q = query;
        params.page = page;
        setSearchParams(params);
    };

    /* CHECKBOX */
    const toggleCheckAll = (checked) => {
        setCheckedIds(checked ? products.map(p => p._id) : []);
    };

    const toggleCheck = (id) => {
        setCheckedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    /* RESTORE */
    const restoreOne = async (id) => {
        try {
            const res = await restoreProduct(id);
            alert(res.data.message);
            reload();
            reloadTrashCount();
        } catch (err) {
            console.error(err);
            alert("Khôi phục thất bại");
        }
    };

    const restoreBulk = async () => {
        try {
            const res = await bulkRestoreProducts(checkedIds);
            alert(res.data.message);
            reload();
            reloadTrashCount();
        } catch (err) {
            console.error(err);
            alert("Khôi phục thất bại");
        }
    };

    /* DELETE */
    const forceDelete = async () => {
        try {
            if (deleteId) {
                const res = await deleteProduct(deleteId);
                alert(res.data.message);
            } else {
                const res = await bulkDeleteProducts(checkedIds);
                alert(res.data.message);
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
        setCheckedIds([]);

        getTrashedProducts({ q: query, page: current }).then(res => {
            setProducts(res.data.products);
            setPages(res.data.pages);

            // FIX pagination
            if (current > res.data.pages && res.data.pages > 0) {
                setSearchParams({ page: res.data.pages });
            }
        });
    };

    const anyChecked = checkedIds.length > 0;

    return (
        <div className="mt-4">
            <h3 className="fw-bold mb-3">
                <i className="bi bi-trash me-2"></i>Thùng rác
            </h3>

            {/* SEARCH */}
            <Search />

            {/* BULK ACTION */}
            <div className="d-flex align-items-center gap-3 mb-3">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={checkedIds.length === products.length && products.length > 0}
                        onChange={e => toggleCheckAll(e.target.checked)}
                    />
                    <label className="form-check-label">Chọn tất cả</label>
                </div>

                {anyChecked && (
                    <>
                        <button className="btn btn-sm btn-outline-primary"
                            onClick={restoreBulk}>
                            <i className="bi bi-pencil-square me-1"></i>
                            Khôi phục đã chọn
                        </button>

                        <button
                            className="btn btn-sm btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => setDeleteId(null)}
                        >
                            <i className="bi bi-trash me-1"></i>
                            Xóa vĩnh viễn đã chọn
                        </button>
                    </>
                )}
            </div>

            {/* TABLE */}
            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm">
                    <thead className="table-warning">
                        <tr>
                            <th></th>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Hình</th>
                            <th>Mô tả</th>
                            <th className="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ? products.map((p, i) => (
                            <tr key={p._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={checkedIds.includes(p._id)}
                                        onChange={() => toggleCheck(p._id)}
                                    />
                                </td>
                                <td>{(current - 1) * 3 + i + 1}</td>
                                <td>{p.name}</td>
                                <td className="text-danger fw-semibold">{p.price} đ</td>
                                <td>
                                    <img src={p.image} className="img-product rounded" alt="" />
                                </td>
                                <td style={{ maxWidth: 220 }}>{p.description}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-1"
                                        onClick={() => restoreOne(p._id)}
                                    >
                                        Khôi phục
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        onClick={() => setDeleteId(p._id)}
                                    >
                                        Xóa vĩnh viễn
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Thùng rác trống
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
                onPageChange={handlePageChange}
            />

            {/* DELETE MODAL */}
            <div className="modal fade" id="deleteModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title text-danger fw-bold">
                                Xác nhận xóa
                            </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            Hành động này không thể hoàn tác
                        </div>
                        <div className="modal-footer border-0 justify-content-center">
                            <button
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={forceDelete}
                            >
                                Xóa bỏ
                            </button>
                            <button
                                className="btn btn-secondary"
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

export default TrashList;
