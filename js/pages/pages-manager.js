import { renderMainPage } from "./main.js"

const main = document.querySelector('.main')
const mainContainer = main.children[0]

export function changePage(page) {
	let newContent

	switch (page) {
		case 'main':
			newContent = renderMainPage()
			break;
	
		default:
			break;
	}

	mainContainer.append(newContent)
}