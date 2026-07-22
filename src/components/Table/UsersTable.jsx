import TableHeader from './TableHeader.jsx';
import TableRow from './TableRow.jsx';
import { tableColumns } from './tableColumns.js';
import './UsersTable.css';

function UsersTable({
  users,
  loading,
  error,
  sortField,
  sortOrder,
  columnWidths,
  onSort,
  onRowClick,
}) {
  const columnCount = tableColumns.length;

  return (
    <section className="table-card">
      <div className="table-scroll">
        <table className="users-table">
          <TableHeader
            columnWidths={columnWidths}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columnCount}>
                  <div className="state-message">
                    <span className="loader" />
                    Загружаем пользователей...
                  </div>
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={columnCount}>
                  <div className="state-message error-message">{error}</div>
                </td>
              </tr>
            )}

            {!loading && !error && users.length === 0 && (
              <tr>
                <td colSpan={columnCount}>
                  <div className="state-message">По заданным фильтрам ничего не найдено.</div>
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              users.map((user) => (
                <TableRow key={user.id} columnWidths={columnWidths} user={user} onClick={onRowClick} />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsersTable;
