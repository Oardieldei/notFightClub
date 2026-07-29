import { changePage } from "./pages/pages-manager.js"
import { addHeaderActions } from "./header/header.js"

export function runApp() {
	changePage('main')
	addHeaderActions()
}