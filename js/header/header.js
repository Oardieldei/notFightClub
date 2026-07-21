import { changePage } from "../pages/pages-manager.js"

const menu = document.querySelector('.header__menu')

export function addHeaderActions() {
	const exitButton = document.querySelector('.header__button_exit')
	exitButton.addEventListener('click', () => {
		changePage('main')
	})
}

export function hideHedaer() {
	menu.classList.add('displayNone')
}

export function showHedaer() {
	menu.classList.remove('displayNone')
}