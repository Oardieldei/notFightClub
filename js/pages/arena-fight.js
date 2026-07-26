import { getBattleState } from '../game/battleState.js'
import { zones } from '../data/zones.js'
import { turn } from '../game/turns.js'
import { endTheFight } from '../game/fightEnd.js'
import { saveBattle } from '../game/savingBattle.js'
import { changePage } from './pages-manager.js'

const selectedZones = {
	attack: [],
	defend: []
}


export function renderBattlePage() {
	const page = createBattleWrapper()
	restoreSelectedZones(page)
	return page
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

		button.classList.add('btn', 'btn--zone')
		button.dataset.type = type
		button.dataset.zone = index
		button.textContent = zone.title

		button.addEventListener('click', () => {
			const startButton = document.querySelector('.btn--primary')
			const battle = getBattleState()
			const currentSelected = selectedZones[type]
			const zoneIndex = currentSelected.indexOf(index)

			if (zoneIndex !== -1) {
				currentSelected.splice(zoneIndex, 1)
				button.classList.remove('btn--zone--selected')
			} else {
				if (currentSelected.length >= maxSelection) {
					const oldest = currentSelected.shift()
					const oldestButton = zonesContainer.querySelector(
						`.btn--zone[data-zone="${oldest}"]`
					)
					if (oldestButton) {
				oldestButton.classList.remove('btn--zone--selected')
					}
				}
				currentSelected.push(index)
				button.classList.add('btn--zone--selected')
			}

			heading.textContent = `${title} (${currentSelected.length}/${maxSelection})`

			const attackReady = selectedZones.attack.length === battle.playerState.attackZones
			const defendReady = selectedZones.defend.length === battle.playerState.defendZones
			startButton.disabled = !(attackReady && defendReady)
		})

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

	button.classList.add('btn', 'btn--primary')
	button.textContent = 'Начать раунд'
	button.disabled = true

	button.addEventListener('click', () => {
		const battleState = getBattleState()
		if (!battleState) return

		const result = turn(selectedZones.attack, selectedZones.defend)

		saveBattle(battleState)
		updateFighterHP(battleState.playerState, battleState.enemyState)
		updateRoundCounter(battleState)
		appendNewLogs(battleState)

		if (result === 'player_wins') {
			endTheFight(battleState, true)
			showBattleResult(battleState)
		} else if (result === 'enemy_wins') {
			endTheFight(battleState, false)
			showBattleResult(battleState)
		}
	})

	return button
}


function updateFighterHP(playerState, enemyState) {
	const fighters = document.querySelectorAll('.battle-page__fighter')

	const playerFighter = fighters[0]
	const enemyFighter = fighters[1]

	updateHPBlock(playerFighter, playerState)
	updateHPBlock(enemyFighter, enemyState)
}


function updateHPBlock(fighter, state) {
	const hpText = fighter.querySelector('.battle-page__hp-text')
	const hpBar = fighter.querySelector('.battle-page__hp-bar')

	hpText.textContent = `${state.currentHP} / ${state.maxHP}`

	const percent = state.currentHP / state.maxHP * 100
	hpBar.style.setProperty('--hp-percent', `${percent}%`)
}


function updateRoundCounter(battleState) {
	const counter = document.querySelector('.battle-page__round')
	counter.textContent = `Раунд ${battleState.turnCounter + 1}`
}


function appendNewLogs(battleState) {
	const logsContainer = document.querySelector('.battle-page__logs')
	const lastRoundLogs = battleState.battleLogs.at(-1)

	if (lastRoundLogs) {
		lastRoundLogs.forEach(log => {
			logsContainer.prepend(createLog(log))
		})
	}
}


