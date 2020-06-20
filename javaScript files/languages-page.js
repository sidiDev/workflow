// Get nav item to put user name in it
let navItem = document.querySelector('.navbar .nav-item');

// Get user info from localstorage
let getUserInfo = localStorage.getItem('userInfo');

// If User info not equal null put user name in nav item
if (getUserInfo) {
    
    let jsonToObj = JSON.parse(getUserInfo);
    navItem.textContent = `Logged in as ${jsonToObj.name}`;
}

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

// create empty array to put in it languages and levels
let langLevelArray = [];

// Get ADD button
let addButton = document.querySelector('.add-button button');

let counter = -1 ;

// When click add button add language and level in lang-speaker container
addButton.onclick = () => {

    counter++;

    if (dropdownTitle.textContent != 'Languages' && dropdownTitlelevel.textContent != 'Lang level') {

        let langSpeakerItems = document.querySelectorAll('.lang-speaker');
        if (langSpeakerItems.length == 3) {

            addBtn.remove();
            langsDetails.innerHTML +=
            `
            <div class="lang-speaker bg-light p-2 text-dark rounded" style="background: #F1F1F1;">
                <button class="close float-left outline-none" dataset="${counter}" style="margin: -8px 0; outline: none">&times;</button>
                <span class="ml-2">${dropdownTitle.textContent}</span> - <span class="ml-1">${ dropdownTitlelevel.textContent}</span>
            </div>
            `
            let deleteBtn = document.querySelectorAll('.lang-speaker button');

            deleteKeyWord(deleteBtn,langLevelArray);

        } else {

            langsDetails.innerHTML +=
            `
            <div class="lang-speaker bg-light p-2 text-dark rounded" style="background: #F1F1F1;">
                <button class="close float-left outline-none" dataset="${counter}" style="margin: -8px 0; outline: none">&times;</button>
                <span class="ml-2">${dropdownTitle.textContent}</span> - <span class="ml-1">${ dropdownTitlelevel.textContent}</span>
            </div>
            `
            langLevelArray.push(`${dropdownTitle.textContent} - ${ dropdownTitlelevel.textContent}`);
            let deleteBtn = document.querySelectorAll('.lang-speaker button');

            deleteKeyWord(deleteBtn,langLevelArray);
        }
    }

    checkLangsDetails()
}

// Get next button
let nextBtn = document.querySelectorAll('.expertise-footer button')

//When click on next check if langsDetails contain items if it's contain save languages in local storage
function checkLangsDetails() {

    nextBtn[1].onclick = () => {

        if (langsDetails.innerHTML != '') {

            localStorage.setItem('languages',JSON.stringify(langLevelArray));
            window.location = 'profile-photo-page.html';

        } else {

            document.querySelector('.show-modal').click();
        }
    }

}

checkLangsDetails()

// when click button close of keyword delete keyword 
function deleteKeyWord(keyword,langsLevelArray) {
    
    for (let i = 0; i < keyword.length; i++) {

        keyword[i].onclick = function() {

            let getKeywordNum = this.getAttribute('dataset');
            
            this.parentElement.remove();
            let langsLeveDeleted = delete langsLevelArray[getKeywordNum];
            langLevelArray.push(langsLeveDeleted);
            console.log(getKeywordNum)
        }
    }
}