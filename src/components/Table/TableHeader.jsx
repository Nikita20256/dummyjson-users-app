import { tableColumns } from './tableColumns.js';

function getSortIcon(columnKey, sortField, sortOrder) {
  if (columnKey !== sortField || !sortOrder) {
    return '↕';
  }

  return sortOrder === 'asc' ? '↑' : '↓';
}

function TableHeader({ sortField, sortOrder, columnWidths, onSort }) {
  return (
    <thead>
      <tr>
        {tableColumns.map((column) => {
          const active = column.key === sortField && Boolean(sortOrder);

          return (
            <th
              className={active ? `is-sorted ${sortOrder}` : ''}
              key={column.key}
              style={{ width: `${columnWidths[column.key]}%` }}
            >
              <button
                className={column.sortable ? 'sort-button' : 'sort-button is-static'}
                disabled={!column.sortable}
                onClick={() => column.sortable && onSort(column.key)}
                type="button"
              >
                <span>{column.label}</span>
                {column.sortable && <span className="sort-icon">{getSortIcon(column.key, sortField, sortOrder)}</span>}
              </button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
