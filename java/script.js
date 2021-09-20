const button = document.getElementById("button-addon");
const input = document.getElementById("input");

const newInput = document.getElementById("newInput");

let inputsArr = [];


const addInput = function addInput () {

    if (!input.value) {
        return false
    } else if (input.value.includes('555')) {
        input.value = input.value.replace(/555/, '---');
    }

    let element = input.value;

    newInput.innerHTML += `<input class="form-control nInput" type="text" value="${element}">`;
    input.value = "";

    inputsArr.push("item");

    (inputsArr.length % 2 == 0) ? element = input.value.toUpperCase() : element = input.value.toLowerCase();
   
}


button.addEventListener ('click', addInput);
document.addEventListener ('keydown', function (e) {
    if (e.code === 'Enter') {
        addInput();
    }});


