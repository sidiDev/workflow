// create Object contain type of work for categories

let categories = {
    'Web, Mobile & Software Dev': ['Desktop Dev','Game Dev','Software Dev','Mobile Dev','Web Dev','Product management'],
    'Design & Motion graphic': ['Web designer','Mobile Designer','Game Designer','Logo Designer','Video Editor','Motion Designer']
}

// Get nav item to put user name in it
let navItem = document.querySelector('.navbar .nav-item');

// Get user info from localstorage
let getUserInfo = localStorage.getItem('userInfo');

// If User info not equal null put user name in nav item
if (getUserInfo) {
    
    let jsonToObj = JSON.parse(getUserInfo);
    navItem.textContent = `Logged in as ${jsonToObj.name}`;
}

// Get dropdown title
let dropdownTitle = document.querySelector('.dropdownMenuButton');

//Get dropdown menu items
let dropdownItems = document.querySelectorAll('.dropdown-menu li'); 

// When click on item of dropdown add it in dropdown title

for (let i = 0; i < dropdownItems.length; i++) {

    dropdownItems[i].onclick = function() {
        
        dropdownTitle.textContent = this.textContent;
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

// Create array to add type of work in it
let workType = [];

/* this function check if one or more checkbox is checked
   if it's checked save type of work in local storage else show message
*/
function theCheckedInArray(getCheckboxs) {

    nextBtn[1].onclick = function () {
        
        for (let i = 0; i < getCheckboxs.length; i++) {

            if (getCheckboxs[i].checked) {

                let checked = getCheckboxs[i].parentElement.childNodes[3].textContent;
                workType.push(checked)

                if (workType.length > 4) {
                    document.querySelector('.show-modal').click();

                } else {
                    localStorage.setItem('userExpertise',JSON.stringify(workType));
                    window.location = 'languages-page.html';    
                }
            }

        }

       // Get user Expertise from local Storage
        let getUserExpertise = localStorage.getItem('userExpertise');
        checkTheCheckBox(getUserExpertise)
    }
}

// When click on Next This function show message if localstorage is null
function checkTheCheckBox(userExpertise) {

    if (userExpertise == null) {
        
        document.querySelector('.show-modal').click();
    }
}

// Get user Expertise from local Storage
let getUserExpertise = localStorage.getItem('userExpertise');

/* When click on next button if getUserExpertise is equal null show message
   else go to next step
*/
function nextStep() {

    nextBtn[1].onclick = function() {

        if (getUserExpertise == null) {
            document.querySelector('.show-modal').click();
    
        } else {
            window.location = 'languages-page.html';
        }
    }
}
nextStep()

nextBtn[0].onclick = function() {
    window.location = 'form.html';
}