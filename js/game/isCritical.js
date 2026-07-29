import { randomNum } from "../utils/random.js"

export function isCrit(chance) {
	const dice = randomNum(0, 99)

	return dice < chance
}