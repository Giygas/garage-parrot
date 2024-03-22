import { exec } from 'child_process';

//@ts-expect-error It's javascript
export default async function handler(req, res) {
	exec('node src/lib/uploadImages.js', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return res.status(500).send(`Error executing script: ${error}`);
		}
		console.log(`stdout: ${stdout}`);
		console.error(`stderr: ${stderr}`);
		// Since you don't need a return value, you can simply acknowledge the execution.
		return res.status(200).send('Script executed successfully.');
	});
}
