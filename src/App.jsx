import { useState, useCallback } from 'react';
import Filters from './components/Filters/Filters.jsx';
import UserModal from './components/Modal/UserModal.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import UsersTable from './components/Table/UsersTable.jsx';
import { useUsers } from './hooks/useUsers.js';
import './App.css';

const INITIAL_COLUMN_WIDTHS = {
  lastName: 120,
  firstName: 120,
  maidenName: 120,
  age: 100,
  gender: 100,
  phone: 140,
  email: 160,
  country: 100,
  city: 100,
};

function getColumnWidthsAsPercent(widths) {
  const total = Object.values(widths).reduce((sum, w) => sum + w, 0);
  if (total === 0) return widths;
  const result = {};
  for (const [key, value] of Object.entries(widths)) {
    result[key] = (value / total) * 100;
  }
  return result;
}

function App() {
  const {
    users,
    total,
    loading,
    error,
    page,
    limit,
    sortField,
    sortOrder,
    filters,
    selectedUser,
    modalOpen,
    totalPages,
    setPage,
    changeFilter,
    resetFilters,
    changeSort,
    openModal,
    closeModal,
  } = useUsers();

  const [rawColumnWidths, setRawColumnWidths] = useState(INITIAL_COLUMN_WIDTHS);

  const handleColumnResize = useCallback((key, newWidth) => {
    setRawColumnWidths((prev) => ({
      ...prev,
      [key]: Math.max(50, newWidth),
    }));
  }, []);

  const columnWidths = getColumnWidthsAsPercent(rawColumnWidths);

  const activeFilters = Object.values(filters).filter((value) => String(value).trim() !== '').length;

  return (
    <main className="app-shell">
      <section className="app-heading">
        <div>
          <p className="eyebrow">DummyJSON Users</p>
          <h1>Пользователи</h1>
        </div>
        <div className="summary">
          <span>{total}</span>
          <small>записей</small>
        </div>
      </section>

      <Filters filters={filters} onChange={changeFilter} onReset={resetFilters} />

      <UsersTable
        users={users}
        loading={loading}
        error={error}
        sortField={sortField}
        sortOrder={sortOrder}
        columnWidths={columnWidths}
        onSort={changeSort}
        onRowClick={openModal}
        onColumnResize={handleColumnResize}
        rawColumnWidths={rawColumnWidths}
      />

      <Pagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {modalOpen && selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
    </main>
  );
}

export default App;
