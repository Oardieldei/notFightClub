import { createBattle } from "../game/battleState.js"
import { getEnemyFighterInfo } from "../game/npcFighter.js"
import { getCurrentFighterInfo } from "../game/playerFighter.js"
import { changePage } from "./pages-manager.js"

export function renderArenaStartPage() {
	return createArenaStartWrapper()
}

function createArenaStartWrapper() {
	const arenaStartPage = document.createElement('div')
	arenaStartPage.classList.add('arena-start-page')
	arenaStartPage.append(createArenaStartContent())

	return arenaStartPage
}

function createArenaStartContent() {
	const content = document.createElement('div')
	content.classList.add('arena-start-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createActions()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('arena-start-page__title')
	title.textContent = 'Арена'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('arena-start-page__description')
	description.textContent = 'На арене ждут боя случайные противники. Это лучшее место, чтобы доказать свою силу в честном поединке.'

	return description
}

function createActions() {
	const actions = document.createElement('div')
	actions.classList.add('arena-start-page__actions')

	actions.append(createFindOpponentButton())

	return actions
}

function createFindOpponentButton() {
	const button = document.createElement('button')
	button.classList.add('btn', 'btn--primary')
	button.type = 'button'
	button.textContent = 'Подобрать противника'

	button.addEventListener('click', () => {
		startBattle()
	})

	return button
}

function startBattle() {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) {
		alert('Не выбран игрок!')
		return
	}

	const player = getCurrentFighterInfo()
	if (!player) {
		alert('Не выбран боец!')
		return
	}

	const enemy = getEnemyFighterInfo()

	createBattle(player, enemy)

	changePage('arena-fight')
}