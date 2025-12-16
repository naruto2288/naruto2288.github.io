const quantityInput = document.getElementById('quantity');
const typeRadios = document.getElementsByName('type');
const optionsBlock = document.getElementById('optionsBlock');
const propertyBlock = document.getElementById('propertyBlock');
const optionsSelect = document.getElementById('optionsSelect');
const propertyCheck = document.getElementById('propertyCheck');
const resultDiv = document.getElementById('result');

// База цен
const basePrices = {
  1: 100,
  2: 200,
  3: 250
};

// Опции для типа 2
const type2Options = [
  {name: "Опция А", price: 20},
  {name: "Опция B", price: 40}
];

// Свойство для типа 3
const propertyAddPrice = 50;

function updateForm() {
  const selectedType = getSelectedType();

  // Управление отображением
  if (selectedType == 1) {
    optionsBlock.style.display = "none";
    propertyBlock.style.display = "none";
  }
  if (selectedType == 2) {
    propertyBlock.style.display = "none";
    optionsBlock.style.display = "block";
    loadType2Options();
  }
  if (selectedType == 3) {
    optionsBlock.style.display = "none";
    propertyBlock.style.display = "block";
  }

  calculateTotal();
}

function loadType2Options() {
  optionsSelect.innerHTML = "";
  type2Options.forEach((opt, i) => {
    const option = document.createElement('option');
    option.value = opt.price;
    option.textContent = `${opt.name} (+${opt.price} руб.)`;
    optionsSelect.appendChild(option);
  });
}

function getSelectedType() {
  return [...typeRadios].find(r => r.checked).value;
}

function calculateTotal() {
  const quantity = Number(quantityInput.value);
  const type = getSelectedType();
  let total = basePrices[type];

  if (type == 2) {
    total += Number(optionsSelect.value);
  }

  if (type == 3 && propertyCheck.checked) {
    total += propertyAddPrice;
  }
  if(quantity < 0){
  document.getElementById('result').textContent = 'Ошибка';
  return;
}

  total *= quantity;

  resultDiv.textContent = `Стоимость: ${total} руб.`;
}

// Слушатели событий
quantityInput.addEventListener('input', calculateTotal);
typeRadios.forEach(r => r.addEventListener('change', updateForm));
optionsSelect.addEventListener('change', calculateTotal);
propertyCheck.addEventListener('change', calculateTotal);

// Инициализация
updateForm();