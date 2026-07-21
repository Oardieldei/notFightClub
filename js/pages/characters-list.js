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

	player.characters.forEach(character => {
		list.append(createCharacterCard(character))
	})

	return list
}

function createCharacterCard(character) {
	const card = document.createElement('div')
	card.classList.add('character-card')

	if (character.isActive) {
		card.classList.add('character-card_active')
	}

	card.append(
		createCharacterImage(character),
		createCharacterInfo(character),
		createCharacterActions()
	)

	return card
}

function createCharacterImage(character) {
	const image = document.createElement('img')
	image.classList.add('character-card__image')

	image.src = character.imageUrl || './img/no-image.png'
	image.alt = character.name

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

	const win = document.createElement('span')
	win.classList.add('character-card__win')
	win.textContent = `Победы: ${character.arena.win}%`

	const lose = document.createElement('span')
	lose.classList.add('character-card__lose')
	lose.textContent = `Поражения: ${character.arena.lose}%`

	stats.append(win, lose)

	return stats
}

function createCharacterActions() {
	const actions = document.createElement('div')
	actions.classList.add('character-card__actions')

	actions.append(
		createButton('Выбрать', 'character-card__button_active'),
		createButton('Переименовать'),
		createButton('Удалить', 'character-card__button_delete')
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
	button.classList.add('characters-page__button')
	button.textContent = 'Создать персонажа'

	wrapper.append(button)

	return wrapper
}