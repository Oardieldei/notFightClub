import {
	saveBattleStatus,
	loadBattle,
	checkBattleStatus
} from "./savingBattle.js"

let battleState = null

export function fillBattleState() {
	if (checkBattleStatus()) {
		battleState = loadBattle()
		return
	}
}

export function createBattle(player, enemy) {
	battleState = {
		playerState: {
			name: player.name,
			index: player.index,
			imgUrl: player.imgUrl,
			maxHP: player.hp,
			currentHP: player.hp,
			strength: player.strength,
			attackZones: player.attackZones,
			defendZones: player.defendZones,
			critChancePercent: player.critChancePercent,
			critDamageMultiplier: player.critDamageMultiplier
		},
		enemyState: {
			name: enemy.name,
			imgUrl: enemy.imgUrl,
			maxHP: enemy.hp,
			currentHP: enemy.hp,
			strength: enemy.strength,
			attackZones: enemy.attackZones,
			defendZones: enemy.defendZones,
			critChancePercent: enemy.critChancePercent,
			critDamageMultiplier: enemy.critDamageMultiplier
		},
		turnCounter: 0,
		battleLogs: []
	}

	saveBattleStatus(true)
}

export function clearBattle() {
	battleState = null
}


export function getBattleState() {
	return battleState
}