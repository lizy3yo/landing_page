import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/User/.gemini/antigravity-ide/brain/239b704d-c103-40d8-82f0-62dfb2db085d';
const destDir = 'c:/00-projects/Landing page/static/images';

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
	fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
	{
		src: path.join(srcDir, 'ebook_cover_1783218912086.png'),
		dest: path.join(destDir, 'ebook-cover.png')
	},
	{
		src: path.join(srcDir, 'companion_cover_1783218921772.png'),
		dest: path.join(destDir, 'companion-cover.png')
	}
];

filesToCopy.forEach(file => {
	try {
		if (fs.existsSync(file.src)) {
			fs.copyFileSync(file.src, file.dest);
			console.log(`Successfully copied ${path.basename(file.src)} to ${file.dest}`);
		} else {
			console.error(`Source file not found: ${file.src}`);
		}
	} catch (err) {
		console.error(`Error copying file: ${err.message}`);
	}
});
