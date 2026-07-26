export function addLogToBattle(battle, log) {
	if (!battle.battleLogs[battle.turnCounter]) {
		battle.battleLogs[battle.turnCounter] = []
	}
	battle.battleLogs[battle.turnCounter].push(log)
}