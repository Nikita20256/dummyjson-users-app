import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './UserModal.css';

function UserModal({ user, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  const fullName = [user.lastName, user.firstName, user.maidenName].filter(Boolean).join(' ');

  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose}>
      <article className="user-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} type="button" aria-label="Закрыть">
          ×
        </button>

        <header className="modal-header">
          <img src={user.image} alt={fullName} />
          <div>
            <p className="eyebrow">Профиль пользователя</p>
            <h2>{fullName}</h2>
            <span className="gender-pill">{user.gender}</span>
          </div>
        </header>

        <dl className="details-grid">
          <div>
            <dt>Возраст</dt>
            <dd>{user.age}</dd>
          </div>
          <div>
            <dt>Рост</dt>
            <dd>{user.height} см</dd>
          </div>
          <div>
            <dt>Вес</dt>
            <dd>{user.weight} кг</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>{user.phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Страна</dt>
            <dd>{user.address?.country || '—'}</dd>
          </div>
          <div>
            <dt>Город</dt>
            <dd>{user.address?.city || '—'}</dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>{user.address?.address || '—'}</dd>
          </div>
          <div>
            <dt>Почтовый индекс</dt>
            <dd>{user.address?.postalCode || '—'}</dd>
          </div>
        </dl>
      </article>
    </div>,
    document.body,
  );
}

export default UserModal;
