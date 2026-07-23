import { randomNum } from "../utils/random.js"

export function whatDamageIs(attacker, isCritical) {
	let baseDamage = randomNum(attacker.strength - 5, attacker.strength + 5)
	if (isCritical) baseDamage = baseDamage * attacker.critDamageMultiplier
	return Math.round(baseDamage)
}