const button = document.getElementById("button-addon");
const input = document.getElementById("input");

const newInput = document.getElementById("newInput");

const colors = [ "blue", "orange", "green", "red", "green-light", "dark-blue" ];

let currentColor;

function addInput() {

  if (!input.value) return false; 
  
  let element = input.value;
  const prefix = Date.now();
  
  let colorsRandomIndex = Math.floor(Math.random() * colors.length);
  let defaultColor = colors[colorsRandomIndex];
  

  const addElement = document.createElement("div");
  addElement.classList.add("input-group");
  addElement.classList.add("mb-3");


  if (currentColor) { 

    addElement.innerHTML += `<div class="input-group-text ${currentColor}" id="check-container-${prefix}"><input class="form-check-input mt-0" id="checkbox-${prefix}" type="checkbox"></div>
      <div class="form-control ${currentColor}" id="container-${prefix}">${element}</div>`;

  } else {

    addElement.innerHTML += `<div class="input-group-text ${defaultColor}" id="check-container-${prefix}"><input class="form-check-input mt-0" id="checkbox-${prefix}" type="checkbox"></div>
     <div class="form-control ${defaultColor}" id="container-${prefix}">${element}</div>`;
  }

  newInput.insertAdjacentElement('beforeBegin', addElement);

  input.value = "";
  currentColor = "";
}


function toggleStatusDone(event) {

  const containerId = event.target.id.replace('checkbox', 'container');
  const checkContainerId = event.target.id.replace('checkbox', 'check-container');
                                                                        
  const container = document.getElementById(containerId);
  const checkContainer = document.getElementById(checkContainerId);


  container.classList.toggle('line-through', event.target.checked);
  container.classList.toggle('disabled', event.target.checked);
  checkContainer.classList.toggle('line-through', event.target.checked);
  checkContainer.classList.toggle('disabled', event.target.checked);
}

document.addEventListener('click', (event) => {
  if (event.target && event.target.id.indexOf('check') > -1) {
    toggleStatusDone(event);
  }
  if (event.target && event.target.dataset.color) { 

    currentColor = event.target.dataset.color;
  }
});

button.addEventListener('click', addInput);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    addInput();
  }
});