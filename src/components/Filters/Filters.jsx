import './Filters.css';

function Filters({ filters, onChange, onReset }) {
  const hasActiveFilters = Object.values(filters).some((value) => String(value).trim() !== '');

  return (
    <section className="filters" aria-label="Фильтры пользователей">
      <label className="field">
        <span>Фамилия</span>
        <input
          value={filters.lastName}
          onChange={(event) => onChange('lastName', event.target.value)}
        />
      </label>
      <label className="field">
        <span>Имя</span>
        <input
          value={filters.firstName}
          onChange={(event) => onChange('firstName', event.target.value)}
        />
      </label>
      <label className="field">
        <span>Возраст</span>
        <input
          min="1"
          value={filters.age}
          onChange={(event) => onChange('age', event.target.value)}
          type="number"
        />
      </label>
      <label className="field">
        <span>Пол</span>
        <select value={filters.gender} onChange={(event) => onChange('gender', event.target.value)}>
          <option value="">Любой</option>
          <option value="female">Женский</option>
          <option value="male">Мужской</option>
        </select>
      </label>
      <label className="field">
        <span>Страна</span>
        <input
          value={filters.country}
          onChange={(event) => onChange('country', event.target.value)}
        />
      </label>
      <button className="secondary-button" disabled={!hasActiveFilters} onClick={onReset} type="button">
        Сбросить
      </button>
    </section>
  );
}

export default Filters;
