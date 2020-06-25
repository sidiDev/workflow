let navContainer = document.querySelector('.navbar-container')
let navContainer_2 = document.querySelector('.nav-container')

// Get navbar
let navbar = document.querySelector('nav');

// When window scroll > 20 add class in navbar
window.onscroll = function() {
    navContainer.classList.remove('open-close-nav');
    navContainer_2.classList.remove('open-close-nav'); 

    if (this.scrollY > 100) {
        navbar.classList.add('fixed-nav');
        navbar.classList.add('shadow');

    } else {
        navbar.classList.remove('fixed-nav');
        navbar.classList.remove('shadow');
    }
}

function openClose() {
    navContainer.classList.toggle('open-close-nav');
    navContainer_2.classList.toggle('open-close-nav');    
}

// close the navbar when close outside it
document.addEventListener('click', function(e) {

    if (
        e.target.closest('.menu-btn') || e.target.closest('.navbar-container') ||
        e.target.closest('.nav-container') || e.target.closest('nav')
) return;

    navContainer.classList.remove('open-close-nav');
    navContainer_2.classList.remove('open-close-nav');
})

// Get user name element and form local storage
let userName = document.querySelector('.user-name');
var getUserName = localStorage.getItem('userInfo');

// Get user title element and form local storage 
let userTitle = document.querySelector('.user-title-span');
var getUserTitleDesc = localStorage.getItem('UserDesc');

// Get user description
let userDescription = document.querySelector('.user-description');

if (getUserName && getUserTitleDesc) {

    getUserName = JSON.parse(getUserName);
    getUserTitleDesc = JSON.parse(getUserTitleDesc);
    
    userName.textContent = getUserName.name;
    userTitle.innerHTML = getUserTitleDesc.title;
    userDescription.textContent = getUserTitleDesc.description;
}

// Get user languages from local storag and user languages container element
var getUserLangs = localStorage.getItem('languages');
let UserLangsContainer = document.querySelector('.languages-container');

if (getUserLangs) {

    getUserLangs = JSON.parse(getUserLangs);

        for (let i = 0; i < getUserLangs.length; i++) {

            UserLangsContainer.innerHTML += `
            <div class="user-langauge overflow-hidden border d-inline-block p-2 rounded ml-2 mt-1 position-relative"style="cursor:pointer;transform:translateY(1em)">
                <span>${getUserLangs[i]}</span>
                <div class="delete-lang d-inline text-center">
                    <img src="icons/delete.png" style="width:15px;height:15px;cursor:pointer;transform:translate(4px,5px)">
                </div>                                                
            </div>
            `
        }

    // Get all box of user languages
    let userLangsBox = document.querySelectorAll('.user-langauge');

    // When user mouse on userLangsBox show delete and edit button and when leave hide it
    userLangsBox.forEach(el => {
    
        el.onmouseenter = function() {
        this.childNodes[3].classList.add('show-lang')
        }
        el.onmouseleave = function() {
        this.childNodes[3].classList.remove('show-lang')
        }
    })

}


// Get user languages from local storag and user languages container element
var getUserSkills = localStorage.getItem('userExpertise');
let UserSkillsContainer = document.querySelector('.skills-container');

// Get Profile photo element and imageUrl from local storage
let imageUrl = document.querySelectorAll('.profile-photo')
let getImageUrl = localStorage.getItem('imageUrl');

