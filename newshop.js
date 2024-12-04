function sort() {

    let price = document.getElementById("price");
    let title = document.getElementById("title");

   
    if(price.checked){
        document.getElementById('node_for_insert').innerHTML = '';
        getResponceByPrice()}

    if(title.checked){
        document.getElementById('node_for_insert').innerHTML = '';
        getResponceByTitle()}
    } 



async function getResponceByPrice() {
   
    let response = await fetch("shop.json");
    let content = await response.text();

    content = JSON.parse(content)
    content = content.slice(0, 9)
    
    console.log(content)
    let key
   
    content_price=content.sort((a, b) => a.price - b.price);

   
    renderFlowers(sortedByPrice);
}


async function getResponceByTitle() {

    let response = await fetch("shop.json");
    let content = await response.json();

    let sortedByTitle = content.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
    
          return 0;
        });
 
    renderFlowers(sortedByTitle);
}

function renderFlowers(flowers) {
   
    let nodeForInsert = document.getElementById("node_for_insert");

 
    flowers.forEach(flowers => {
        nodeForInsert.innerHTML += `
            <li style="width: 310px" class="d-flex flex-column m-1 p-1 border bg-body">
                <img style="width: 180px" class="align-self-center" src="${flower.img}" alt="${flower.title}">
                <h5 class="card-title">${flower.title}</h5>
                <p class="card-text">${flower.description}. Цена: ${flower.price} р.</p>
                <input type="hidden" name="vendor_code" value="${flower.vendor_code}">
                <p class="card-text">
                    Заказать 
                    <input class="w-25" type="checkbox" name="check" value="0" 
                           onClick="this.value = this.checked ? 1 : 0">
                </p>
            </li>`;
    });
}


sort()
