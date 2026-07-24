import { getBattleState } from '../game/battleState.js'
import { zones } from '../data/zones.js'


export function renderBattlePage() {
	return createBattleWrapper()
}


function createBattleWrapper() {
	const page = document.createElement('div')
	page.classList.add('battle-page')

	const battleState = getBattleState()

	page.append(
		createBattleArena(battleState),
		createBattleLogs(battleState)
	)

	return page
}


function createBattleArena(battleState) {
	const arena = document.createElement('div')
	arena.classList.add('battle-page__arena')

	arena.append(
		createFighter(battleState.playerState),
		createBattleCenter(battleState),
		createFighter(battleState.enemyState)
	)

	return arena
}


function createFighter(character) {
	const fighter = document.createElement('div')
	fighter.classList.add('battle-page__fighter')

	fighter.append(
		createAvatar(character),
		createName(character),
		createHP(character)
	)

	return fighter
}


function createAvatar(character) {
	const img = document.createElement('img')

	img.classList.add('battle-page__avatar')
	img.src = character.imgUrl
	img.alt = character.name

	return img
}


function createName(character) {
	const name = document.createElement('h2')

	name.classList.add('battle-page__name')
	name.textContent = character.name

	return name
}


function createHP(character) {
	const wrapper = document.createElement('div')
	wrapper.classList.add('battle-page__hp')

	const text = document.createElement('div')
	text.classList.add('battle-page__hp-text')
	text.textContent = `${character.currentHP} / ${character.maxHP}`

	const bar = document.createElement('div')
	bar.classList.add('battle-page__hp-bar')

	const percent = character.currentHP / character.maxHP * 100

	bar.style.setProperty(
		'--hp-percent',
		`${percent}%`
	)

	wrapper.append(
		bar,
		text
	)

	return wrapper
}


function createBattleCenter(battleState) {
	const center = document.createElement('div')
	center.classList.add('battle-page__center')
	center.classList.add('battle-page__center--active')

	center.append(
		createBattleControls(battleState),
		createBattleResult()
	)

	return center
}


function createBattleControls(battleState) {
	const controls = document.createElement('div')
	controls.classList.add('battle-page__controls')

	controls.append(
		createRoundCounter(battleState),
		createZonesSection(battleState),
		createStartButton()
	)

	return controls
}


function createRoundCounter(battleState) {
	const counter = document.createElement('div')

	counter.classList.add('battle-page__round')

	counter.textContent = `Раунд ${battleState.turnCounter + 1}`

	return counter
}


function createZonesSection(battleState) {
	const sections = document.createElement('div')

	sections.classList.add('battle-page__sections')

	sections.append(
		createZoneBlock(
			'Защита',
			'defend',
			battleState.playerState.defendZones
		),
		createZoneBlock(
			'Атака',
			'attack',
			battleState.playerState.attackZones
		)
	)

	return sections
}


function createZoneBlock(title, type, maxSelection) {
	const section = document.createElement('div')
	section.classList.add('battle-page__section')

	const heading = document.createElement('h3')
	heading.classList.add('battle-page__section-title')
	heading.textContent = `${title} (0/${maxSelection})`

	const zonesContainer = document.createElement('div')
	zonesContainer.classList.add('battle-page__zones')

	zones.forEach((zone, index) => {
		const button = document.createElement('button')

		button.classList.add('battle-page__zone')
		button.dataset.type = type
		button.dataset.zone = index
		button.textContent = zone.title

		/*
			Здесь нужен обработчик выбора зоны.
			После выбора:
			- добавить/убрать класс battle-page__zone--selected
			- обновить счетчик выбранных зон
			- отключить остальные зоны через battle-page__zone--disabled
		*/

		zonesContainer.append(button)
	})

	section.append(
		heading,
		zonesContainer
	)

	return section
}


function createStartButton() {
	const button = document.createElement('button')

	button.classList.add('battle-page__button')
	button.textContent = 'Начать раунд'
	button.disabled = true

	/*
		Здесь нужен обработчик начала раунда.
		Перед запуском проверять выбранные зоны атаки и защиты.
	*/

	return button
}


function createBattleResult() {
	const result = document.createElement('div')

	result.classList.add('battle-page__result')

	result.innerHTML = `
		<h2 class="battle-page__result-title">
			Победа!
		</h2>

		<p class="battle-page__result-text">
			Бой завершен
		</p>
	`

	return result
}


function createBattleLogs(battleState) {
	const logs = document.createElement('div')

	logs.classList.add('battle-page__logs')

	battleState.battleLogs.forEach(roundLogs => {
		roundLogs.forEach(log => {
			logs.prepend(createLog(log))
		})
	})


	return logs
}


function createLog(log) {
	const item = document.createElement('p')

	item.classList.add('battle-page__log')

	item.innerHTML = log

	return JSON.stringify(log)
}