if (getUserSkills && getImageUrl) {

    getUserSkills = JSON.parse(getUserSkills);
    imageUrl[0].src = getImageUrl;
    imageUrl[1].src = getImageUrl;

    if (getUserSkills.length > 4) {

        for (let i = 0; i < 4; i++) {

            UserSkillsContainer.innerHTML += `
            <div class="skill bg-light d-inline-block p-2 ml-2 mt-1 border overflow-hidden"style="cursor:pointer;transform:translateY(1em); border-radius:20px">
                  <span>${getUserSkills[i]}</span>
                 <div class="d-inline delete text-center">
                    <img src="icons/delete.png" style="width:15px;height:15px;cursor:pointer; transform:translate(4px,5px)">
                </div>                                                
            </div>
            `
        }

    } else {

        for (let i = 0; i < getUserSkills.length; i++) {

            UserSkillsContainer.innerHTML += `
            <div class="skill bg-light d-inline-block p-2 ml-2 mt-1 border overflow-hidden"style="cursor:pointer;transform:translateY(1em); border-radius:20px">
                  <span>${getUserSkills[i]}</span>
                 <div class="d-inline delete text-center">
                    <img src="icons/delete.png" style="width:15px;height:15px;cursor:pointer; transform:translate(4px,5px)">
                </div>                                                
            </div>
            `
        }
    }

    // Get all box of user skills
    let userSkillBox = document.querySelectorAll('.skills-container .skill')

    // When user mouse on userSkillBox show delete and edit button and when leave hide it
    userSkillBox.forEach(el => {
    
        el.onmouseenter = function() {
            this.childNodes[3].classList.add('show');
        }
        el.onmouseleave = function() {
        this.childNodes[3].classList.remove('show')
        }
    });

}

// Get edit title element
let editTile = document.querySelector('.edit-title');

// Get edit title form
let editTileForm = document.querySelector('.edit-title-form');

let editTitleObj = {
    titleFormBtn: editTileForm.childNodes[3],
    titleFormInput: editTileForm.childNodes[1]
}

let {titleFormBtn:titleFormBtn,titleFormInput:titleFormInput} = editTitleObj;

// Get edit description element
let editDesc = document.querySelector('.desc-edit img');

// Get edit description form
let editDescForm = document.querySelector('.edit-desc-form');

let editDescObj = {
    descFormBtn: editDescForm.childNodes[3],
    descFormInput: editDescForm.childNodes[1]
}

let {descFormBtn:descFormBtn,descFormInput:descFormInput} = editDescObj;

editTile.onclick = () => {
    
    editTileForm.classList.toggle('d-none')
    editDescForm.classList.add('d-none')

    titleFormBtn.children[1].onclick = () => {
            
        if (titleFormInput.value.length > 4) {

            editTileForm.classList.toggle('d-none')
            userTitle.innerHTML = titleFormInput.value;
            getUserTitleDesc.title = titleFormInput.value;
            localStorage.setItem('UserDesc',JSON.stringify(getUserTitleDesc));
            titleFormInput.value = '';
        }
    }

    titleFormBtn.children[0].onclick = _ => {
        editTileForm.classList.toggle('d-none')
        titleFormInput.value = '';
    }
}

editDesc.onclick = () => {
    
    editDescForm.classList.toggle('d-none');
    editTileForm.classList.add('d-none')

    descFormBtn.children[1].onclick = () => {
            
        if (descFormInput.value.length >= 20 && descFormInput.value.length <= 100) {

            editDescForm.classList.toggle('d-none')
            userDescription.innerHTML = `
            ${descFormInput.value}
            `;
            getUserTitleDesc.description = descFormInput.value;
            localStorage.setItem('UserDesc',JSON.stringify(getUserTitleDesc));
            descFormInput.value = ''
        }
    }

    descFormBtn.children[0].onclick = _ => {
        editDescForm.classList.toggle('d-none')
        descFormInput.value = '';
    }
}

// Get delete button of user languages box
let DeleteLang = document.querySelectorAll('.delete-lang img');

// create empty array to put in it languages and levels
var langLevelArray = localStorage.getItem('languages');
langLevelArray = JSON.parse(langLevelArray)

DeleteLang.forEach((el,indx) => {

    // When click on el delete the item form HTML and local storage
    el.onclick = function() {
        
        this.parentElement.parentElement.remove();
        delete getUserLangs[indx];
        delete langLevelArray[indx]
        getUserLangs = getUserLangs.filter((item) => {
            return item != null;
        })
        langLevelArray = langLevelArray.filter((item) => {
            return item != null;
        })
        localStorage.setItem('languages', JSON.stringify(getUserLangs));
        checkLangsLength()
    }
})

// Get delete button of user languages box
let DeleteSkill = document.querySelectorAll('.delete');

