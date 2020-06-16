// Get nav links
let navLinks = document.querySelectorAll('.nav-links ul li a');

// Loop on nav links
for (let i = 0; i < navLinks.length -1; i++) {

    // When click on nav link scroll
    navLinks[i].onclick = function () {

        let getNavLinkDataSet = this.getAttribute('dataset');

        document.getElementById(getNavLinkDataSet).scrollIntoView({behavior: 'smooth'})
    }
}

// Get navbar
let navbar = document.querySelector('nav');

// When window scroll > 20 add class in navbar
window.onscroll = function() {

    if (this.scrollY > 100) {
        navbar.classList.add('fixed-nav')

    } else {
        navbar.classList.remove('fixed-nav')
    }
}

//Get menu button
let munBtn = document.querySelector('.menu-btn');

// Get navbar links
let navContainer = document.querySelector('.navbar-container')
let navContainer_2 = document.querySelector('.nav-container')

function openClose() {
    navContainer.classList.toggle('open-close-nav');
    navContainer_2.classList.toggle('open-close-nav');    
}