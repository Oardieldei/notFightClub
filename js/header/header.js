import { changePage } from "../pages/pages-manager.js"
import { checkBattleStatus } from "../game/savingBattle.js"

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

	const settingsButton = document.querySelector('.header__button_profile')
	settingsButton.addEventListener('click', () => {
		changePage('settings')
	})

	const arenaButton = document.querySelector('.header__button_arena')
	arenaButton.addEventListener('click', () => {
		if (checkBattleStatus()) {
			changePage('arena-fight')
		} else {
			changePage('arena-start')
		}
	})
}

export function hideHeader() {
	menu.classList.add('displayNone')
}

export function showHeader() {
	menu.classList.remove('displayNone')
}