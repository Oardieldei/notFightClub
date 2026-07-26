import { enemies } from "../data/enemies.js"
import { randomNum } from "../utils/random.js"

function chooseEnemy() {
	const index = randomNum(0, enemies.length - 1)

	return enemies[index]
}

export function getEnemyFighterInfo() {
	const newEnemy = structuredClone(chooseEnemy())

	newEnemy.hp = randomNum(180, 220)
	newEnemy.strength = randomNum(40, 60)
	newEnemy.critChancePercent = 20
	newEnemy.critDamageMultiplier = 1.5

	return newEnemy
}