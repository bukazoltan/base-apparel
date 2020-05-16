let emailForm = document.querySelector('.section__email-form');
let formInput = document.querySelector('.email-input');
let formButton = document.querySelector('.email-button');
let sectionContent = document.querySelector('.section__content');

// disabling native validation - if js fails to load, default validation still works
emailForm.setAttribute('novalidate', true);

// Show error
const showError = function(field, error) {

    // Add error class to the form element
    field.parentNode.classList.add('error');

    // Get id or name of form
    var id = field.id || field.name;
    if (!id) return;

    // checks if the message already exists
    var message = sectionContent.querySelector('.error-message#error-for-' + id);
    var icon = emailForm.querySelector('#error-icon');
    if (!message) {
        // add error message
        message = document.createElement('p');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        sectionContent.appendChild(message);
        // add error icon
        icon = document.createElement('img');
        icon.className = 'error-icon';
        icon.setAttribute('src', 'images/icon-error.svg')
        icon.id = 'error-icon';
        field.parentNode.insertBefore(icon, field.nextSibling);
    }

    message.innerHTML = error;

    message.style.display = 'block';
    message.style.visibility = 'visible'

    icon.style.display = 'block';
    icon.style.visibility = 'visible'

};

const hideError = (field) => {
    field.parentNode.classList.remove('error');

    var id = field.id || field.name;
    if (!id) return;

    var message = sectionContent.querySelector('.error-message#error-for-' + id);
    if (!message) return;

    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';

    var icon = document.getElementById('error-icon');

    icon.style.display = 'none';
    icon.style.visibility = 'hidden';
}

// listen to blur events
formInput.addEventListener('blur', (e) => {
    // return if it's not the element we want to validate
    if (!e.target.classList.contains('email-input')) return;
    // validate the field
    var error = e.target.validity;
    if (error.valid) {
        // do this if the validation pass
        hideError(e.target);
    } else {
        // do this if the validation doesn't pass
        showError(e.target, "Please provide a valid email");
    }
})


// adding focus to the whole form when the textinput is active

formInput.addEventListener('focus', () => {
    emailForm.classList.add('section__email-form--active');
});

formInput.addEventListener('focusout', () => {
    emailForm.classList.remove('section__email-form--active');
});