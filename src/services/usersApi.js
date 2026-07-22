const API_URL = 'https://dummyjson.com/users';

export async function fetchUsers({ limit, skip, sortField, sortOrder, signal }) {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('skip', String(skip));

  if (sortField && sortOrder) {
    params.set('sortBy', sortField);
    params.set('order', sortOrder);
  }

  let response;

  try {
    response = await fetch(`${API_URL}?${params.toString()}`, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }

    throw new Error('Не удалось подключиться к серверу. Проверьте интернет-соединение.');
  }

  if (response.status === 404) {
    throw new Error('Пользователи не найдены. Сервер вернул 404.');
  }

  if (!response.ok) {
    throw new Error(`Сервер временно недоступен. Код ошибки: ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data.users)) {
    throw new Error('Сервер вернул данные в неожиданном формате.');
  }

  return data;
}