DeleteSkill.forEach((el,indx) => {

    // When click on el delete the item form HTML and local storage
    el.onclick = function() {
        
        this.parentElement.remove();
        delete getUserSkills[indx];
        getUserSkills = getUserSkills.filter((item) => {
            return item != null;
        })
        localStorage.setItem('userExpertise', JSON.stringify(getUserSkills));
        checkSkillsLength()
    }
})

// Get languages adding module
let addLangsModule = document.querySelector('.expertise');

// Get add lang button
let addLang = document.querySelector('.add-lang');
// Check if user languages < 4 show add new lang button else hide it
function checkLangsLength() {

    if (getUserLangs.length < 4) {

        addLang.classList.remove('remove-add-lang')

    } else {
        addLang.classList.add('remove-add-lang')
    }

    // When click addLang button show languages adding module
    addLang.onclick = () => addLangsModule.classList.remove('d-none')
}
checkLangsLength()

// Get add skill button
let addSkill = document.querySelector('.add-skill')
// Check if user skills < 4 show add new lang button else hide it
function checkSkillsLength() {

    if (getUserSkills.length < 4) {

        addSkill.classList.remove('remove-add-skill')

    } else {
        addSkill.classList.add('remove-add-skill')
    }
}
checkSkillsLength()

// List of language in array
let langsList = [
    'English','Spanish','Mandarin Chinese','Sanskritised','Bengali',
    'Portuguese','Russian','Japanese','Western Punjabi','Marathi','Turkish',
    'Korean','French','German','Vietnamese','Tamil','Javanese','Italian',
    'Egyptian Arabic','Arabic','Somali','Rundi','Czech','Zulu','Bavarian',
    'Greek','Malay','Cebuano','Khmer'
]

// Get dropdown menu container
let dropdownMenu = document.querySelector('.dropdown-menu-container')

// Add the languages in dropdown menu
for (let i = 0; i < langsList.length; i++) {
    
    dropdownMenu.innerHTML += 
    `
    <li class="dropdown-item inline-item" style="cursor: pointer;">${langsList[i]}</li>
    `
}

// Get input search of languages
let searchInput = document.querySelector('.dropdown-menu input');

// Get dropdown title
let dropdownTitle = document.querySelector('.dropdownMenuButton');

// Get dropdown title
let dropdownTitlelevel = document.querySelector('.langLevel');

//Get dropdown menu items
let dropdownItems = document.querySelectorAll('.dropdown-menu-container li');

//Get dropdown menu items Level
let dropdownItemsLevel = document.querySelectorAll('.dropdown-menu-level li');

// Get ADD button element
let addBtn = document.querySelector('.add-button');

// Get lang level element
let langLevel = document.querySelector('.lang-level');

// When click on item of dropdown add it in dropdown title

for (let i = 0; i < dropdownItems.length; i++) {

    dropdownItems[i].onclick = function() {
        
        dropdownTitle.textContent = this.textContent;
        searchInput.value = '';
        langLevel.classList.remove('hide-dropdown')
    }
}

// When click on item of dropdown add it in dropdown title

for (let i = 0; i < dropdownItemsLevel.length; i++) {

    dropdownItemsLevel[i].onclick = function() {
        
        dropdownTitlelevel.textContent = this.textContent;
        addBtn.classList.remove('hide-add-btn')
    }
}

// Get elements of languages
let langsEl = document.querySelectorAll('.dropdown-menu-container li');

//when user write in search input show the nearest word from his search
searchInput.oninput = function() {

    let keyword = document.querySelector('.keyword');
    let search = this.value;
    search = search.toLocaleLowerCase();
    
    for (let i = 0; i < langsEl.length; i++) {

        let text = langsEl[i].textContent.toLocaleLowerCase()
        
        if (search != '') {

            if (text.indexOf(search) > -1) {

                keyword.classList.remove('keyword-item')
                keyword.textContent = langsEl[i].textContent;
                keyword.onclick = function() {
    
                    dropdownTitle.textContent = this.textContent;
                    langLevel.classList.remove('hide-dropdown')
                    keyword.textContent = '';
                    keyword.classList.add('keyword-item')
                    searchInput.value = '';
                }
            }

        } else {

            keyword.classList.add('keyword-item')
            keyword.textContent = '';
        }
    }
}

