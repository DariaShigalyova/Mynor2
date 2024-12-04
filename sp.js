function sort() {
    // Получаем выбранную радиокнопку
    let price = document.getElementById("price");
    let title = document.getElementById("title");

   
    if(price.checked){
        document.getElementById('node_for_insert').innerHTML = '';
        getResponceByPrice()}

    if(title.checked){
        document.getElementById('node_for_insert').innerHTML = '';
        getResponceByTitle()}
    } 

 //   document.getElementById("node_for_insert").innerHTML = '';

    // Вызываем соответствующую функцию для загрузки и сортировки данных
 //    if (price.checked) {
 //       await getResponceByPrice();
  //  } else if (title.checked) {
   //     await getResponceByTitle();  }
 //  

async function getResponceByPrice() {
    // Загружаем JSON-данные
    let response = await fetch("shop.json");
    let content = await response.text();

    content = JSON.parse(content)
    content = content.splice(0, 9)
    //content.sort()
    console.log(content)
    let key
    /*for (key in content) {
        console.log(content[key].id, content[key].title)
        console.log(content[key])
    }*/
    content_price=content.sort((a, b) => a.price - b.price);

    // Выводим отсортированные данные
    renderProducts(sortedByPrice);
}


async function getResponceByTitle() {
    // Загружаем JSON-данные
    let response = await fetch("shop.json");
    let content = await response.json();

    // Сортируем по названию
    let sortedByTitle = content.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
    
          // names must be equal
          return 0;
        });
    
    // Выводим отсортированные данные
    renderProducts(sortedByTitle);
}

function renderProducts(products) {
    // Контейнер для вставки
    let nodeForInsert = document.getElementById("node_for_insert");

    // Создаем элементы списка
    products.forEach(product => {
        nodeForInsert.innerHTML += `
            <li style="width: 310px" class="d-flex flex-column m-1 p-1 border bg-body">
                <img style="width: 180px" class="align-self-center" src="${product.img}" alt="${product.title}">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}. Цена: ${product.price} р.</p>
                <input type="hidden" name="vendor_code" value="${product.vendor_code}">
                <p class="card-text">
                    Заказать 
                    <input class="w-25" type="checkbox" name="check" value="0" 
                           onClick="this.value = this.checked ? 1 : 0">
                </p>
            </li>`;
    });
}

// Автоматически запускаем сортировку при загрузке страницы
sort()
