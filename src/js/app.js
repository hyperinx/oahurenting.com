const initHamburgerLogic = () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active')
        if (hamburger.classList.contains('is-active')) {
            document.querySelector('.nav-menu').style.display = 'block'
        } else {
            document.querySelector('.nav-menu').style.display = 'none'
        }

    })
}

const initTitleAnimation = () => {
    const data = 'Welcome to Oahu'
    const title = document.querySelector('.title')
    let counter = 0;
    let interval = 0;
    const typeWriter = () => {
        interval = Math.floor(Math.random() * (250 - 50 + 1) + 50)
        title.innerHTML += data[counter]
        if (counter < data.length) {
            counter++;
        } else {
            counter = 0;
            title.innerHTML = '';
        }
        setTimeout(typeWriter, interval);
    }
    typeWriter();
}

const isElementVisible = (el) => {
    return el.getBoundingClientRect().top <= (window.innerHeight ||
        document.documentElement.clientHeight) &&
        el.getBoundingClientRect().top > -el.clientHeight;
}

const initPersistentAnimationOnScroll = () => {
    let overlay = document.querySelector('.video-overlay');
    let video = document.querySelector('.video-presentation');
    window.addEventListener('scroll', () => {
        let offset = overlay.getBoundingClientRect().top;
        overlay.style.opacity = Math.abs(offset) / 1500 + 0.3;

        if (isElementVisible(video)) {
            video.play();
            console.log('play');
        } else {
            video.pause();
            console.log('pause');
        }


    })
}

const initTriggeredAnimationOnScroll = () => {
    const scrollOffset = 100;
    const scrollElements = document.querySelectorAll(".js-scroll");
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - offset)
        );
    };
    const displayScrollElement = (el) => {
        el.classList.add('scrolled');
    }
    const hideScrollElement = (el) => {
        el.classList.remove('scrolled');
    }
    const handleScrollAnimation = () => {

        scrollElements.forEach((el) => {
            if (elementInView(el, scrollOffset)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    }
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    })
}
const initScrollEffects = () => {
    let barTimeout;
    document.body.onscroll = () => {
        if (barTimeout) {
            clearTimeout(barTimeout); //clear to reset
        }
        barTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 1000); //0.5s delay
        document.body.classList.add('scrolling');
    };
}
let timestamp = 0;
let mX = 0;
let speed = 0;
let currentSpeed = 0;
const getMouseSpeed = (e) => {
    let now = new Date();
    currentmX = e.screenX;

    let dt = now - timestamp;
    let distance = currentmX - mX;
    if (dt !== 0) {
        speed = Math.round(distance / dt * 2);
    }
    //console.log(speed);


    mX = currentmX;
    timestamp = now;
}

const initSlider = () => {
    let xDiff;
    let currentX;
    let photoDistance;
    let requestAnimationFrameId;
    let isDragging = false;
    const slider = document.querySelector('.slider');
    const movableContainerSlider = slider.querySelector('.slider__movable-container');
    const apartmentPhotos = movableContainerSlider.querySelectorAll('.slider__property');
    let offsetForCentering = -(movableContainerSlider.clientWidth - slider.clientWidth) / 2;
    let currentPositionX = offsetForCentering;
    movableContainerSlider.style.transform = `translateX(${offsetForCentering + 'px'})`;

    movableContainerSlider.addEventListener('mousedown', function (e) {
        e.preventDefault();
        currentSpeed = 0;
        speed = 0;
        currentX = e.clientX;
        xDiff = currentX - parseFloat(e.target.getBoundingClientRect().left);
        const removeRemoverOfEventListenerWtf = () => {
            e.target.removeEventListener('mousemove', move);
        }
        const move = (e2) => {
            isDragging = true;
            getMouseSpeed(e2);
            currentPositionX = e2.clientX - e.target.parentNode.getBoundingClientRect().left - xDiff;
            movableContainerSlider.style.transform = `translateX(${currentPositionX + 'px'})`;
        }
        e.target.addEventListener('mousemove', move);
        e.target.addEventListener('mouseup', () => {
            currentSpeed = speed;
            isDragging = false;
            //console.log(currentSpeed);
            removeRemoverOfEventListenerWtf();
            e.target.removeEventListener('mouseup', removeRemoverOfEventListenerWtf)
        });
    });

    const smoothAnim = () => {
        apartmentPhotos.forEach((photo, id) => {
            photoDistance = (slider.clientWidth / 2 - ((photo.getBoundingClientRect().left
                - slider.getBoundingClientRect().left) + photo.clientWidth / 2));

            //console.log(`id: ${id}, dist: ${photoDistance}`);
            //                2 1.5 1 1.5 2
            // photoDistance 100 50 0 50 100
            photo.style.transform = `rotateY(${photoDistance * -0.04}deg)`;
            photo.style.transform += `scale(${1 + -Math.abs(photoDistance) / 3000})`;
        });

        if (!isDragging) {
            movableContainerSlider.style.transform = `translateX(${currentPositionX + 'px'})`;
        }
        currentPositionX += currentSpeed;
        if (Math.abs(currentSpeed) > 0.001) {
            currentSpeed /= 1.01;
        } else {
            currentSpeed = 0;
        }
        //console.log(currentSpeed + ' currPosX: ' + currentPositionX);    
        requestAnimationFrame(smoothAnim)
    }
    requestAnimationFrame(smoothAnim);
}


document.addEventListener("DOMContentLoaded", function () {
    initHamburgerLogic();
    initTitleAnimation();
    initPersistentAnimationOnScroll();
    initTriggeredAnimationOnScroll();
    initScrollEffects();
    initSlider();
});
