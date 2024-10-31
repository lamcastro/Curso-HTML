const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');
const downloadButton = document.getElementById('download-button');

// Array para armazenar os cadastros
const cadastros = [];

// Função para salvar os cadastros no localStorage
function saveToLocalStorage() {
  localStorage.setItem('cadastros', JSON.stringify(cadastros));
}

// Função para baixar os cadastros em um arquivo
function downloadCadastros() {
  const formattedCadastros = cadastros.map((cadastro, index) => ({
    id: index + 1, // Adiciona um ID único aos cadastros
    username: cadastro.username,
    email: cadastro.email,
    password: cadastro.password,
  }));

  const formattedData = JSON.stringify(formattedCadastros, null, 2); // Formatação com recuo de 2 espaços

  const blob = new Blob([formattedData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cadastros.json';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  checkForm();
});

email.addEventListener('blur', () => {
  checkInputEmail();
});

username.addEventListener('blur', () => {
  checkInputUsername();
});

function checkInputUsername() {
  const usernameValue = username.value;

  if (usernameValue === '') {
    errorInput(username, 'Preencha um username!');
  } else {
    const formItem = username.parentElement;
    formItem.className = 'form-content';
  }
}

function checkInputEmail() {
  const emailValue = email.value;

  if (emailValue === '') {
    errorInput(email, 'O email é obrigatório.');
  } else {
    const formItem = email.parentElement;
    formItem.className = 'form-content';
  }
}

function checkInputPassword() {
  const passwordValue = password.value;

  if (passwordValue === '') {
    errorInput(password, 'A senha é obrigatória.');
  } else if (passwordValue.length < 8) {
    errorInput(password, 'A senha precisa ter no mínimo 8 caracteres.');
  } else {
    const formItem = password.parentElement;
    formItem.className = 'form-content';
  }
}

function checkInputPasswordConfirmation() {
  const passwordValue = password.value;
  const confirmationPasswordValue = passwordConfirmation.value;

  if (confirmationPasswordValue === '') {
    errorInput(passwordConfirmation, 'A confirmação de senha é obrigatória.');
  } else if (confirmationPasswordValue !== passwordValue) {
    errorInput(passwordConfirmation, 'As senhas não são iguais.');
  } else {
    const formItem = passwordConfirmation.parentElement;
    formItem.className = 'form-content';
  }
}

function checkForm() {
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
  checkInputPasswordConfirmation();

  const formItems = form.querySelectorAll('.form-content');

  const isValid = [...formItems].every((item) => {
    return item.className === 'form-content';
  });

  if (isValid) {
    const novoCadastro = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    cadastros.push(novoCadastro);
    saveToLocalStorage();
    alert('CADASTRADO COM SUCESSO!');

    // Limpar os campos do formulário
    username.value = '';
    email.value = '';
    password.value = '';
    passwordConfirmation.value = '';
  }
}

function errorInput(input, message) {
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector('a');

  textMessage.innerText = message;

  formItem.className = 'form-content error';
}

downloadButton.addEventListener('click', downloadCadastros);
