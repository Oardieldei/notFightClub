export function createNewPlayer(name) {
	const newPlayerData = createNewPlayerData(name)
	const newPlayerId = saveNewPlayer(newPlayerData)
	localStorage.setItem('currentUser', `user_${newPlayerId}`)
}

function saveNewPlayer(data) {
	let playerID

	if (localStorage.getItem('userIDCounter')) {
		playerID = Number(localStorage.getItem('userIDCounter')) + 1
	} else {
		playerID = 0
	}

	localStorage.setItem(`user_${playerID}`, JSON.stringify(data))
	localStorage.setItem(`userIDCounter`, JSON.stringify(playerID))

	return playerID
}

function createNewPlayerData(playerName) {
	return {
		name: playerName,
		characters: [],
		battleStatus: false,
		battleState: null
	}
}