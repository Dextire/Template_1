/*Local storage*/
// Colors
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty(`--main-color`, mainColor);
    document.querySelectorAll(".colors li").forEach(function (e) {
        e.classList.remove("active");
        if (e.dataset.color === mainColor) {
            e.classList.add("active");
        }
    });
}

//Background
let backgroundOn;
let backgroundInterval;
let backgroundItem = localStorage.getItem("background_option");
if (backgroundItem !== null) {
    if (backgroundItem === "true") {
        backgroundOn = true;
    } else {
        backgroundOn = false;
    }
}
document.querySelectorAll(".option-box span").forEach(function (e) {
    e.classList.remove("active");
})
if (backgroundItem === "true") {
    document.querySelector(".yes").classList.add("active");
} else {
    document.querySelector(".no").classList.add("active");
}

/*Start settings box*/
let Gear = document.querySelector(".Spinning .fa-gear");
Gear.onclick = function () {
    this.classList.toggle("fa-spin");
    let settingsBox = document.querySelector(".settings-box");
    settingsBox.classList.toggle("open");
}

//Colors
let colorsList = document.querySelectorAll(".colors li")

colorsList.forEach(function (li) {
    li.addEventListener("click", function (e) {
        document.documentElement.style.setProperty(`--main-color`, e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(function (e) {
            e.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

//Random background
let backgroundOption = document.querySelectorAll(".option-box span");
backgroundOption.forEach(function (e) {
    e.addEventListener("click", function (e) {
        e.target.parentElement.querySelectorAll(".active").forEach(function (e) {
            e.classList.remove("active");
        })
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            backgroundOn = true;
            randomizeBackground();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOn = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    })
})

/*Select landing page element*/
let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

function randomizeBackground() {
    if (backgroundOn === true) {
        backgroundInterval = setInterval(function () {
            let randomNum = Math.floor(Math.random() * imgsArray.length);

            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';

        }, 10000);
    }
}
randomizeBackground();

/*Start our skills*/
let Skills = document.querySelector(".skills");
window.onscroll = function () {
    let SkillsTop = Skills.offsetTop;
    let SkillsHeight = Skills.offsetHeight;
    let WindowHeight = this.innerHeight;
    let WindowScrollTop = this.pageYOffset;

    if (WindowScrollTop > (SkillsTop + SkillsHeight - WindowHeight - 100)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(function (skill) {
            skill.style.width = skill.dataset.progress;
        })
    }
}

/*Start gallery*/
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach(function (img) {
    img.addEventListener("click", function (event) {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);

        closeButton.addEventListener("click", function (event) {
            event.target.parentElement.remove();
            overlay.remove();
        })
    })
})

/*Toggle menu*/
let Button = document.querySelector(".toggle-menu");
let Links = document.querySelector(".links");
Button.onclick = function () {
    this.classList.toggle("menu-active");
    Links.classList.toggle("open");
}

/*Up button*/
let goUp = document.querySelector(".up");
goUp.onclick = function () {
    window.scrollTo(0, 0);
}