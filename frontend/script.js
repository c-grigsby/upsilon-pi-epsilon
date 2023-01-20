('use strict');
const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('name');
const message = document.getElementById('message');

// @Lozad lazy loading
const observer = lozad();
observer.observe();

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-group error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-group success';
};

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check for void required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Helper function to checkRequired
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check email is valid
const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email.value).toLowerCase())) {
    showSuccess(email);
  } else {
    const formControl = email.parentElement;
    formControl.classList.remove('success');
    showError(email, 'Email is not valid');
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, message]);
  checkLength(username, 3, 30);
  checkEmail(email);
});
