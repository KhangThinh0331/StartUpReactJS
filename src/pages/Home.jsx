import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import "../styles/product.css";
import { getProducts } from "../services/productApi";

function Home() {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const pageFromUrl = Number(searchParams.get("page")) || 1;

    const [current, setCurrent] = useState(pageFromUrl);
    useEffect(() => {
        setCurrent(pageFromUrl);
    }, [pageFromUrl]);


    useEffect(() => {
        getProducts({
            params: { page: current, q: query },
        }).then(res => {
            setProducts(res.data.products);
            setPages(res.data.pages);
        });
    }, [current, query]);

    const handlePageChange = (page) => {
        setCurrent(page);

        const params = {};
        if (query) params.q = query;
        params.page = page;

        setSearchParams(params);
    };
    return (
        <div className="container mt-4" style={{ maxWidth: "1200px" }}>
            <Search />

            {/* PRODUCT LIST */}
            <div className="row g-4">
                {products.length > 0 ? (
                    products.map(p => (
                        <div className="col-sm-6 col-lg-4" key={p.id}>
                            <div className="card h-100 shadow-sm">
                                <Link to={`/products/${p.slug}`}>
                                    <img
                                        src={p.image}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                </Link>

                                <div className="card-body d-flex flex-column">
                                    <h5>{p.name}</h5>
                                    <p className="text-danger fw-bold">
                                        {p.price} đ
                                    </p>

                                    <Link
                                        to={`/products/${p.slug}`}
                                        className="btn btn-warning mt-auto"
                                    >
                                        Chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center fw-semibold fs-4">
                        Không có sản phẩm nào
                    </p>
                )}
            </div>

            {/* PAGINATION */}
            <Pagination
                current={current}
                pages={pages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Home;