// Get langs-details div
let langsDetails = document.querySelector('.langs-details')

// Get ADD button
let addButton = document.querySelector('.add-button button');

// When click add button add language and level in lang-speaker container

addButton.onclick = () => {
    
    let userLangsItems = document.querySelectorAll('.user-langauge')

    if (dropdownTitle.textContent != 'Languages' && dropdownTitlelevel.textContent != 'Lang level') {

        let langSpeakerItems = document.querySelectorAll('.lang-speaker');

        if (langLevelArray.length < 4) {

            langsDetails.innerHTML +=
            `
            <div class="lang-speaker bg-light p-2 text-dark rounded" style="background: #F1F1F1;">
                <button class="close float-left outline-none" style="margin: -8px 0; outline: none">&times;</button>
                <span class="ml-2">${dropdownTitle.textContent}</span> - <span class="ml-1">${ dropdownTitlelevel.textContent}</span>
            </div>
            `;
            langLevelArray.push(`${dropdownTitle.textContent} - ${ dropdownTitlelevel.textContent}`);

            let deleteBtn = document.querySelectorAll('.lang-speaker button');

            deleteKeyWord(deleteBtn,langLevelArray);

        }
    }

    let langs = langLevelArray.filter((items) => {
        return items != null;
    })

    checkLangsDetails(langs)
}

// Get next button
let saveCancelBtn = document.querySelectorAll('.expertise-footer button')

//When click on next check if langsDetails contain items if it's contain save languages in local storage
function checkLangsDetails(langLevarr) {

    saveCancelBtn[1].onclick = () => {

        if (langsDetails.childElementCount >= 1) {

            localStorage.setItem('languages',JSON.stringify(langLevarr));
            
            for (let i = 0; i < langLevarr.length; i++) {

                UserLangsContainer.innerHTML += `
                <div class="user-langauge overflow-hidden border d-inline-block p-2 rounded ml-2 mt-1 position-relative"style="cursor:pointer;transform:translateY(1em)">
                    <span>${langLevarr[i]}</span>
                    <div class="delete-lang d-inline text-center">
                        <img src="icons/delete.png" style="width:15px;height:15px;cursor:pointer;transform:translate(4px,5px)">
                    </div>                                                
                </div>
                `

                location.reload()
            }

        }
    }

}

checkLangsDetails()

// when click button close of keyword delete keyword 
function deleteKeyWord(keyword,langsLevelArray) {

    keyword.forEach((item,index) => {

        item.onclick = function() {
            
            this.parentElement.remove();
            delete langsLevelArray[index];
            let langs = langsLevelArray.filter((items) => {
                return items != null;
            })
            
            checkLangsDetails(langs);
        }
    })
}

// When click back button transfer user to back page
saveCancelBtn[0].onclick = () => addLangsModule.classList.add('d-none');

let expertiseSkills = document.querySelector('.expertise-skills');
addSkill.onclick = () => expertiseSkills.classList.remove('d-none')

let categories = {
    'Web, Mobile & Software Dev': ['Desktop Software','Game Development','Software Development','Mobile Development','Web Development','Product management'],
    'Design & Motion graphic': ['Web designer','Mobile Designer','Game Designer','Logo Designer','Video Editor','Motion Designer']
}

// Get dropdown title
let dropdownTitle2 = document.querySelector('.dropdownMenuButton2');

//Get dropdown menu items
let dropdownItems2 = document.querySelectorAll('.dropdown-menu2 li'); 

// When click on item of dropdown add it in dropdown title

for (let i = 0; i < dropdownItems2.length; i++) {

    dropdownItems2[i].onclick = function() {
        
        dropdownTitle2.textContent = this.textContent;
        showCategories(this.textContent);
    }
}

// Get category container
let categoryContainer = document.querySelector('.category-container .options-work-container')

