// Get image of show and hide password
let showHidePass = document.querySelector('.show-hide-pass');

//Get the inputs
let getInputs = document.querySelectorAll('.form input')

//Get spans
let getSpans = document.querySelectorAll('.form span');

// Email output
let emailOutput = document.querySelector('.email-output');

//Get sumbit button
let sumbitBtn = document.querySelector('.sub-button button');

// When click on show-hide-pass button show password if the input has attribute type = password
// and if the input has attribute type = text hide password

showHidePass.onclick = function() {

    let getInputType = this.previousElementSibling.getAttribute('type');
    
    if (getInputType == 'password') {
        this.src = 'icons/hide-pass.png';
        this.previousElementSibling.setAttribute('type','text')

    } else {
        this.src = 'icons/show-pass.png';
        this.previousElementSibling.setAttribute('type','password')
    }
}

// When click on sumbit button if the inputs not empty save the data in localstorage
sumbitBtn.onclick = function() {

    checkName(getInputs[0])
    checkEmail(getInputs[1])
    checkPass(getInputs[2])

    if (getSpans[0].textContent == '' && getSpans[2].textContent == '' && 
        getInputs[1].textContent == '' && emailOutput.textContent == '') {

            let userInfo = {
                name: getInputs[0].value,
                email: `${getInputs[1].value}@gmail.com`,
                password: getInputs[2].value.trim()
            }

            localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

}

function checkName(nameInput) {

    if (nameInput.value.length > 15) {
        document.querySelector('.name-output').innerHTML =
        'The name must be shorter than 15 chars'

    } else if (nameInput.value.length < 4) {
        document.querySelector('.name-output').innerHTML =
        'The name must be at least longer than 3 chars'

    } else {
        document.querySelector('.name-output').innerHTML = '';

    }
}

function checkPass(passInput) {
    
    if (passInput.value.length < 8) {
        document.querySelector('.pass-output').innerHTML =
        'passord must be at least longer than 7 chars'

    } else {
        document.querySelector('.pass-output').innerHTML = '';

    }
}

function checkEmail(passInput) {

    let eml = '@gmail.com';
    
    if (passInput.value == '') {
        emailOutput.innerHTML =
        'this input is empty'

    } else if (passInput.value.match(eml)) {
        emailOutput.innerHTML =
        'please remove @gmail.com'
    }

    else {
        emailOutput.innerHTML = '';

    }
}