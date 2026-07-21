import { createNewPlayer } from "../player-info/create-new-player.js"
import { changePage } from "./pages-manager.js"

export function renderRegistrationPage() {
	return createRegistrationWrapper()
}

function createRegistrationWrapper() {
	const registrationPage = document.createElement('div')
	registrationPage.classList.add('registration-page')

	registrationPage.append(createRegistrationContent())

	return registrationPage
}

function createRegistrationContent() {
	const content = document.createElement('div')
	content.classList.add('registration-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createForm()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('registration-page__title')
	title.textContent = 'Создание игрока'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('registration-page__description')
	description.textContent = 'Введите имя своего героя, чтобы начать путь в Fantasy Battle'

	return description
}

function createForm() {
	const form = document.createElement('div')
	form.classList.add('registration-page__form')

	form.append(
		createInput(),
		createButton()
	)

	return form
}

function createInput() {
	const input = document.createElement('input')
	input.classList.add('registration-page__input')

	input.id = 'newPlayer'
	input.type = 'text'
	input.placeholder = 'Имя игрока'
	input.maxLength = 30

	return input
}

function createButton() {
	const button = document.createElement('button')
	button.classList.add('registration-page__button', 'btn-primary')

	button.textContent = 'Создать игрока'

	button.addEventListener('click', () => {
		const input = document.querySelector('.registration-page__input')
		if (input.value === '') return
		
		createNewPlayer(input.value)
		changePage('characters-list')		
	})

	return button
}