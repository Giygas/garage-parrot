import sharp from 'sharp';

export async function imageToWebp(img: File): Promise<Buffer> {
	const imgBuffer = Buffer.from(await img.arrayBuffer());
	const image = sharp(imgBuffer).resize({ height: 1200 }).webp({ quality: 80 }).toBuffer();

	return image;
}