function showBattleResult(lastState) {
	const center = document.querySelector('.battle-page__center')
	const result = center.querySelector('.battle-page__result')

	const isWin = lastState.enemyState.currentHP === 0
	const winnerName = isWin ? lastState.playerState.name : lastState.enemyState.name

	center.classList.add('battle-page__center--finished')

	selectedZones.attack = []
	selectedZones.defend = []

	const titleClass = isWin ? 'battle-page__result-title--victory' : 'battle-page__result-title--defeat'

	result.innerHTML = `
		<h2 class="battle-page__result-title ${titleClass}">
			${isWin ? `${winnerName} побеждает!` : 'Поражение'}
		</h2>

		<div class="battle-page__result-buttons">
			<button class="btn btn--primary" data-action="characters">
				Выбрать персонажа
			</button>
			<button class="btn btn--primary" data-action="arena">
				На арену
			</button>
		</div>
	`

	result.querySelector('[data-action="characters"]')
		.addEventListener('click', () => changePage('characters-list'))

	result.querySelector('[data-action="arena"]')
		.addEventListener('click', () => changePage('arena-start'))
}


function createBattleResult() {
	const result = document.createElement('div')

	result.classList.add('battle-page__result')

	return result
}


function createBattleLogs(battleState) {
	const logs = document.createElement('div')

	logs.classList.add('battle-page__logs')

	if (battleState.battleLogs) {
		battleState.battleLogs.forEach(roundLogs => {
			if (roundLogs) {
				roundLogs.forEach(log => {
					logs.prepend(createLog(log))
				})
			}
		})
	}

	return logs
}


function createLog(log) {
	const item = document.createElement('p')
	item.classList.add('battle-page__log')
	item.innerHTML = createReadableLog(log)
	return item
}


function restoreSelectedZones(page) {
	const sections = page.querySelectorAll('.battle-page__section')

	sections.forEach(section => {
		const firstButton = section.querySelector('.btn--zone')
		if (!firstButton) return

		const type = firstButton.dataset.type
		const zones = selectedZones[type]
		const heading = section.querySelector('.battle-page__section-title')

		zones.forEach(index => {
			const button = section.querySelector(`.btn--zone[data-zone="${index}"]`)
			if (button) {
				button.classList.add('btn--zone--selected')
			}
		})

		const count = zones.length
		if (heading) {
			const match = heading.textContent.match(/\/(\d+)/)
			if (match) {
				heading.textContent = `${type === 'attack' ? 'Атака' : 'Защита'} (${count}/${match[1]})`
			}
		}
	})

	const startButton = page.querySelector('.btn--primary')
	if (startButton) {
		const battle = getBattleState()
		if (battle) {
			const attackReady = selectedZones.attack.length === battle.playerState.attackZones
			const defendReady = selectedZones.defend.length === battle.playerState.defendZones
			startButton.disabled = !(attackReady && defendReady)
		}
	}
}


function createReadableLog(log) {
	let result = ''

	if (log.isBlocked && log.isCritical) {
		result = `<span class="battle-log__attacker">${log.attackerName}</span> бьет врага в <span class="battle-log__zone">${zones[log.attackZone].alt}</span> и пробивает защиту. Критический удар! <span class="battle-log__target">${log.defenderName}</span> получает <span class="battle-log__damage">${log.damage}</span> урона.`
	}

	if (log.isBlocked && !log.isCritical) {
		result = `<span class="battle-log__attacker">${log.attackerName}</span> бьет врага в <span class="battle-log__zone">${zones[log.attackZone].alt}</span>, но <span class="battle-log__target">${log.defenderName}</span> успешно блокирует удар.`
	}

	if (!log.isBlocked && log.isCritical) {
		result = `<span class="battle-log__attacker">${log.attackerName}</span> бьет врага в <span class="battle-log__zone">${zones[log.attackZone].alt}</span>. Критический удар! <span class="battle-log__target">${log.defenderName}</span> получает <span class="battle-log__damage">${log.damage}</span> урона.`
	}

	if (!log.isBlocked && !log.isCritical) {
		result = `<span class="battle-log__attacker">${log.attackerName}</span> бьет врага в <span class="battle-log__zone">${zones[log.attackZone].alt}</span> и попадает. <span class="battle-log__target">${log.defenderName}</span> получает <span class="battle-log__damage">${log.damage}</span> урона.`
	}

	return result
}