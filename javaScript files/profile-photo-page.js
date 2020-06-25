// Create object to put image url inside it
var imageUrl;

// Get input of uplode element
let inputUd = document.querySelector('.profile-photo-preview input');

// Get profile preview element
let photoPreview = document.querySelector('.profile-photo-preview img');

// When upload a image show it in photoPreview element
inputUd.onchange = function() {

    let files = this.files[0];
    let fileReader = new FileReader();

    if (files.name.includes('jpg') || files.name.includes('png') || files.name.includes('jpeg')) {

        if (files) {

            fileReader.addEventListener('load', function() {
    
                photoPreview.src = this.result;
                imageUrl = `${this.result}`;
            })
    
            fileReader.readAsDataURL(files)

            document.querySelector('.note').textContent = '';
            checkProfilePhoto()
        }

    } else {

        document.querySelector('.note').textContent = 'Please upload image'
    }
}

// Get next button
let nextBtn = document.querySelectorAll('.profile-photo-footer button');

// When click next button if profile photo is exist transfer user to next page
function checkProfilePhoto() {

    nextBtn[1].onclick = () => {

        if (imageUrl != '') {
            location = 'dashboard-page.html';
            localStorage.setItem('imageUrl',imageUrl);

        } else {

            document.querySelector('.show-modal').click();
        }
    }
}
checkProfilePhoto()

// When click back button transfer user to back page
nextBtn[0].onclick = function() {
    window.location = 'user-description-page.html';
}