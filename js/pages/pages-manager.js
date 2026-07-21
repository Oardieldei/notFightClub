import { renderMainPage } from "./main.js"
import { renderRegistrationPage } from "./registration.js"
import { renderPlayerSelectPage } from "./choose-player.js"
import { renderCharactersPage } from "./characters-list.js"
import { renderCreateCharacterPage } from "./create-character.js"
import { renderEditCharacterPage } from "./edit-character.js"
import {
	hideHeader,
	showHeader
} from "../header/header.js"

const main = document.querySelector('.main')
const mainContainer = main.children[0]

export function changePage(page) {
	mainContainer.innerHTML = ''

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

		default:
			break;
	}

	mainContainer.append(newContent)
}