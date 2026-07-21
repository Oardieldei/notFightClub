import { changePage } from "./pages-manager.js"

const characterImages = [
	'./img/images.jpg',
	'./img/images (1).jpg',
	'./img/images (2).jpg',
	'./img/images (3).jpg',
	'./img/images (4).jpg'
]

export function renderEditCharacterPage() {
	return createMainWrapper()
}

function createMainWrapper() {
	const page = document.createElement('div')
	page.classList.add('edit-character-page')

	page.append(createContent())

	return page
}

function getEditingCharacter() {
	const editingIndex = localStorage.getItem('editingCharacterIndex')
	if (editingIndex === null) return null

	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return null

	const player = JSON.parse(localStorage.getItem(currentUser))
	if (!player || !player.characters[editingIndex]) return null

	return {
		player,
		index: Number(editingIndex),
		character: player.characters[editingIndex]
	}
}

function createContent() {
	const content = document.createElement('div')
	content.classList.add('edit-character-page__content')

	const editing = getEditingCharacter()

	if (!editing) {
		content.append(createErrorState())
		return content
	}

	content.append(
		createTitle(),
		createDescription(),
		createImageSelection(editing.character),
		createNameInput(editing.character),
		createActions(editing)
	)

	return content
}

function createErrorState() {
	const error = document.createElement('div')
	error.classList.add('edit-character-page__error')

	const text = document.createElement('p')
	text.textContent = 'Не удалось загрузить данные персонажа'

	const button = document.createElement('button')
	button.classList.add('btn-primary')
	button.textContent = 'Вернуться к списку'
	button.addEventListener('click', () => changePage('characters-list'))

	error.append(text, button)
	return error
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('edit-character-page__title')
	title.textContent = 'Редактирование персонажа'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('edit-character-page__description')
	description.textContent = 'Измените имя или выберите другой образ'

	return description
}

function createImageSelection(character) {
	const wrapper = document.createElement('div')
	wrapper.classList.add('edit-character-page__selection')

	characterImages.forEach((image, index) => {
		const card = document.createElement('div')
		card.classList.add('edit-character-page__card')

		if (image === character.imageUrl) {
			card.classList.add('edit-character-page__card_active')
		}

		const imageElement = document.createElement('img')
		imageElement.classList.add('edit-character-page__image')
		imageElement.src = image
		imageElement.alt = `Персонаж ${index + 1}`

		card.dataset.image = image

		card.addEventListener('click', () => {
			document
				.querySelectorAll('.edit-character-page__card')
				.forEach(item => item.classList.remove('edit-character-page__card_active'))

			card.classList.add('edit-character-page__card_active')
		})

		card.append(imageElement)
		wrapper.append(card)
	})

	return wrapper
}

function createNameInput(character) {
	const input = document.createElement('input')

	input.classList.add('edit-character-page__input')
	input.placeholder = 'Имя персонажа'
	input.type = 'text'
	input.value = character.name

	return input
}

function createActions(editing) {
	const wrapper = document.createElement('div')
	wrapper.classList.add('edit-character-page__actions')

	const cancelButton = document.createElement('button')
	cancelButton.classList.add('edit-character-page__button', 'btn-primary')
	cancelButton.textContent = 'Отмена'

	cancelButton.addEventListener('click', () => {
		localStorage.removeItem('editingCharacterIndex')
		changePage('characters-list')
	})

	const saveButton = document.createElement('button')
	saveButton.classList.add(
		'edit-character-page__button',
		'edit-character-page__button_primary',
		'btn-primary'
	)

	saveButton.textContent = 'Сохранить'

	saveButton.addEventListener('click', () => {
		const name = document.querySelector('.edit-character-page__input').value.trim()

		const selected = document.querySelector(
			'.edit-character-page__card_active'
		)

		if (!name || !selected) return

		saveCharacter(editing, name, selected.dataset.image)
	})

	wrapper.append(
		cancelButton,
		saveButton
	)

	return wrapper
}

function saveCharacter(editing, name, imageUrl) {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return

	const player = JSON.parse(localStorage.getItem(currentUser))
	if (!player || !player.characters[editing.index]) return

	player.characters[editing.index].name = name
	player.characters[editing.index].imageUrl = imageUrl

	localStorage.setItem(currentUser, JSON.stringify(player))
	localStorage.removeItem('editingCharacterIndex')

	changePage('characters-list')
}