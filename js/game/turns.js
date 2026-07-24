import { isCrit } from "./isCritical.js"
import { whatDamageIs } from "./calculateDamage.js"
import { getBattleState } from "./battleState.js"
import { randomNum } from "../utils/random.js"
import { zones } from "../data/zones.js"
import { addLogToBattle } from "./logs.js"
import { endTheFight } from "./fightEnd.js"

function getRandomZonesChoice(num) {
	const all = zones.length
	if (num > all) num = all

	const uniqueIndices = new Set()

	while (uniqueIndices.size < num) {
		const random = randomNum(0, all - 1)
		uniqueIndices.add(random)
	}

	return Array.from(uniqueIndices)
}

function playerAttackZone(battle, attackZone, defendZonesArray) {
	const isBlocked = defendZonesArray.includes(attackZone)
	const isCritical = isCrit(battle.playerState.critChancePercent)
	let damage = 0

	if (!isBlocked || isCritical) {
		damage = whatDamageIs(battle.playerState, isCritical)
	}

	return {
		attackerName: battle.playerState.name,
		defenderName: battle.enemyState.name,
		attackZone,
		isBlocked,
		isCritical,
		damage
	}
}

function playerTurn(battle, attackZonesArray) {
	const defendZonesArray = getRandomZonesChoice(battle.enemyState.defendZones)

	for (const attackZone of attackZonesArray) {
		const newAttack = playerAttackZone(battle, attackZone, defendZonesArray)
		battle.enemyState.currentHP = Math.max(0, battle.enemyState.currentHP - newAttack.damage)
		addLogToBattle(battle, newAttack)
	}
}

function enemyAttackZone(battle, attackZone, defendZonesArray) {
	const isBlocked = defendZonesArray.includes(attackZone)
	const isCritical = isCrit(battle.enemyState.critChancePercent)
	let damage = 0

	if (!isBlocked || isCritical) {
		damage = whatDamageIs(battle.enemyState, isCritical)
	}

	return {
		attackerName: battle.enemyState.name,
		defenderName: battle.playerState.name,
		attackZone,
		isBlocked,
		isCritical,
		damage
	}
}

function enemyTurn(battle, defendZonesArray) {
	const attackZonesArray = getRandomZonesChoice(battle.enemyState.attackZones)

	for (const attackZone of attackZonesArray) {
		const newAttack = enemyAttackZone(battle, attackZone, defendZonesArray)
		battle.playerState.currentHP = Math.max(0, battle.playerState.currentHP - newAttack.damage)
		addLogToBattle(battle, newAttack)
	}
}

export function turn(attackZonesArray, defendZonesArray) {
	const battle = getBattleState()
	nextTurn(battle)
	playerTurn(battle, attackZonesArray)

	if (battle.enemyState.currentHP === 0) {
		return 'player_wins'
	}

	enemyTurn(battle, defendZonesArray)

	if (battle.playerState.currentHP === 0) {
		return 'enemy_wins'
	}

	return null
}

function nextTurn(battle) {
	battle.turnCounter++
	// отрисовать номер раунда на странице
	// отсировать логи 
}