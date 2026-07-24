function getCurrentPlayer() {
	const currentUser = localStorage.getItem('currentUser')

	if (!currentUser) return null

	return JSON.parse(localStorage.getItem(currentUser))
}

export function getCurrentFighterInfo() {
	const player = getCurrentPlayer()

	const currentIndex = player.characters.findIndex(character => character.isActive)
	if (currentIndex === -1) return false
	
	const currentImgUrl = player.characters[currentIndex].imageUrl
	const currentName = player.characters[currentIndex].name

	return {
		name: currentName,
		hp: 200,
		strength: 50,
		index: currentIndex,
		imgUrl: currentImgUrl,
		attackZones: 1,
		defendZones: 2,
		critChancePercent: 20,
		critDamageMultiplier: 1.5
	}
}