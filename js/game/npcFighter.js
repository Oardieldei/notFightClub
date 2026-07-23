import { enemies } from "../data/enemies.js"

function randomNum(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function chooseEnemy() {
	const index = randomNum(0, enemies.hength - 1)

	return enemies[index]
}

export function getCurrentFighterInfo() {
	const newEnemy = structuredClone(chooseEnemy())

	newEnemy.hp = randomNum(180, 220)
	newEnemy.strength = randomNum(40, 60)
	newEnemy.critChancePercent = 20
	newEnemy.critDamageMultiplier = 1.5

	return newEnemy
}