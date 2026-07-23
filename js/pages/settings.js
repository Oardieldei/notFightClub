import { changePage } from './pages-manager.js'

export function renderSettingsPage() {
	return createSettingsWrapper()
}

function createSettingsWrapper() {
	const settingsPage = document.createElement('div')
	settingsPage.classList.add('settings-page')
	settingsPage.append(createSettingsContent())

	return settingsPage
}

function createSettingsContent() {
	const content = document.createElement('div')
	content.classList.add('settings-page__content')

	content.append(
		createTitle(),
		createPlayerSection(),
		createRenameSection(),
		createDeleteSection()
	)

	return content
}

function createTitle() {
	const title = document.createElement('h1')
	title.classList.add('settings-page__title')
	title.textContent = 'Настройки игрока'

	return title
}

function createPlayerSection() {
	const section = document.createElement('section')
	section.classList.add('settings-page__section')

	section.append(
		createPlayerSubtitle(),
		createPlayerInfo()
	)

	return section
}

function createPlayerSubtitle() {
	const subtitle = document.createElement('h2')
	subtitle.classList.add('settings-page__subtitle')
	subtitle.textContent = 'Информация'

	return subtitle
}

function createPlayerInfo() {
	const info = document.createElement('div')
	info.classList.add('settings-page__info')

	const player = getCurrentPlayer()
	const stats = calculatePlayerStats(player)

	info.append(
		createInfoRow('Имя', player.name),
		createInfoRow('Победы', `${stats.win}%`, 'settings-page__value_win'),
		createInfoRow('Поражения', `${stats.lose}%`, 'settings-page__value_lose')
	)

	return info
}

function createInfoRow(labelText, valueText, valueClass = '') {
	const row = document.createElement('div')
	row.classList.add('settings-page__row')

	const label = document.createElement('span')
	label.classList.add('settings-page__label')
	label.textContent = labelText

	const value = document.createElement('span')
	value.classList.add('settings-page__value')

	if (valueClass) {
		value.classList.add(valueClass)
	}

	value.textContent = valueText

	row.append(label, value)

	return row
}

function createRenameSection() {
	const section = document.createElement('section')
	section.classList.add('settings-page__section')

	section.append(
		createRenameSubtitle(),
		createRenameForm()
	)

	return section
}

function createRenameSubtitle() {
	const subtitle = document.createElement('h2')
	subtitle.classList.add('settings-page__subtitle')
	subtitle.textContent = 'Изменить имя'

	return subtitle
}

function createRenameForm() {
	const form = document.createElement('div')
	form.classList.add('settings-page__form')

	const input = document.createElement('input')
	input.classList.add('settings-page__input')
	input.type = 'text'
	input.maxLength = 24
	input.placeholder = 'Введите новое имя'

	const button = document.createElement('button')
	button.classList.add('settings-page__button')
	button.textContent = 'Сохранить'

	button.addEventListener('click', () => {
		const value = input.value.trim()

		if (!value) return

		const currentUser = localStorage.getItem('currentUser')
		const player = getCurrentPlayer()

		player.name = value

		localStorage.setItem(currentUser, JSON.stringify(player))

		changePage('settings')
	})

	form.append(
		input,
		button
	)

	return form
}

function createDeleteSection() {
	const section = document.createElement('section')
	section.classList.add('settings-page__section')

	const subtitle = document.createElement('h2')
	subtitle.classList.add('settings-page__subtitle')
	subtitle.textContent = 'Удаление игрока'

	const actions = document.createElement('div')
	actions.classList.add('settings-page__actions')

	const button = document.createElement('button')
	button.classList.add(
		'settings-page__button',
		'settings-page__button_danger'
	)
	button.textContent = 'Удалить игрока'

	button.addEventListener('click', () => {
		const confirmed = confirm('Удалить игрока без возможности восстановления?')

		if (!confirmed) return

		localStorage.removeItem(localStorage.getItem('currentUser'))

		changePage('main')
	})

	actions.append(button)

	section.append(
		subtitle,
		actions
	)

	return section
}

function getCurrentPlayer() {
	const currentUser = localStorage.getItem('currentUser')

	return JSON.parse(localStorage.getItem(currentUser))
}

function calculatePlayerStats(player) {
	let win = 0
	let lose = 0

	player.characters.forEach(character => {
		win += character.arena.win
		lose += character.arena.lose
	})

	const total = win + lose

	if (!total) {
		return {
			win: 0,
			lose: 0
		}
	}

	return {
		win: Math.round(win / total * 100),
		lose: Math.round(lose / total * 100)
	}
}