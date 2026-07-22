import { useMemo } from 'react';
import './Pagination.css';

function getPageNumbers(page, totalPages) {
  const visiblePages = new Set([1, totalPages, page - 1, page, page + 1]);

  return Array.from(visiblePages)
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((first, second) => first - second);
}

function Pagination({ page, limit, total, totalPages, onPageChange }) {
  const pageNumbers = useMemo(() => getPageNumbers(page, totalPages), [page, totalPages]);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <nav className="pagination" aria-label="Пагинация">
      <div className="range-info">
        {from}-{to} из {total}
      </div>

      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)} type="button">
          Назад
        </button>
        {pageNumbers.map((pageNumber, index) => {
          const previousPage = pageNumbers[index - 1];
          const showGap = previousPage && pageNumber - previousPage > 1;

          return (
            <span className="page-fragment" key={pageNumber}>
              {showGap && <span className="page-gap">...</span>}
              <button
                className={pageNumber === page ? 'active-page' : ''}
                onClick={() => onPageChange(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            </span>
          );
        })}
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} type="button">
          Вперёд
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
