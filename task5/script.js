const productSelect = document.getElementById('product');
const priceField = document.getElementById('priceField');
const calcBtn = document.getElementById('calcBtn');


productSelect.addEventListener('change', function() {
priceField.value = productSelect.value + ' руб.';
});



priceField.value = productSelect.value + ' руб.';



calcBtn.addEventListener('click', function() {
const quantity = parseInt(document.getElementById('quantity').value);
const price = parseInt(productSelect.value);


const total = quantity * price;
document.getElementById('result').textContent = 'Стоимость заказа: ' + total + ' руб.';
});