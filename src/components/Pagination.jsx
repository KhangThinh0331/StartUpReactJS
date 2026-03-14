function Pagination({ current, pages, onPageChange }) {
    if (pages <= 1) return null;

    const visibleRange = 2;

    const renderPages = () => {
        const items = [];

        // FIRST
        if (current > visibleRange + 1) {
            items.push(
                <li key="first" className="page-item">
                    <button className="page-link" onClick={() => onPageChange(1)}>
                        1
                    </button>
                </li>
            );

            items.push(
                <li key="start-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                </li>
            );
        }

        // MIDDLE
        for (
            let i = Math.max(1, current - visibleRange);
            i <= Math.min(pages, current + visibleRange);
            i++
        ) {
            items.push(
                <li
                    key={i}
                    className={`page-item ${i === current ? "active" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        // LAST
        if (current < pages - visibleRange) {
            items.push(
                <li key="end-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                </li>
            );

            items.push(
                <li key="last" className="page-item">
                    <button
                        className="page-link"
                        onClick={() => onPageChange(pages)}
                    >
                        {pages}
                    </button>
                </li>
            );
        }

        return items;
    };

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center align-items-center">

                {/* PREV */}
                <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current - 1)}
                    >
                        &laquo;
                    </button>
                </li>

                {renderPages()}

                {/* NEXT */}
                <li className={`page-item ${current === pages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current + 1)}
                    >
                        &raquo;
                    </button>
                </li>

            </ul>
        </nav>
    );
}

export default Pagination;
