('use strict');
const form = document.getElementById('form');
const formSubmitBttn = document.getElementById('submit-bttn');
const email = document.getElementById('email');
const username = document.getElementById('name');
const message = document.getElementById('message');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

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

// Remove success class
const removeSuccess = (inputArr) => {
  inputArr.forEach((input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-group';
  });
};

// Helper function to checkLength & checkRequired
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

// Check for void required fields
const checkRequired = (inputArr) => {
  let notEmptyInput = 0;

  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      notEmptyInput++;
    }
  });

  if (notEmptyInput === inputArr.length) {
    return true;
  } else {
    return false;
  }
};

// Check email is valid
const checkValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(String(email.value).toLowerCase())) {
    showSuccess(email);
    return true;
  } else {
    const formControl = email.parentElement;
    formControl.classList.remove('success');
    showError(email, 'Email is not valid');
    return false;
  }
};

// Open modal
const openModal = () => {
  modal.style.display = 'block';
};

// Close modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Close if outside click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// POSTs contact form data to the API
const sendContactForm = () => {
  const pre_payload = new FormData(form);
  const payload = new URLSearchParams(pre_payload);
  fetch('https://upe-server.herokuapp.com/api/v1/mailer/sendEmail', {
    method: 'POST',
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

// Event Listeners
formSubmitBttn.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    checkRequired([username, email, message]) &&
    checkValidEmail(email) &&
    checkLength(username, 3, 30)
  ) {
    openModal();
    sendContactForm();
    removeSuccess([username, email, message]);
    form.reset();
  }
});
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
