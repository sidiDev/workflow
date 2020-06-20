// Get nav item to put user name in it
let navItem = document.querySelector('.navbar .nav-item');

// Get user info from localstorage
let getUserInfo = localStorage.getItem('userInfo');

// If User info not equal null put user name in nav item
if (getUserInfo) {
    
    let jsonToObj = JSON.parse(getUserInfo);
    navItem.textContent = `Logged in as ${jsonToObj.name}`;
}

// Get next button
let nextBtn = document.querySelectorAll('.user-desc-footer button');

// Get the inputs elements
let inputsEl = document.querySelectorAll('.input-form .input');

// Get textarea span note
let textareaNote = document.querySelector('.textarea-note');

// When user write in input of description if chars is > 100 show message
function textareaInput() {
    
    inputsEl[1].oninput = function() {

        document.querySelector('.chars-counter').textContent = `${this.value.length} Characters`;

        if (this.value.length > 100 || this.value.length < 20) {
            textareaNote.innerHTML = 
            'The input must be equal 20 chars or less than 100 chars';

        } else {

            textareaNote.innerHTML = '';
        }
        
    }
}
textareaInput()

// Get input title span note
let inputNote = document.querySelector('.input-note');

// When click on next button if the inputs not equal emtty transfer user to next page
nextBtn[1].onclick = function() {

    checkInput()

    if (inputsEl[1].value.length <= 100 && inputsEl[1].value.length >= 20 && inputsEl[0].value.length > 4 && inputsEl[0].value.length < 20) {
        
        let UserDesc = {
            title: inputsEl[0].value,
            description: inputsEl[1].value
        }

        localStorage.setItem('UserDesc',JSON.stringify(UserDesc));
        window.location = 'profile-photo-page.html';

    } else if (inputsEl[1].value.length > 100 || inputsEl[1].value.length < 20) {

        textareaNote.textContent = 'The input must be equal 20 chars or less than 100 chars'

    }
}

function checkInput() {

    // When click on next button if the inputs not equal emtty transfer user to next page

    if (inputsEl[0].value == '' || inputsEl[0].value.length < 5 || inputsEl[0].value.length > 20) {

        inputNote.textContent = 'The input is must be longer than 4 chars or equal or less than 20 chars';
    
    } else {

        inputNote.textContent = '';
    }
}

// When click back button transfer user to back page
nextBtn[0].onclick = function() {
    window.location = 'languages-page.html';
}