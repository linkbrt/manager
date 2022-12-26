let btn = document.getElementById('btn-add-new-item');
let row = document.getElementsByClassName('row row-cols-3')[0];

let toy_name = document.getElementById('input-toy-name');
let toy_price = document.getElementById('input-toy-price');
let toy_amount = document.getElementById('input-toy-amount');
let toy_age = document.getElementById('input-toy-age');

let xhr = new XMLHttpRequest();

function renderItems(items){
    for (let i = 0; i < items.length; i++){
        let div = document.createElement('div');
    
        div.classList.add('card');
        div.style.width = '18rem';
        div.style.margin = '20px';
    
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${items[i].title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${items[i].price} руб.</li>
                <li class="list-group-item">${items[i].amount} шт.</li>
                <li class="list-group-item">Возраст ${items[i].age}</li>
            </ul>
            <div class="card-body">
                <a href="toys/${items[i].id}/" class="card-link">Ссылка на игрушку</a>
            </div>
        `;
    
        btn.parentNode.parentNode.before(div);
    }
}

xhr.open('GET', 'toys/', false);
xhr.send();
let items = JSON.parse(xhr.response);

renderItems(items);




xhr.onload = function() {
    if (xhr.status == 201){
        let response = JSON.parse(xhr.response);

        let div = document.createElement('div');

        div.classList.add('card');
        div.style.width = '18rem';
        div.style.margin = '20px';

        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${response.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${response.price} руб.</li>
                <li class="list-group-item">${response.amount} шт.</li>
                <li class="list-group-item">Возраст ${response.age}</li>
            </ul>
            <div class="card-body">
                <a href="toys/${response.id}/" class="card-link">Ссылка на игрушку</a>
            </div>
        `;
        let card = document.getElementsByClassName('add-card')[0];
        card.before(div);

        toy_name.value = '';
        toy_age.value = '';
        toy_price.value = '';
        toy_amount.value = '';
        btn.disabled = true;
    }
}

toy_name.oninput = check_inputs;
toy_age.oninput = check_inputs;
toy_price.oninput = check_inputs;
toy_amount.oninput = check_inputs;

function check_inputs(){
    if (toy_name.value.length == 0){
        btn.disabled = true;
        return;
    }
    if (toy_price.value.length == 0){
        btn.disabled = true;
        return;
    }
    if (toy_age.value.length == 0){
        btn.disabled = true;
        return;
    }
    if (toy_amount.value.length == 0){
        btn.disabled = true;
        return;
    }
    btn.disabled = false;
}



btn.addEventListener('click', function() {
    xhr.open("POST", 'toys/', true)
    xhr.setRequestHeader("Content-type", 'application/json');
    let data = {
        title: toy_name.value,
        age: toy_age.value,
        price: toy_price.value,
        amount: toy_amount.value,
    }
    xhr.send(JSON.stringify(data));
}, false)

let filter = '';

function clearItems(){
    let items = document.getElementsByClassName('card');
    let container = document.getElementsByClassName('row-cols-3')[0];

    let count = items.length - 1;
    for (let i = 0; i < count; i++){
        container.removeChild(items[0]);
    }
}

function sortItems(selectObject){
    clearItems();

    if (selectObject.selectedIndex == 1){
        filter = 'title';
    } else if (selectObject.selectedIndex == 2){
        filter = 'price';
    } else if (selectObject.selectedIndex == 3){
        filter = 'amount';
    }
    xhr.open('GET', `toys?ordering=${filter}`, false);
    xhr.send();
    renderItems(JSON.parse(xhr.response));
}

function filterPrice(){
    clearItems();
    let inp = document.getElementById('price-filter')
    xhr.open('GET', `toys`, false);
    xhr.send();
    let items = Array.from(JSON.parse(xhr.response));
    if (inp.value == '') {
        renderItems(items);
        return;
    }
    let arr_to_render = new Array();

    for (let i = 0; i < items.length; i++){
        if (items[i].price <= inp.value) {
            arr_to_render.push(items[i]);
        }
    }
    renderItems(arr_to_render);
}

function filterLowAge(sender){
    clearItems();
    xhr.open('GET', `toys`, false);
    xhr.send();
    let items = Array.from(JSON.parse(xhr.response));
    if (sender.value == '') {
        renderItems(items);
        return;
    }
    let arr_to_render = new Array();

    for (let i = 0; i < items.length; i++){
        if (items[i].age >= sender.value) {
            arr_to_render.push(items[i]);
        }
    }
    renderItems(arr_to_render);
}

function filterHighAge(){

}