function showCategories(category) {

    categoryContainer.textContent = '';

    categories[category].forEach((items,itemsIndex) => {

        document.querySelector('.category-details').innerHTML =
        `
            <p style="font-weight: 500">What type of ${category} do you do ?</p>
            <p style="color: #555">Select 4 types of work.</p>
        `

        categoryContainer.innerHTML +=
        `
            <div class="option-work form-check">
                <input type="checkbox" id="checkbox${itemsIndex + 1}">
                <label for="checkbox${itemsIndex + 1}" style="cursor: pointer;">${items}</label>
            </div>
        `

       let checkboxs = document.querySelectorAll('.option-work input');
       theCheckedInArray(checkboxs)
    })
};

// Get next button
let nextBtn = document.querySelectorAll('.expertise-footer button');


/* this function check if one or more checkbox is checked
   if it's checked save type of work in local storage else show message
*/
function theCheckedInArray(getCheckboxs) {

    nextBtn[3].onclick = function () {
        
        for (let i = 0; i < getCheckboxs.length; i++) {

            if (getCheckboxs[i].checked) {

                let checked = getCheckboxs[i].parentElement.childNodes[3].textContent;
                getUserSkills.push(checked)

                if (getUserSkills.length > 4) {

                } else {
                    localStorage.setItem('userExpertise',JSON.stringify(getUserSkills));
                    location.reload()
                }
            }

        }

    }
}


// Get user Expertise from local Storage
let getUserExpertise = localStorage.getItem('userExpertise');

/* When click on next button if getUserExpertise is equal null show message
   else go to next step
*/
function nextStep() {

    nextBtn[3].onclick = function() {

        console.log(workType)
    }
}

nextBtn[2].onclick = () => expertiseSkills.classList.add('d-none');


// Create object to put image url inside it
var imgUrl;

// Get input of uplode element
let inputUd = document.getElementById('profilePhotoUd');

// Get profile preview element
let photoPreview = document.querySelectorAll('.profile-photo');

// When upload a image show it in photoPreview element
inputUd.onchange = function() {

    let files = this.files[0];
    let fileReader = new FileReader();

    if (files.name.includes('jpg') || files.name.includes('png') || files.name.includes('jpeg')) {

        if (files) {

            fileReader.addEventListener('load', function() {
    
                photoPreview[0].src = this.result;
                photoPreview[1].src = this.result;
                imgUrl = `${this.result}`;
                localStorage.setItem('imageUrl',this.result)
            })
    
            fileReader.readAsDataURL(files)

        }

    }
}

// this array will be contain projects titles
let titlesArray = [];

document.querySelector('.add-project').onclick = () => document.querySelector('.user-desc').classList.remove('d-none');
// This array will conatin projects info
var projectInfoArray = localStorage.getItem('projectDetails');
// Get input upload of project
let uplodeImgProject = document.getElementById('ProductImage');

// Get image project preview
let imagePreview = document.querySelector('.image-preview');

// this function for upload project image 
function uploadImage() {

    uplodeImgProject.onchange = function () {

        let imgFiles = this.files[0];
        let fileReader = new FileReader();
    
        if (imgFiles.name.includes('png') || imgFiles.name.includes('jpg') || imgFiles.name.includes('jpeg')) {
    
            fileReader.addEventListener('load',function() {
                imagePreview.innerHTML = 
                `<img src="${this.result}" width="100%" height="200px">
                `
                document.querySelector('.upload-img-note').textContent = '';
                document.querySelector('.label-container').classList.add('d-none');
            })

            fileReader.readAsDataURL(imgFiles);
        }
    }    
}
uploadImage()
// Get augment price value element of project
let augBtn = document.querySelector('.augment');

// Get dimin price value element of project
let diminBtn = document.querySelector('.dimine');

// Get price value output
let priceValueOutput = document.querySelector('.price-value')

// create counter
var priceValue = 5;

