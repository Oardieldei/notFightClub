import { changePage } from "./pages-manager.js"
import { checkBattleStatus } from "../game/savingBattle.js"

export function renderPlayerSelectPage() {
	return createPlayerSelectWrapper()
}

function createPlayerSelectWrapper() {
	const page = document.createElement('div')
	page.classList.add('player-select-page')

	page.append(createPlayerSelectContent())

	return page
}

function createPlayerSelectContent() {
	const content = document.createElement('div')
	content.classList.add('player-select-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createPlayersList(),
		createSelectButton()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('player-select-page__title')
	title.textContent = 'Выбор игрока'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('player-select-page__description')
	description.textContent = 'Выберите сохраненного игрока для продолжения'

	return description
}

function createPlayersList() {
	const list = document.createElement('div')
	list.classList.add('player-select-page__list')

	const players = getPlayers()

	if (!players.length) {
		list.append(createEmptyMessage())
		return list
	}

	players.forEach(player => {
		list.append(createPlayerItem(player))
	})

	return list
}

function createPlayerItem(player) {
	const item = document.createElement('button')
	item.classList.add('player-select-page__item')

	item.dataset.id = player.id

	const name = document.createElement('span')
	name.classList.add('player-select-page__item-name')
	name.textContent = player.data.name

	const icon = document.createElement('span')
	icon.classList.add('player-select-page__item-icon')
	icon.textContent = '⚔'

	item.append(
		name,
		icon
	)

	item.addEventListener('click', () => {
		document
			.querySelectorAll('.player-select-page__item_active')
			.forEach(element => {
				element.classList.remove('player-select-page__item_active')
			})

		item.classList.add('player-select-page__item_active')

		const button = document.querySelector('.player-select-page__button')
		button.disabled = false
		button.dataset.id = player.id
	})

	return item
}

function createEmptyMessage() {
	const message = document.createElement('div')
	message.classList.add('player-select-page__empty')
	message.textContent = 'Сохраненных игроков пока нет'

	return message
}

function createSelectButton() {
	const button = document.createElement('button')

	button.classList.add('player-select-page__button')
	button.textContent = 'Выбрать игрока'
	button.disabled = true

	button.addEventListener('click', () => {
		const playerID = button.dataset.id

		if (!playerID) return

		openPlayer(playerID)
	})

	return button
}

function getPlayers() {
	const players = []

	for (let key in localStorage) {
		if (!key.startsWith('user_')) continue

		const data = JSON.parse(localStorage.getItem(key))

		players.push({
			id: key.replace('user_', ''),
			data
		})
	}

	return players.sort((a, b) => {
		return Number(a.id) - Number(b.id)
	})
}

function openPlayer(id) {
	localStorage.setItem('currentUser', `user_${id}`)

	if (checkBattleStatus()) {
		changePage('arena-fight')
		return
	}

	changePage('characters-list')
}