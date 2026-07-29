export function saveBattleStatus(status) {
	const currentUser = localStorage.getItem('currentUser')
	const playerData = JSON.parse(localStorage.getItem(currentUser))
	playerData.battleStatus = status
	localStorage.setItem(currentUser, JSON.stringify(playerData))
}

export function saveBattle(battle) {
	const currentUser = localStorage.getItem('currentUser')
	const playerData = JSON.parse(localStorage.getItem(currentUser))
	playerData.battleState = battle
	localStorage.setItem(currentUser, JSON.stringify(playerData))
}

export function loadBattle() {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return null
	const playerData = JSON.parse(localStorage.getItem(currentUser))
	return playerData.battleState ? playerData.battleState : null
}

export function checkBattleStatus() {
	const currentUser = localStorage.getItem('currentUser')
	if (!currentUser) return false
	const playerData = JSON.parse(localStorage.getItem(currentUser))
	return playerData.battleStatus
}
