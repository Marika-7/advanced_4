'use strict';

// * class Navigation - дерево каталогів
class Navigation {
	// **
	// * constructor
	// * @param folders - масив об'єктів і підмасивів
	// * focusArray - масив елементів для фокусу
	constructor(folders) {
		this.folders = folders;
		this.focusArray = [];
		this.showList();
	}
	// **
	// * відображає на сторінці масив у вигляді дерева каталогів
	showList() {
		let nav = document.querySelector('.navigation');
		nav.append(this.createList(this.folders));
		nav.firstElementChild.classList.remove('hide');
		this.setFocus();
	}
	// **
	// * створює з об'єктів масиву список <ul>, якщо зустрічає підмасив - рекурсія і задає елементам відповідні класи (submenu, hide)
	// * @param array - масив об'єктів і підмасивів
	// * @return - <ul>
	createList(array) {
		let ul = document.createElement('ul');
		for(let i = 0; i < array.length; i++) {
			if(Array.isArray(array[i])) {
				ul.lastElementChild.append(this.createList(array[i]));
				ul.lastElementChild.classList.add('submenu');
			}
			else {
				ul.append(this.createLi(array[i]));
			}
		}
		ul.classList.add('list', 'hide');
		return ul;
	}
	// **
	// * створює елемент списку <li>, додає 3 <span> з відповідними класами і атрибутами
	// * @param obj - об'єкт з полями name, url
	// * @return - <li>
	createLi(obj) {
		let li = document.createElement('li');
		li.classList.add('list__item');
		let span1 = document.createElement('span');
		let span2 = document.createElement('span');
		let span3 = document.createElement('span');
		span1.classList.add('list__status');
		span2.classList.add('list__icon');
		span3.classList.add('list__name');
		span3.textContent = obj.name;
		span3.setAttribute('value', `${obj.url}`);
		span3.setAttribute('tabindex', '0');
		li.append(span1);
		li.append(span2);
		li.append(span3);
		return li;
	}
	// **
	// * показує/приховує вкладений список
	// *@param - event
	openSubmenu(event) {
		if(event.target.parentElement.classList.contains('submenu')) {
			event.target.parentElement.classList.toggle('open');
			event.target.parentElement.lastElementChild.classList.toggle('hide');
			if(event.target.parentElement.classList.contains('open')) {
				event.target.parentElement.children[3].firstElementChild.children[2].focus();
			}
			else {
				event.target.parentElement.children[2].focus();
			}
		}
		this.getFocusableElements();
	}
	// **
	// * заповнює попап даними і показує його
	// *@param - event
	showPopup(event) {
		let popup = document.querySelector('.popup');
		popup.style.top = `${event.target.getBoundingClientRect().top}px`;
		popup.style.left = `${event.target.getBoundingClientRect().right + 50}px`;
		popup.classList.remove('hide');
		document.querySelector('.popup__name').textContent = event.target.textContent;
		document.querySelector('.popup__link').textContent = event.target.getAttribute('value');
	}
	// **
	// * закриває попап
	closePopup() {
		document.querySelector('.popup').classList.add('hide');
	}
	// **
	// * ставить фокус на перший елемент
	setFocus() {
		this.getFocusableElements();
		this.focusArray[0].focus();
	}
	// **
	// * знаходить елемент з фокусом
	// * @return - індекс елемента
	getFocus() {
		for(let i = 0; i < this.focusArray.length; i++) {
			if(this.focusArray[i] == document.activeElement) {
				return i;
			}
		}
		return -1;
	}
	// **
	// * створює масив елементів доступних для фокусу
	getFocusableElements() {
		let array = document.querySelectorAll('.list__name');
		this.focusArray = [];
		for(let i = 0; i < array.length; i++) {
			if(!array[i].parentElement.parentElement.classList.contains('hide')) {
				this.focusArray.push(array[i]);
			}
		}
	}
	// **
	// * передає фокус наступному елементу
	nextFocus() {
		this.getFocusableElements();
		let focus = this.getFocus();
		if(focus === this.focusArray.length - 1 || focus === -1) {
			return;
		}
		this.focusArray[(focus + 1)].focus();
	}
	// **
	// * передає фокус попередньому елементу
	prevFocus() {
		this.getFocusableElements();
		let focus = this.getFocus();
		if(focus === 0 || focus === -1) {
			return;
		}
		this.focusArray[focus - 1].focus();
	}
}
