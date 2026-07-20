import { changePage } from "../pages/pages-manager.js"

export function addHeaderActions() {
	const exitButton = document.querySelector('.header__button_exit')
	exitButton.addEventListener('click', () => {
		changePage('main')
	})
}