let battleState = null

export function checkSavingFight() {
	if (localStorage.getItem(currentFight)) {
		battleState = JSON.parse(localStorage.getItem(currentFight))
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

export function endBattle() {
	battleState = null
}

function getRandomZones(all, num) {
    if (num > all) num = all
    
    const uniqueIndices = new Set()
    
    while (uniqueIndices.size < num) {
        const random = randomNum(0, all - 1)
        uniqueIndices.add(random)
    }
    
    return Array.from(uniqueIndices)
}

function randomNum(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}