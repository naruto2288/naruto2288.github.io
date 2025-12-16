const modal = document.getElementById('modal');
const openBtn = document.getElementById('openForm');
const form = document.getElementById('feedbackForm');
const status = document.getElementById('status');

const STORAGE_KEY = 'feedbackFormData';
const FORM_ENDPOINT = 'https://formcarry.com/s/MjyvJrj8p1y'; // твой endpoint

/* Открыть попап */
function openModal(push = true) {
  modal.style.display = 'flex';
  if (push) history.pushState({ modal: true }, '', '#feedback');
}

/* Закрыть попап */
function closeModal() {
  modal.style.display = 'none';
}

/* Кнопка */
openBtn.addEventListener('click', () => openModal());

/* Назад в браузере */
window.addEventListener('popstate', () => closeModal());

/* Восстановление данных из LocalStorage */
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (saved) {
  Object.keys(saved).forEach(key => {
    if (form[key]) {
      if (form[key].type === 'checkbox') {
        form[key].checked = saved[key];
      } else {
        form[key].value = saved[key];
      }
    }
  });
}

/* Сохранение данных в LocalStorage */
form.addEventListener('input', () => {
  const data = {};
  [...form.elements].forEach(el => {
    if (el.name) {
      if (el.type === 'checkbox') {
        data[el.name] = el.checked;
      } else {
        data[el.name] = el.value;
      }
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
});

/* Отправка формы */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Отправка...';

  const formData = new FormData(form);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    const result = await response.json(); // для отладки
    console.log(result);

    if (response.ok) {
      status.textContent = 'Сообщение отправлено';
      form.reset();
      localStorage.removeItem(STORAGE_KEY);
    } else {
      status.textContent = 'Ошибка отправки';
      console.error('Formcarry error:', result);
    }
  } catch (err) {
    status.textContent = 'Ошибка сети';
    console.error(err);
  }
});
