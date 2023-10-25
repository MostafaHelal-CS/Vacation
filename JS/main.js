// Start Setting Box
// Select The Setting-icon element
let setIcon=document.querySelector(".setting-icon");

setIcon.addEventListener('click', function () {
    // Select setting-box Element
    let setContent=document.querySelector(".setting-box");
    setContent.classList.toggle("open");
});

let setContent=document.querySelector(".setting-box");

// Close the settingBox From ESC KEYBOARD ELEMENT
document.onkeydown=function (e) {
    if(e.keyCode==27) {
        setContent.classList.remove("open");
    }
};


// Start Setting Options
// [1] Color option
// Select All li
let ColorLis=document.querySelectorAll(".color-list li");

ColorLis.forEach((li) => {
    li.addEventListener("click", function (e) {
        // Loop TO remove active class from all li
        ColorLis.forEach((li) => {
            li.classList.remove("active");
        });
        // Add main color to the root element
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Add Active class to li that clicked
        e.target.classList.add("active");
        // Store color in local storage
        window.localStorage.setItem("color", e.target.dataset.color);
    });
});

if(window.localStorage.getItem("color")!==null) {
    // Set Color in the local storage
    console.log(window.localStorage.getItem("color"));
    // Aadd main color to root element
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem("color"));

    // remove Active class from all lis
    ColorLis.forEach((li) => {
        li.classList.remove("active");
    });

    // Add Active class to li that clicked
    document.querySelector(`[data-color="${window.localStorage.getItem("color")}"`).classList.add("active");
}
// End Color Options


// [2] Start Random Bg
// Set varible to control the starting or stop randomBackground function
let randomBgOption=true;
// Select All Buttons
let randomBgButtons=document.querySelectorAll(".bg-option button");

// Loop On Buttons
randomBgButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        // Remove active class from all buttons
        randomBgButtons.forEach((button) => {
            button.classList.remove("active");
        });
        // Add active class to clicked button
        e.target.classList.add("active");

        if(e.target.dataset.bg=='yes') {
            // Set randomBgOption to be true
            randomBgOption=true;

            // Call randomBackground function
            randomBackground();

            // Store Backgoround in local storage
            window.localStorage.setItem("randomBg", true);
        } else {

            // Set randomBgOption to be false
            randomBgOption=false;

            // Clear randomBackground function
            clearInterval(randomBgHandler);

            // Store Backgoround in local storage
            window.localStorage.setItem("randomBg", false);

        }
    });
});

// Check if any bg exist in local storage
if(window.localStorage.getItem("randomBg")!=null) {

    document.querySelectorAll(".bg-option button").forEach((button) => {
        button.classList.remove("active");
    });

    console.log(typeof (window.localStorage.getItem("randomBg"))); // Return string
    if(window.localStorage.getItem("randomBg")=='true') {
        randomBgOption=true;
    } else {
        randomBgOption=false;
    }

    if(window.localStorage.getItem("randomBg")=='yes') {
        document.querySelector(".bg-option .yes").classList.add("active");
    } else {
        document.querySelector(".bg-option .no").classList.add("active");
    }
}
// End Random Bg

// [3] Start Bullets Status
// Select All bullet buttons
let bulletSButton=document.querySelectorAll(".bullets-stats button");

// Select nav-bullets element
let navBullets=document.querySelector(".nav-billets");
// Make loop on the all bullets button
bulletSButton.forEach((bullet) => {
    bullet.addEventListener(('click'), function (e) {
        // Remove active class from all button
        bulletSButton.forEach(bullet => {
            bullet.classList.remove("active");
        });
        console.log(e.target.dataset.display);

        // Add active class to the button clicked
        bullet.classList.add("active");

        if(e.target.dataset.display=="block") {
            navBullets.style.display="block";

            // Store the value in the local storage
            window.localStorage.setItem("bullet-status", e.target.dataset.display);
        } else {
            navBullets.style.display="none";

            // Store the value in the local storage
            window.localStorage.setItem("bullet-status", e.target.dataset.display);
        }
    });

});


// window.localStorage.clear();
// Check if there's a bullet status in the localStorage
if(window.localStorage.getItem("bullet-status")!==null) {
    // Remove Active class from all
    bulletSButton.forEach(bullet => {
        bullet.classList.remove("active");
    });
    if(window.localStorage.getItem("bullet-status")=="block") {
        navBullets.style.display="block";

        // Add active class to the clicked button
        document.querySelector(".bullets-stats .yes").classList.add("active");
    } else {
        navBullets.style.display="none";

        // Add active class to the clicked button
        document.querySelector(".bullets-stats .no").classList.add("active");
    }

}


