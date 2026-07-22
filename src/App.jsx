import Filters from './components/Filters/Filters.jsx';
import UserModal from './components/Modal/UserModal.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import UsersTable from './components/Table/UsersTable.jsx';
import { useUsers } from './hooks/useUsers.js';
import './App.css';

const INITIAL_COLUMN_WIDTHS = {
  lastName: 12,
  firstName: 12,
  maidenName: 12,
  age: 11,
  gender: 10,
  phone: 15,
  email: 16,
  country: 7,
  city: 5,
};

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
        columnWidths={INITIAL_COLUMN_WIDTHS}
        onSort={changeSort}
        onRowClick={openModal}
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
