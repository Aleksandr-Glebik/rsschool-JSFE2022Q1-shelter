const btnBurger = document.querySelector('.btn-burger')
const navMenu = document.querySelector('.nav-menu')
const useBurger = document.querySelector('.burger > use')
const navMenuList = document.querySelector('.nav-menu__list')
const navMenuLink = document.querySelectorAll('.nav-menu__link')
const iconBurger = document.querySelector('.burger')
const bodyPages = document.querySelector('body')
const blackWindow = document.querySelector('.black-window')
const sliderContainerItems = document.querySelector('.slider')
const sectionPets = document.querySelector('.pets-content')

let screenWidth = getScreenWidth()

function getScreenWidth() {
    return screen.width
}

getScreenWidth()

if (screenWidth < 768) {
    btnBurger.addEventListener('click', toggleOpenCloseMenu)
    blackWindow.addEventListener('click', toggleOpenCloseMenu)

    navMenuList.addEventListener('click', function(event) {
        let tagName = event.target.tagName.toLowerCase()
        if (tagName === 'a') {
            toggleOpenCloseMenu()
        }
    })
} else if (screenWidth > 768) {
    btnBurger.removeEventListener('click', toggleOpenCloseMenu)
    blackWindow.removeEventListener('click', toggleOpenCloseMenu)
}

sliderContainerItems.addEventListener('click', searchItem)

function toggleOpenCloseMenu() {
    if (navMenu.classList.contains('openMenu')) {
        navMenu.classList.add('closeMenu')
        navMenu.classList.remove('openMenu')
        iconBurger.classList.add('closeBurger')
        iconBurger.classList.remove('openBurger')
        bodyPages.style.overflow = ''
        blackWindow.classList.remove('active')
    } else {
        navMenu.classList.add('openMenu')
        navMenu.classList.remove('closeMenu')
        iconBurger.classList.add('openBurger')
        iconBurger.classList.remove('closeBurger')
        bodyPages.style.overflow = 'hidden'
        blackWindow.classList.add('active')
    }
}

function changeClassActive(event) {
    if (event.target.classList.contains('nav-menu__link')) {
        navMenuLink.forEach(el => {
            el.classList.remove('active')
        })
        event.target.classList.add('active')
    }
}

function searchItem(event) {
    let item = event.target

    if (item.classList.contains('slider-item') ) {
        for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].classList.contains('slider-item__title')) {
                getCartFromArr(item.children[i].textContent)
            }
        }
    } else if (item.parentNode.classList.contains('slider-item')) {
        for (let i = 0; i < item.parentNode.children.length; i++) {
            if (item.parentNode.children[i].classList.contains('slider-item__title')) {
                getCartFromArr(item.parentNode.children[i].textContent)
            }
        }
    }
}

async function getCartFromArr(text) {

    const source = '../../assets/pets.json';
    const res3 = await fetch(source);
    const data3 = await res3.json();

    data3.find((el) => {
        if (el.name === text) {
            // console.log('el', el);
            createModalElement(el)
        }
    })
}

function createModalElement(el) {
    bodyPages.style.overflow = 'hidden'

    let element = `
    <div class="modal">
        <div class="modal-window"></div>
        <div class="modal-container">
            <img src="${el.img}" alt="photo" class="modal-container__img">
            <div class="modal-container__content">
                <h3 class="modal-container__content-title">${el.name}</h3>
                <p class="modal-container__content-subtitle">${el.type} - ${el.breed}</p>
                <p class="modal-container__content-text">${el.description}</p>
                <ul class="modal-container__content-list">
                    <li class="modal-container__content-list-el"><span><strong>Age:</strong> ${el.age}</span></li>
                    <li class="modal-container__content-list-el"><span><strong>Inoculations:</strong>: ${el.inoculations}</span></li>
                    <li class="modal-container__content-list-el"><span><strong>Diseases:</strong> ${el.diseases}</span></li>
                    <li class="modal-container__content-list-el"><span><strong>Parasites:</strong> ${el.parasites}</span></li>
                </ul>
            </div>
            <button class="btn btn-circle btn-slider btn-slider__cross">
            <svg class="cross">
                <use xlink:href="../../assets/icons/sprite.svg#cross"></use>
            </svg>
            </button>
        </div>
    </div>
    `
    sectionPets.insertAdjacentHTML('afterend', element);

    workWithModalWindow()
}

function workWithModalWindow() {
    const modalDiv = document.querySelector('.modal')
    const modalWindow = document.querySelector('.modal-window')
    const closeBtn = document.querySelector('.btn-slider__cross')

    modalDiv.addEventListener('click', closeModalWindow)

    function closeModalWindow(event) {
        let targetEl = event.target

        if (targetEl === modalWindow || targetEl === closeBtn) {
            modalDiv.style.display = 'none';
            bodyPages.style.overflow = ''
        }
    }
}
