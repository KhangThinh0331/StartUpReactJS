import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.q.value.trim();

        const params = {};
        if (value) params.q = value;
        params.page = 1;

        setSearchParams(params);
    };

    return (
        <form className="d-flex mb-3" onSubmit={handleSearch}>
            <input
                type="text"
                className="form-control me-2"
                name="q"
                placeholder="Tìm theo tên sản phẩm..."
                defaultValue={query}
            />
            <button className="btn btn-outline-primary">
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
}

export default Search;
