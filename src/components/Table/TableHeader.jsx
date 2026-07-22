import { tableColumns } from './tableColumns.js';

import { useEffect, useRef, useCallback } from 'react';

function getSortIcon(columnKey, sortField, sortOrder) {
  if (columnKey !== sortField || !sortOrder) {
    return '↕';
  }

  return sortOrder === 'asc' ? '↑' : '↓';
}

function TableHeader({ sortField, sortOrder, columnWidths, rawColumnWidths, onSort, onColumnResize }) {
  const activeColumnRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const deltaRef = useRef(0);

  const handleMouseDown = useCallback(
    (e, columnKey) => {
      e.preventDefault();
      activeColumnRef.current = columnKey;
      startXRef.current = e.clientX;
      startWidthRef.current = rawColumnWidths[columnKey];
      deltaRef.current = 0;
    },
    [rawColumnWidths],
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!activeColumnRef.current) return;
      deltaRef.current = e.clientX - startXRef.current;
      const newWidth = startWidthRef.current + deltaRef.current;
      onColumnResize(activeColumnRef.current, newWidth);
    };

    const handleMouseUp = () => {
      activeColumnRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onColumnResize]);

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
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, column.key)}
              />
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
