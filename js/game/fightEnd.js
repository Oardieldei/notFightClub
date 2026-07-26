import { clearBattle } from "./battleState.js"
import { saveBattleStatus } from "./savingBattle.js"

function changePlayerStatistic(battle, isWin) {
	const currentUser = localStorage.getItem('currentUser')
	const playerData = JSON.parse(localStorage.getItem(currentUser))
	const fighter = playerData.characters[battle.playerState.index]

	if (isWin) {
		fighter.arena.win++
	} else {
		fighter.arena.lose++
	}

	localStorage.setItem(currentUser, JSON.stringify(playerData))
}

export function endTheFight(battle, isWin) {
	changePlayerStatistic(battle, isWin)
	clearBattle()
	saveBattleStatus(false)
}