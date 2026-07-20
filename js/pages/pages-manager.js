import { renderMainPage } from "./main.js"
import { renderRegistrationPage } from "./registration.js"

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

		default:
			break;
	}

	mainContainer.append(newContent)
}