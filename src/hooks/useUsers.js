import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchUsers } from '../services/usersApi.js';

const DEFAULT_LIMIT = 8;
const INITIAL_FILTERS = {
  lastName: '',
  firstName: '',
  age: '',
  gender: '',
  country: '',
};

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const matchesFilters = (user, filters) => {
  const lastName = normalize(filters.lastName);
  const firstName = normalize(filters.firstName);
  const age = normalize(filters.age);
  const gender = normalize(filters.gender);
  const country = normalize(filters.country);

  return (
    (!lastName || normalize(user.lastName).includes(lastName)) &&
    (!firstName || normalize(user.firstName).includes(firstName)) &&
    (!age || String(user.age) === age) &&
    (!gender || normalize(user.gender) === gender) &&
    (!country || normalize(user.address?.country).includes(country))
  );
};

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const limit = DEFAULT_LIMIT;
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hasFilters = useMemo(
    () => Object.values(filters).some((value) => String(value).trim() !== ''),
    [filters],
  );

  useEffect(() => {
    const controller = new AbortController();
    const skip = hasFilters ? 0 : (page - 1) * limit;
    const requestLimit = hasFilters ? 0 : limit;

    setLoading(true);
    setError('');

    fetchUsers({
      limit: requestLimit,
      skip,
      sortField,
      sortOrder,
      signal: controller.signal,
    })
      .then((data) => {
        if (hasFilters) {
          const filteredUsers = data.users.filter((user) => matchesFilters(user, filters));
          const pageStart = (page - 1) * limit;

          setUsers(filteredUsers.slice(pageStart, pageStart + limit));
          setTotal(filteredUsers.length);
          return;
        }

        setUsers(data.users);
        setTotal(data.total);
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setUsers([]);
          setTotal(0);
          setError(fetchError.message || 'Произошла неизвестная ошибка.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [filters, hasFilters, limit, page, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const changeFilter = useCallback((name, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  }, []);

  const changeSort = useCallback((field) => {
    setPage(1);
    setSortField((currentField) => {
      if (currentField !== field) {
        setSortOrder('asc');
        return field;
      }

      setSortOrder((currentOrder) => {
        if (currentOrder === 'asc') {
          return 'desc';
        }

        if (currentOrder === 'desc') {
          return '';
        }

        return 'asc';
      });

      return currentField;
    });
  }, []);

  useEffect(() => {
    if (!sortOrder) {
      setSortField('');
    }
  }, [sortOrder]);

  const openModal = useCallback((user) => {
    setSelectedUser(user);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedUser(null);
  }, []);

  return {
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
  };
}
