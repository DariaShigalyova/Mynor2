async function fetchData() {
    try {
        const response = await fetch('shop.json');
        if (!response.ok) throw new Error('Ошибка загрузки JSON');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderProducts(products) {
    const node = document.getElementById('node_for_insert');
    node.innerHTML = ''; // Очистка контейнера
    products.forEach(product => {
        node.innerHTML += `
            <li class="card product-card">
                <img src="${product.img}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}<br>Цена: ${product.price} р.</p>
                    <input type="number" class="form-control mb-2" name="${product.vendor_code}" min="0" placeholder="0">
                </div>
            </li>
        `;
    });
}

async function sort() {
    const products = await fetchData(); // Получаем данные из JSON
    const sortByPrice = document.getElementById('price').checked;

    if (sortByPrice) {
        products.sort((a, b) => a.price - b.price); // Сортировка по цене
    } else {
        products.sort((a, b) => a.title.localeCompare(b.title, 'ru')); // Сортировка по алфавиту
    }

    renderProducts(products); // Отображение отсортированных данных
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('title').checked = true; // Устанавливаем сортировку по умолчанию
    sort();
});
