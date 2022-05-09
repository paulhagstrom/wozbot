const { execSync } = require('child_process');

module.exports = {
	async recordScreen() {
		console.log('Running ffmpeg to record');
		// record 1 second and send it out as a gif
		execSync('ffmpeg -y -draw_mouse 0 -f x11grab -r 12 -video_size 1128x768 -i :1.0+13,68 -t 1 /tmp/screen.gif', (error, stdout, stderr) => {
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