// this function for augment and dimin price value
function priceValueFunc() {

    augBtn.onclick = () => {

        priceValue++;
        priceValueOutput.textContent = priceValue;

        if (Number(priceValueOutput.textContent) > 5) {
            
            diminBtn.classList.add('show-dimin-btn');
            diminBtn.onclick = function() {

                priceValueOutput.textContent = priceValue;

                if (priceValue == 5) {

                    this.classList.remove('show-dimin-btn')
                    priceValue = 5;

                } else {

                    priceValue--;
                }
            }
            
        }
    }
}
priceValueFunc()

// Get input title
let inputTitle = document.querySelector('.title-input');

// Get add project button
let addProjectBtn = document.querySelector('.add-project-btn');

addProjectBtn.onclick = () => {

    let projectInfo = {
        title: null,
        price: null,
        imgUrl: null
    }

    if (imagePreview.childElementCount == 1 && inputTitle.value.length > 10) {

        projectInfoArray = JSON.parse(projectInfoArray || '[]');
        projectInfo.imgUrl = imagePreview.children[0].getAttribute('src');
        projectInfo.title = inputTitle.value;
        projectInfo.price = priceValueOutput.textContent;

        projectInfoArray.push(projectInfo);
        localStorage.setItem('projectDetails',JSON.stringify(projectInfoArray));
        document.querySelector('.user-desc').classList.add('d-none')
        inputTitle.value = '';
        priceValue = 5;
        priceValueOutput.textContent = priceValue
        diminBtn.classList.remove('show-dimin-btn');
        location.reload()
        deleteProject()

    }  else if (imagePreview.childElementCount == 0) {
        document.querySelector('.upload-img-note').textContent = 'Please upload an image'
    } else {

        document.querySelector('.upload-img-note').textContent = '';

    }
    checkTitle()
}

function checkTitle() {

    if (inputTitle.value.length < 10) {

        document.querySelector('.input-note').textContent = 'The input must conatin at least 10 chars or more';
 
    } else {
        document.querySelector('.input-note').textContent = ''
    }
}

document.querySelector('.cancel-btn').onclick = () => {

    document.querySelector('.user-desc').classList.add('d-none');
    inputTitle.value = '';
    priceValue = 5;
    priceValueOutput.textContent = priceValue;
    diminBtn.classList.remove('show-dimin-btn')

    if (imagePreview.childElementCount == 1) {

        imagePreview.childNodes[1].remove();
    }
}

// Get user projects form local storage
var getUserProjects = localStorage.getItem('projectDetails')

// Get user projects container
let projectsContainer = document.querySelector('.user-projects');

// Check if Project is exist from local storage if it's exist add in projectsContainer
if (getUserProjects) {

    getUserProjects = JSON.parse(getUserProjects);

    for(let i = 0; i < getUserProjects.length; i++) {

        let projectTitle = getUserProjects[i].title;
        var projectTitleEdited = projectTitle.slice(0,60);
        projectTitleEdited += '...'
        
        projectsContainer.innerHTML += `
        <div class="user-project-container">
                <img src="${getUserProjects[i].imgUrl}">
                <span class="delete-product-btn position-absolute text-center bg-white rounded-circle text-danger">&times</span>
                <div class="user-project-details">
                    <span class="project-title d-block" style="height: 50px;">${projectTitleEdited}</span>
                    <div class="price-details mt-2 d-flex justify-content-between" style="border-top: 2px solid #f1f1f1;padding:5px">
                    <span class="d-block" style="font-weight: 500">Price: $${getUserProjects[i].price}</span>
                    <div>
                   <img src="icons/star.png" style="width:18px;height:18px;margin-top:-7px">
                    <span class="d-inline" style="color:#ffc201">0</span>
                    <span class="d-inline">(0)</span>
                </div>                     
                </div>
            </div>
        </div>
        `
        deleteProject()
    }
}

function deleteProject() {

        // Get delete project button
    let deleteProject = document.querySelectorAll('.delete-product-btn');

    deleteProject.forEach((el,index) => {

        el.onclick = function() {

            this.parentElement.remove();
            delete getUserProjects[index];
            getUserProjects = getUserProjects.filter(item => {
                return item != null;
            });

            localStorage.setItem('projectDetails',JSON.stringify(getUserProjects))
        }
    })
}