// [4] Start Reset Option

document.querySelector(".reset").onclick=function () {
    // Remove all Local Storage Items

    // window.localStorage.clear();
    // Or
    window.localStorage.removeItem("color");
    window.localStorage.removeItem("randomBg");
    window.localStorage.removeItem("bullet-status");

    // Reload Page
    window.location.reload();
};
// End Setting Box


//start Change Background image
// Select landing page Element
let landing=document.querySelector(".landing-area");

// Array Of Background Image
let arrayBgImage=['images/landing-bg1.jpg', 'images/landing-bg3.jpg', 'images/landing-bg5.jpg', 'images/landing-bg6.jpg', 'images/landing-bg8.jpg', 'images/landing-bg9.jpg'];

// Set Variable to handler setInterval function
let randomBgHandler;
function randomBackground () {
    if(randomBgOption===true) {
        randomBgHandler=setInterval(() => {
            // Get random background image number
            let randomBgNumber=Math.floor(Math.random()*arrayBgImage.length);

            // Get random background image URL
            let randomBgUrl=arrayBgImage[randomBgNumber];

            landing.style.backgroundImage=`url(${randomBgUrl})`;
        }, 1000);
    } else {
        clearInterval(randomBgHandler);
    }
}
randomBackground();

//End Change Background image

// Start popup gallery
// Gallery Popup(Full Screen Overlay)
// Select Gallery-images
let galleryImg=document.querySelectorAll(".gallery-image img");

// Select imageOverlay from html
let overlay=document.querySelector(".imageOverlay");

// Select newImage element from html
let newImage=document.querySelector("#newImage");

// Select CloseBtn
let close=document.querySelector(".closeBtn");
close.onclick=function (e) {
    overlay.style.display="none";
};

// Select caption element
let caption=document.querySelector(".caption");
// Loop on all images
galleryImg.forEach((img) => {
    img.addEventListener("click", function (e) {
        newImage.src=e.target.src;
        newImage.alt=e.target.alt;
        caption.innerHTML=newImage.alt;
        overlay.style.display="flex";
    });
});


// Start Nav-bullets
// Select all bullets
let allBullets=document.querySelectorAll(".nav-billets .bullet");

allBullets.forEach((bullet) => {
    bullet.addEventListener("click", function (e) {
        if(e.target.dataset.link==="About") {
            document.querySelector("#About").scrollIntoView({
                behavior: 'smooth'
            });
        } else if(e.target.dataset.link==="Skills") {
            document.querySelector("#Skills").scrollIntoView({
                behavior: "smooth"
            });
        } else if(e.target.dataset.link==="Gallery") {
            document.querySelector("#Gallery").scrollIntoView({
                behavior: 'smooth'
            });
        } else if(e.target.dataset.link==="Timeline") {
            document.querySelector("#Timeline").scrollIntoView({
                behavior: 'smooth'
            });
        } else if(e.target.dataset.link==="Features") {
            document.querySelector("#Features").scrollIntoView({
                behavior: 'smooth'
            });
        } else if(e.target.dataset.link==="#Contact") {
            document.querySelector("#Contact").scrollIntoView({
                behavior: 'smooth'
            });
        }

        // OR [BOTH AS THE SAME]
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });

    });
});


// Start nav menu

// Select menu button icon 
let menuBtn=document.querySelector(".menu-icon");

// Select Menu links
let menuLinks=document.querySelector(".links");


menuBtn.onclick=function (e) {
    menuLinks.classList.toggle("open-menu");

    // Stop menuBtn Propagation
    e.stopPropagation();
};

// Close menu Links When CLick Anywhere expect [nav-links container and menu button]
document.addEventListener("click", function (e) {
    if(e.target!==menuBtn&&e.target!==menuLinks) {

        // Check if the menu Links contains open class or not
        if(menuLinks.classList.contains("open-menu")) {
            // Remove open-menu class from the menuLinks
            menuLinks.classList.remove("open-menu");

            // OR Close MenuLinks BY clicking ESC Button From Keyboard
            document.onkeydown=function (e) {
                if(e.keyCode===27) {
                    menuLinks.classList.remove("open-menu");
                }
            };
        }
    }
});

// Stop menuLinks Propagation
menuLinks.onclick=function (e) {
    e.stopPropagation();
};

// Start Scroll TO Top Button
// Select Scroll TO Top Button Element
let theScrollTop=document.querySelector(".scrollTop");

document.addEventListener("scroll", function () {
    if(window.scrollY>=1100) {
        theScrollTop.style.display="block";
    } else {
        theScrollTop.style.display="none";
    }
});

theScrollTop.onclick=function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};