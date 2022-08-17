const btnBurger = document.querySelector('.btn-burger')
const navMenu = document.querySelector('.nav-menu')
const useBurger = document.querySelector('.burger > use')
const navMenuList = document.querySelector('.nav-menu__list')
const navMenuLink = document.querySelectorAll('.nav-menu__link')
const iconBurger = document.querySelector('.burger')
const bodyPages = document.querySelector('body')
const blackWindow = document.querySelector('.black-window')
const sliderContainerItems = document.querySelector('.slider-items')
const btnSliderRight = document.querySelector('.btn-slider__right')
const btnSliderLeft = document.querySelector('.btn-slider__left')
const sectionPets = document.querySelector('.pets-content')

let screenWidth = getScreenWidth()

function getScreenWidth() {
    return screen.width
}

getScreenWidth()

if (screenWidth < 768) {
    console.log('screenWidth', screenWidth);
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

let divider = setDivider(screenWidth)

function setDivider(screenWidth) {
    if (screenWidth === 1280 || screenWidth > 1280) {
        return 3
    } else if (screenWidth < 1280 && screenWidth > 768 || screenWidth === 768) {
        return 2
    } else if (screenWidth < 767 && screenWidth > 320 || screenWidth === 320) {
        return 1
    }
}

setDivider()

async function getInformation() {
    const inform = '../../assets/pets.json';
    const res = await fetch(inform);
    const data = await res.json();

    displayFirstElementsInSlider(data, divider)
}

getInformation()

function displayFirstElementsInSlider(arr, num) {
    let newArr = arr.concat()
    iterateElementsInArr(newArr.slice(0, num))
}

function iterateElementsInArr(arr) {
    arr.forEach((el) => {
        createItems(el)
    })
}

function createItems(el) {
    const div = document.createElement('div')
    div.classList.add('slider-item')
    const img = document.createElement('img')
    img.classList.add('slider-item__img')
    img.src = el.img
    img.alt = el.name
    const h3 = document.createElement('h3')
    h3.classList.add('slider-item__title')
    h3.textContent = el.name
    const button = `<button class="btn btn-rect btn-white">Learn more</button>`
    div.append(img)
    div.append(h3)
    div.insertAdjacentHTML('beforeend', button)

    addElementsInSliderContainer(div)
}

function addElementsInSliderContainer(div) {
    sliderContainerItems.append(div)
}

window.addEventListener('resize', changeDivider)

function changeDivider() {
    let newWidth = screen.width
    let newDivider = setDivider(newWidth)

    if (divider !== newDivider) {
        document.location.reload()
    }
}

btnSliderLeft.addEventListener('click', changeIndexDown)
btnSliderRight.addEventListener('click', changeIndexUp)

let counterClickBtnLeftOrRight = 0

function changeIndexUp() {
    counterClickBtnLeftOrRight++
    let ind = Math.abs(counterClickBtnLeftOrRight)
    let mult = divider
    if (mult === 1) {
        getInformForChangeEl(mult, ind)
    } else if (mult === 2) {
        getInformForChangeEl(mult, ind)
    } else if (mult === 3) {
        getInformForChangeEl(mult, ind)
    }
}

function changeIndexDown() {
    counterClickBtnLeftOrRight--
    let ind = Math.abs(counterClickBtnLeftOrRight)
    let mult = divider
    if (mult === 1) {
        getInformForChangeEl(mult, ind)
    } else if (mult === 2) {
        getInformForChangeEl(mult, ind)
    } else if (mult === 3) {
        getInformForChangeEl(mult, ind)
    }
}

async function getInformForChangeEl(num, counter) {
    const inf = '../../assets/pets.json';
    const res2 = await fetch(inf);
    const data2 = await res2.json();

    transformArrData(data2, num, counter)
}

function transformArrData(arr, num, counter) {
    if (num === 1) {
        if (counter < arr.length) {
            showNewItem(arr[num * counter])
        } else if (counter === arr.length || counter > arr.length) {
            counterClickBtnLeftOrRight = 0
            showNewItem(arr[0])
        } else if (counter < 0) {
            showNewItem(arr[(arr.length - 1)])
        }
    } else if (num === 2) {
        if (counter === 0) {
            showNewItems(arr.slice(0, 2))
        } else if (counter === 1) {
            showNewItems(arr.slice(2, 4))
        } else if (counter === 2) {
            showNewItems(arr.slice(4, 6))
        } else if (counter === 3) {
            showNewItems(arr.slice(6, arr.length))
        } else if (counter === 4) {
            counterClickBtnLeftOrRight = 0
            showNewItems(arr.slice(0, 2))
        }
    } else if (num === 3) {
        if (counter === 0) {
            showNewItems(arr.slice(0, 3))
        } else if (counter === 1) {
            showNewItems(arr.slice(3, 6))
        } else if (counter === 2) {
            showNewItems(arr.slice(4, 6).concat(arr[0]))
        } else if (counter === 3) {
            counterClickBtnLeftOrRight = 0
            showNewItems(arr.slice(0, 3))
        }
    }
}

function showNewItem(item) {
    sliderContainerItems.innerHTML = ''
    createItems(item)
}

function showNewItems(item) {
    sliderContainerItems.innerHTML = ''
    iterateElementsInArr(item)
}

function searchItem(event) {
    let item = event.target

    if (item.classList.contains('slider-item') ) {
        for (let i = 0; i < item.childNodes.length; i++) {
            if (item.childNodes[i].classList.contains('slider-item__title')) {
                getCartFromArr(item.childNodes[i].textContent)
            }
        }
    } else if (item.parentNode.classList.contains('slider-item')) {
        for (let i = 0; i < item.parentNode.childNodes.length; i++) {
            if (item.parentNode.childNodes[i].classList.contains('slider-item__title')) {
                getCartFromArr(item.parentNode.childNodes[i].textContent)
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


