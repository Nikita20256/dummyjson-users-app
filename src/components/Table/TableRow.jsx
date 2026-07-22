import { tableColumns } from './tableColumns.js';

const getCellValue = (user, key) => {
  if (key === 'country') {
    return user.address?.country || '—';
  }

  if (key === 'city') {
    return user.address?.city || '—';
  }

  return user[key] || '—';
};

function TableRow({ user, columnWidths, onClick }) {
  return (
    <tr className="user-row" onClick={() => onClick(user)} tabIndex="0">
      {tableColumns.map((column) => (
        <td key={column.key} style={{ width: `${columnWidths[column.key]}%` }}>
          {getCellValue(user, column.key)}
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
