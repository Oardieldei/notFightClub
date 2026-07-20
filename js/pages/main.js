import { changePage } from "./pages-manager.js"

export function renderMainPage() {
	return createMainWrapper()
}

function createMainWrapper() {
	const mainPage = document.createElement('div')
	mainPage.classList.add('main-page')
	mainPage.append(createMainContent())

	return mainPage
}

function createMainContent() {
	const content = document.createElement('div')
	content.classList.add('main-page__content')

	content.append(
		createTitle(),
		createDescription(),
		createActions()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('main-page__title')
	title.textContent = 'Добро пожаловать в Fantasy Battle'

	return title
}

function createDescription() {
	const description = document.createElement('p')
	description.classList.add('main-page__description')
	description.textContent = 'Создайте нового игрока или выберите уже существующего, чтобы начать путь к славе на арене.'

	return description
}

function createActions() {
	const actions = document.createElement('div')
	actions.classList.add('main-page__actions')

	actions.append(
		createCreatePlayerButton(),
		createChoosePlayerButton()
	)

	return actions
}

function createCreatePlayerButton() {
	const button = document.createElement('button')
	button.classList.add('main-page__button')
	button.textContent = 'Создать игрока'

	button.addEventListener('click', () => {
		changePage('registration')
	})

	return button
}

function createChoosePlayerButton() {
	const button = document.createElement('button')
	button.classList.add('main-page__button')
	button.textContent = 'Выбрать игрока'

	return button
}