'use strict';

// * генерує масив
let folders1 = new Folders(5);

// * створює списки з масиву
const navigation = new Navigation(folders1.folders);

// **
// * обробляє клік по елементам дерева, викликає відповідну функцію
// * @param - event
document.querySelector('.main').onclick = (event) => {
    switch(event.target.classList[0]) {
        case 'list__status':
            navigation.openSubmenu(event);
            break;
        case 'list__name':
            navigation.showPopup(event);
            break;
        case 'popup__close':
            navigation.closePopup(event);
            break;
    }
}

// **
// * обробляє натискання клавіатури, викликає відповідну функцію
// * @param - event
document.querySelector('.main').onkeydown = (event) => {
    switch(event.keyCode) {
        case 13:
            navigation.showPopup(event);
            break;
        case 27:
            navigation.closePopup();
            break;
        case 32:
            event.preventDefault();
            navigation.openSubmenu(event);
            break;
        case 38:
            event.preventDefault();
            navigation.prevFocus();
            break;
        case 40:
            event.preventDefault();
            navigation.nextFocus();
            break;
    }
}

// **
// * обробляє прокрутку колесом мишки, викликає відповідну функцію
// * @param - event
document.querySelector('.main').onwheel = (event) => {
    event.preventDefault();
    event.deltaY > 0 ? navigation.nextFocus() : navigation.prevFocus();
}
