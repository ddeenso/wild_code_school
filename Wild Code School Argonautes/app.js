let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let argos = document.getElementById("argos");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Votre argonaute n'a pas de nom ?";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createArgos();
};

let createArgos = () => {
  argos.innerHTML = "";
  data.map((x, y) => {
    return (argos.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editArgo(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteArgo(this);createArgos()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
  });

  resetForm();
};

let resetForm = () => {
  textInput.value = "";
  textarea.value = "";
};

let deleteArgo = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editArgo = (e) => {
  let selectedArgo = e.parentElement.parentElement;

  textInput.value = selectedArgo.children[0].innerHTML;
  textarea.value = selectedArgo.children[1].innerHTML;

  deleteArgo(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createArgos();
})();