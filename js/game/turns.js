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

function playerAttackZone(attackZone, defendZonesArray) {
	const battle = getBattleState()
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

export function playerTurn(attackZonesArray) {
	const battle = getBattleState()
	const defendZonesArray = getRandomZonesChoice(battle.enemyState.defendZones)

	for (const attackZone of attackZonesArray) {
		const newAttack = playerAttackZone(attackZone, defendZonesArray)
		battle.enemyState.currentHP = Math.max(0, battle.enemyState.currentHP - newAttack.damage)
		addLogToBattle(newAttack)

		if (battle.enemyState.currentHP === 0) {
			endTheFight(true)
			return
		}
	}
}

function enemyAttackZone(attackZone, defendZonesArray) {
	const battle = getBattleState()
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

export function enemyTurn(defendZonesArray) {
	const battle = getBattleState()
	const attackZonesArray = getRandomZonesChoice(battle.enemyState.attackZones)

	for (const attackZone of attackZonesArray) {
		const newAttack = enemyAttackZone(attackZone, defendZonesArray)
		battle.playerState.currentHP = Math.max(0, battle.playerState.currentHP - newAttack.damage)
		addLogToBattle(newAttack)

		if (battle.playerState.currentHP === 0) {
			endTheFight(false)
			return
		}
	}
}

