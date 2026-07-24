import { changePage } from "./pages-manager.js"
import { noImage } from "../data/noImage.js"

export function renderCharactersPage() {
	return createCharactersWrapper()
}

function createCharactersWrapper() {
	const page = document.createElement('div')
	page.classList.add('characters-page')

	page.append(createCharactersContent())

	return page
}

function createCharactersContent() {
	const content = document.createElement('div')
	content.classList.add('characters-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createCharactersList(),
		createCreateButton()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('characters-page__title')
	title.textContent = 'Персонажи'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('characters-page__description')
	description.textContent = 'Выберите героя, который отправится на арену'

	return description
}

function getCurrentPlayer() {
	const currentUser = localStorage.getItem('currentUser')

	if (!currentUser) return null

	return JSON.parse(localStorage.getItem(currentUser))
}

function createCharactersList() {
	const list = document.createElement('div')
	list.classList.add('characters-list')

	const player = getCurrentPlayer()

	if (!player || !player.characters.length) {
		list.append(createEmptyState())
		return list
	}

	player.characters.forEach((character, index) => {
		list.append(createCharacterCard(character, index))
	})

	return list
}

function createCharacterCard(character, index) {
	const card = document.createElement('div')
	card.classList.add('character-card')

	if (character.isActive) {
		card.classList.add('character-card_active')
	}

	card.append(
		createCharacterImage(character),
		createCharacterInfo(character),
		createCharacterActions(character, index)
	)

	return card
}

function createCharacterImage(character) {
	const image = document.createElement('img')
	image.classList.add('character-card__image')

	image.src = character.imageUrl || noImage
	image.alt = character.name
	image.onerror = () => {
		image.src = noImage
	}

	return image
}

function createCharacterInfo(character) {
	const info = document.createElement('div')
	info.classList.add('character-card__info')

	info.append(
		createCharacterName(character),
		createCharacterStats(character)
	)

	return info
}

function createCharacterName(character) {
	const name = document.createElement('h2')
	name.classList.add('character-card__name')
	name.textContent = character.name

	return name
}

function createCharacterStats(character) {
	const stats = document.createElement('div')
	stats.classList.add('character-card__stats')

	const total = character.arena.win + character.arena.lose
	const winPercent = total ? Math.round(character.arena.win / total * 100) : 0
	const losePercent = total ? Math.round(character.arena.lose / total * 100) : 0

	const win = document.createElement('span')
	win.classList.add('character-card__win')
	win.textContent = `Победы: ${winPercent}%`

	const lose = document.createElement('span')
	lose.classList.add('character-card__lose')
	lose.textContent = `Поражения: ${losePercent}%`

	stats.append(win, lose)

	return stats
}

function createCharacterActions(character, index) {
	const actions = document.createElement('div')
	actions.classList.add('character-card__actions')

	let selectButton
	if (character.isActive) {
		selectButton = createButton('На арене', 'character-card__button_arena')
	} else {
		selectButton = createButton('Выбрать', 'character-card__button_active')
		selectButton.addEventListener('click', () => selectCharacter(index))
	}

	const editButton = createButton('Редактировать')
	editButton.addEventListener('click', () => {
		localStorage.setItem('editingCharacterIndex', index)
		changePage('edit-character')
	})

	const deleteButton = createButton('Удалить', 'character-card__button_delete')
	deleteButton.addEventListener('click', () => deleteCharacter(index))

	actions.append(
		selectButton,
		editButton,
		deleteButton
	)

	return actions
}

function createButton(text, className = '') {
	const button = document.createElement('button')
	button.classList.add('character-card__button')

	if (className) {
		button.classList.add(className)
	}

	button.textContent = text

	return button
}

function selectCharacter(index) {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return

	const player = JSON.parse(localStorage.getItem(currentUser))
	if (!player || !player.characters[index]) return

	player.characters.forEach((character, i) => {
		character.isActive = i === index
	})

	localStorage.setItem(currentUser, JSON.stringify(player))
	changePage('characters-list')
}

function deleteCharacter(index) {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return

	const player = JSON.parse(localStorage.getItem(currentUser))
	if (!player || !player.characters[index]) return

	const confirmed = confirm(`Удалить персонажа "${player.characters[index].name}"?`)
	if (!confirmed) return

	player.characters.splice(index, 1)

	const hasActive = player.characters.some(character => character.isActive)
	if (!hasActive && player.characters.length > 0) {
		player.characters[0].isActive = true
	}

	localStorage.setItem(currentUser, JSON.stringify(player))
	changePage('characters-list')
}

function createEmptyState() {
	const empty = document.createElement('div')
	empty.classList.add('characters-empty')

	const text = document.createElement('p')
	text.textContent = 'У вас пока нет персонажей'

	empty.append(text)

	return empty
}

function createCreateButton() {
	const wrapper = document.createElement('div')
	wrapper.classList.add('characters-page__actions')

	const button = document.createElement('button')
	button.classList.add('characters-page__button', 'btn-primary')
	button.textContent = 'Создать персонажа'

	button.addEventListener('click', () => {
		changePage('create-character')
	})

	wrapper.append(button)

	return wrapper
}