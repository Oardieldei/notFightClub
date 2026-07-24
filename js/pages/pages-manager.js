import { renderMainPage } from "./main.js"
import { renderRegistrationPage } from "./registration.js"
import { renderPlayerSelectPage } from "./choose-player.js"
import { renderCharactersPage } from "./characters-list.js"
import { renderCreateCharacterPage } from "./create-character.js"
import { renderEditCharacterPage } from "./edit-character.js"
import { renderSettingsPage } from "./settings.js"
import { renderArenaStartPage } from "./arena-start.js"
import { renderBattlePage } from "./arena-fight.js"
import {
	hideHeader,
	showHeader
} from "../header/header.js"
import { checkBattleStatus } from "../game/savingBattle.js"
import { fillBattleState } from "../game/battleState.js"

const main = document.querySelector('.main')
const mainContainer = main.children[0]

export function changePage(page) {
	let newContent

	switch (page) {
		case 'main':
			hideHeader()
			newContent = renderMainPage()
			break;
		case 'registration':
			hideHeader()
			newContent = renderRegistrationPage()
			break;
		case 'choose-player':
			hideHeader()
			newContent = renderPlayerSelectPage()
			break;
		case 'characters-list':
			if (checkBattleStatus()) {
				alert('Нельзя менять персонажей во время боя')
				return
			}
			showHeader()
			newContent = renderCharactersPage()
			break;
		case 'create-character':
			showHeader()
			newContent = renderCreateCharacterPage()
			break;
		case 'edit-character':
			showHeader()
			newContent = renderEditCharacterPage()
			break;
		case 'settings':
			showHeader()
			newContent = renderSettingsPage()
			break;
		case 'arena-start':
			showHeader()
			newContent = renderArenaStartPage()
			break;
		case 'arena-fight':
			showHeader()
			fillBattleState()  
			newContent = renderBattlePage()
			break;

		default:
			break;
	}
	mainContainer.innerHTML = ''
	mainContainer.append(newContent)
}