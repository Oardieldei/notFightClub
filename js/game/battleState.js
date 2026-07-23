let battleState = null

export function checkSavingFight() {
	if (localStorage.getItem('currentFight')) {
		setBattleState(JSON.parse(localStorage.getItem('currentFight')))
	}
}

export function startBattle(player, enemy) {
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
}

export function clearBattle() {
	setBattleState(null)
}


export function getBattleState() {
	return battleState
}

export function setBattleState(newState) {
    battleState = newState
}