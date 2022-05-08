// Allow spawning so we can launch the xdotool to type
const { execSync } = require('child_process');

module.exports = {
	async sendline(line) {
			execSync(`xdotool search --name Apple type --delay 100 ${line}`, (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr:${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
    },
  async sendreturn() {
    execSync('xdotool search --name Apple key Return', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
  },
};
