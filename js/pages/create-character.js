import { changePage } from "./pages-manager.js"
import { characterImages } from "../data/characterImages.js"
import { noImage } from "../data/noImage.js"

export function renderCreateCharacterPage() {
	return createMainWrapper()
}

function createMainWrapper() {
	const page = document.createElement('div')
	page.classList.add('create-character-page')

	page.append(createContent())

	return page
}

function createContent() {
	const content = document.createElement('div')
	content.classList.add('create-character-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createImageSelection(),
		createNameInput(),
		createActions()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('create-character-page__title')
	title.textContent = 'Создание персонажа'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('create-character-page__description')
	description.textContent = 'Выберите героя и дайте ему имя перед первым сражением'

	return description
}

function createImageSelection() {
	const wrapper = document.createElement('div')
	wrapper.classList.add('create-character-page__selection')

	characterImages.forEach((image, index) => {
		const card = document.createElement('div')
		card.classList.add('create-character-page__card')

		const imageElement = document.createElement('img')
		imageElement.classList.add('create-character-page__image')
		imageElement.src = image
		imageElement.alt = `Персонаж ${index + 1}`
		imageElement.onerror = () => {
			imageElement.src = noImage
		}

		card.dataset.image = image

		card.addEventListener('click', () => {
			document
				.querySelectorAll('.create-character-page__card')
				.forEach(item => item.classList.remove('create-character-page__card_active'))

			card.classList.add('create-character-page__card_active')
		})

		card.append(imageElement)
		wrapper.append(card)
	})

	return wrapper
}

function createNameInput() {
	const input = document.createElement('input')

	input.classList.add('create-character-page__input')
	input.placeholder = 'Имя персонажа'
	input.type = 'text'

	return input
}

function createActions() {
	const wrapper = document.createElement('div')
	wrapper.classList.add('create-character-page__actions')

	const cancelButton = document.createElement('button')
	cancelButton.classList.add('create-character-page__button', 'btn-primary')
	cancelButton.textContent = 'Отмена'

	cancelButton.addEventListener('click', () => {
		changePage('characters-list')
	})

	const createButton = document.createElement('button')
	createButton.classList.add(
		'create-character-page__button',
		'create-character-page__button_primary',
		'btn-primary'
	)

	createButton.textContent = 'Создать'

	createButton.addEventListener('click', () => {
		const name = document.querySelector('.create-character-page__input').value.trim()

		const selected = document.querySelector(
			'.create-character-page__card_active'
		)

		if (!name || !selected) return

		createCharacter(
			name,
			selected.dataset.image
		)
	})

	wrapper.append(
		cancelButton,
		createButton
	)

	return wrapper
}

function createCharacter(name, imageUrl) {
	const currentUser = localStorage.getItem('currentUser')

	if (!currentUser) return

	const player = JSON.parse(
		localStorage.getItem(currentUser)
	)

	if (!player) return

	player.characters.forEach(character => {
		character.isActive = false
	})

	player.characters.push({
		isActive: true,
		imageUrl,
		name,
		arena: {
			win: 0,
			lose: 0
		},
		stats: {}
	})

	localStorage.setItem(
		currentUser,
		JSON.stringify(player)
	)

	changePage('characters-list')
}