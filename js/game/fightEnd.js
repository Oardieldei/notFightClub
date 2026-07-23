import {
	clearBattle,
	getBattleState
} from "./battleState.js"

function changePlayerStatistic(isWin) {
	const battle = getBattleState()
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

export function endTheFight(isWin) {
	changePlayerStatistic(isWin)
	// отобразить страницу победы/проигрыша
	clearBattle()
	// ничего не забыл?
}