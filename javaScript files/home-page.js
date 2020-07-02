// Get navbar links
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

// Get menu bar element and button
let menuBarBtn = document.querySelector('.navbar-options-container .menu-btn')
let menuBar = document.querySelector('nav .navbar-options-container');

menuBarBtn.onclick = function() {

    this.classList.toggle('menuBarBtn')
    menuBar.classList.toggle('menuBar')
}

// Get Profile photo element and imageUrl from local storage
let imageUrl = document.querySelector('.profile-photo')
let getImageUrl = localStorage.getItem('imageUrl');

// If getImageUrl if exist add image link in imageUrl
if (getImageUrl) {

    imageUrl.src = getImageUrl;
}

// Get active container elements
let activeContainer = document.querySelectorAll('.active-container');

for (let i = 0; i < activeContainer.length; i++) {

    activeContainer[i].onclick = function() {

        this.children[0].classList.toggle('active');
        this.classList.toggle('container-active')
    }
}

// Get dropdown menu items
let dropdownItems = document.querySelectorAll('.dropdown-menu li');

for (let i = 0; i < dropdownItems.length; i++) {

    dropdownItems[i].onclick = function() {
        
        this.parentElement.parentElement.children[0].textContent = this.textContent;
    }
}

function searchFunc() {

// Get services available element
let servicesAvailable = document.querySelector('.services-available');

// Get search input element
let searchInput = document.querySelector('.search-input');

// Get search button element
let searchBtn = document.querySelector('.search-button')

// Get projects titles elements
let projectsTitles = document.querySelectorAll('.project-title');

// Get all products element
let productsItems = document.querySelectorAll('.projects .project-container');

servicesAvailable.innerHTML = `${projectsTitles.length} Services available`;
getProjects = JSON.parse(getProjects);
let searchBar = document.querySelector('.search-bar');

    searchBtn.onclick = () => {

        searchBar.classList.remove('d-none');
        searchBar.childNodes[1].classList.add('moving-bar');
        navContainer.classList.remove('open-close-nav');
        navContainer_2.classList.remove('open-close-nav');  

        setTimeout(function() {

        searchBar.classList.add('d-none')
        searchBar.childNodes[1].classList.remove('moving-bar')
    
        if (searchInput.value.length > 2) {

            let numOfSeviceAl = [];
            projectsContainer.innerHTML = '';
            servicesAvailable.innerHTML = `0 No services available`;
            document.querySelector('footer').classList.add('d-none')            
    
            let searchValue = searchInput.value.toLowerCase();
            
            for (let i = 0; i < getProjects.length; i++) {
                
                let title = getProjects[i].title;
                let productsImg = getProjects[i].img;
                let prizing = getProjects[i].prizing;
                let price = getProjects[i].price;
                let startImg = getProjects[i].startImg;

                if (title.includes(searchValue) == true) {

                    document.querySelector('footer').classList.remove('d-none')                    
                    numOfSeviceAl.push(i);
                    projectsContainer.innerHTML += `
                    <div class="project-container">
                    <img src="${productsImg}">
                    <div class="project-details">
                        <span class="project-title d-block" style="height: 50px;">${title}</span>
                        <div class="price-details mt-2 d-flex justify-content-between" style="border-top: 2px solid #f1f1f1;padding:5px">
                        <span class="d-block" style="font-weight: 500">${price}</span>
                        <div>
                        <img src="${startImg}" style="width:18px;height:18px;margin-top:-7px">
                        <span class="d-inline" style="color:#ffc201">${prizing}</span>
                        <span class="d-inline">(50)</span>
                    </div>                     
                    </div>
                </div>
            </div>
                    `;
                    servicesAvailable.innerHTML = `${numOfSeviceAl.length} Services available`;
                }
            }
        }

        },2000)
    }
    
}

// Get user projects form local storage
var getUserProjects = localStorage.getItem('projectDetails')

// Get user projects container
let projectsContainer = document.querySelector('.projects');

// Check if Project is exist from local storage if it's exist add in projectsContainer
if (getUserProjects) {

    getUserProjects = JSON.parse(getUserProjects);

    for(let i = 0; i < getUserProjects.length; i++) {

        let projectTitle = getUserProjects[i].title;
        var projectTitleEdited = projectTitle.slice(0,60);
        projectTitleEdited += '...'
        
        projectsContainer.innerHTML += `
        <div class="project-container">
                <img src="${getUserProjects[i].imgUrl}">
                <div class="project-details">
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

    }

}

var getProjects = localStorage.getItem('projectsDetails');

let projectArray = [];

if (getProjects == null) {

    getProjects = JSON.parse(getProjects);

    let productsItems = document.querySelectorAll('.projects .project-container');
    
    for (let i = 0; i < productsItems.length; i++) {

        let img = productsItems[i].childNodes[1].src;
        let title = productsItems[i].childNodes[3].childNodes[1].textContent;
        let price = productsItems[i].childNodes[3].childNodes[3].childNodes[1].textContent;
        let startImg = productsItems[i].childNodes[3].childNodes[3].childNodes[3].childNodes[1].src;
        let prizing = productsItems[i].childNodes[3].childNodes[3].childNodes[3].childNodes[5].textContent;

        let productObj = {
            img: img,
            title: title,
            price: price,
            startImg: startImg,
            prizing: prizing
        };

        projectArray.push(productObj)

        localStorage.setItem('projectsDetails',JSON.stringify(projectArray));
    }
}

searchFunc()

// Get projects titles elements
let projectsTitles = document.querySelectorAll('.project-title');

for (let i = 0; i < projectsTitles.length; i++) {

    if (projectsTitles[i].textContent.length > 60) {

        let ptsTitles = projectsTitles[i].textContent.slice(0,55);
        
        projectsTitles[i].textContent = ptsTitles;
        projectsTitles[i].textContent += '...'

    }
}