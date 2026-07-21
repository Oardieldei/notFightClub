import { renderMainPage } from "./main.js"
import { renderRegistrationPage } from "./registration.js"
import { renderPlayerSelectPage } from "./choose-player.js"

const main = document.querySelector('.main')
const mainContainer = main.children[0]

export function changePage(page) {
	mainContainer.innerHTML = ''

	let newContent

	switch (page) {
		case 'main':
			newContent = renderMainPage()
			break;
		case 'registration':
			newContent = renderRegistrationPage()
			break;
		case 'choose-player':
			newContent = renderPlayerSelectPage()
			break;

		default:
			break;
	}

	mainContainer.append(newContent)
}