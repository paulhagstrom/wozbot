const { exec } = require('child_process');
// synchronous because I am old

function stopEmulator() {
  console.log('Stopping emulator.');
	exec('pkill -f izapple2sdl_linux', (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
		}
		if (stderr) {
			console.log(`stderr:${stderr}`);
		}
		console.log(`stdout: ${stdout}`);
	});
}

function startEmulator() {
  console.log('Starting emulator.');
	exec('/usr/src/emulator/izapple2sdl_linux /usr/src/bot/disks/uwgp.dsk &', (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
		}
		if (stderr) {
			console.log(`stderr:${stderr}`);
		}
		console.log(`stdout: ${stdout}`);
	});
}

module.exports = {
  startEmulator,
  stopEmulator
}
