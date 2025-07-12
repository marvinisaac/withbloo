const transformToData = async (file, quality = 0.92) => {
    let imageData = null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.onload = async (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const maxDimension = 720;
                let { width, height } = img;

                if (width > maxDimension || height > maxDimension) {
                    const widthRatio = maxDimension / width;
                    const heightRatio = maxDimension / height;
                    const ratio = Math.min(widthRatio, heightRatio);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                imageData = canvas.toDataURL('image/webp', quality);
                resolve(imageData);
            };
        };
    });
};

export {
    transformToData
};
