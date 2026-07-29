import { changePage } from "../pages/pages-manager.js"
import { checkBattleStatus } from "../game/savingBattle.js"

const menu = document.querySelector('.header__menu')
const playerName = document.querySelector('.header__player-name')

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

	updatePlayerName()
}

export function updatePlayerName() {
	const currentUser = localStorage.getItem('currentUser')
	if (currentUser) {
		const playerData = JSON.parse(localStorage.getItem(currentUser))
		if (playerData) {
			playerName.textContent = playerData.name
		} else {
			localStorage.removeItem('currentUser')
			playerName.textContent = ''
		}
	} else {
		playerName.textContent = ''
	}
}

export function hideHeader() {
	menu.classList.add('displayNone')
	playerName.classList.add('displayNone')
}

export function showHeader() {
	updatePlayerName()
	playerName.classList.remove('displayNone')
	menu.classList.remove('displayNone')
}