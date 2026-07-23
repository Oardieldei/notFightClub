import { getBattleState } from "./battleState.js"

export function addLogToBattle(log) {
	const battle = getBattleState()
	if (!battle.battleLogs[battle.turnCounter]) {
		battle.battleLogs[battle.turnCounter] = []
	}
	battle.battleLogs[battle.turnCounter].push(log)
}