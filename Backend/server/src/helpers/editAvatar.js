const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const imagesDir = path.join(__filename, '../../../static/');

async function saveAvatar(image) {

    try {
        const sharpImage = sharp(image.data);
        
        const imageName = uuid.v4() + '.jpg';

        let photoPath;
        
        photoPath = path.join(imagesDir, imageName);

        sharpImage.resize(150, 150);

        sharpImage.toFile(photoPath);

        return imageName;
    } catch (error) {
        throw new Error('Image Not Found', 404);
    }
}

async function deleteAvatar(imageName) {
    try {
        let photoPath;

        photoPath = path.join(imagesDir, imageName)

        await unlink(photoPath);
    } catch (error) {
        throw new Error('Image Not Found', 404);
    }
}


module.exports = {
    deleteAvatar, saveAvatar
}