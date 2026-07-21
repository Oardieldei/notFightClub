import { changePage } from "../pages/pages-manager.js"

const menu = document.querySelector('.header__menu')

export function addHeaderActions() {
	const exitButton = document.querySelector('.header__button_exit')
	exitButton.addEventListener('click', () => {
		changePage('main')
	})

	const charactersButton = document.querySelector('.header__button_characters')
	charactersButton.addEventListener('click', () => {
		changePage('characters-list')
	})
}

export function hideHeader() {
	menu.classList.add('displayNone')
}

export function showHeader() {
	menu.classList.remove('displayNone')
}