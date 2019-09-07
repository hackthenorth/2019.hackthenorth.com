const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const minimizeFile = async (from, to) => {
  await imagemin([from], to, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });
};

glob("{src,public}/**/*.{jpg,png}", async (err, files) => {
  if (err) {
    console.error("Failed: glob");
  } else {
    files.forEach(async file => {
      const tempFolder = path.join(__dirname, "image-minimizer-temp");
      const tempFile = path.join(tempFolder, path.basename(file));
      minimizeFile(file, tempFolder)
        .then(() => {
          fs.copyFile(tempFile, file, err => {
            if (err) {
              console.error(`Failed: ${file}, unable to overwrite`);
              console.error(err);
            } else {
              fs.unlink(tempFile, err => {
                if (err) {
                  console.error(`Failed: ${tempFile}, unable to delete`);
                } else {
                  console.log(`Success: ${file}, optimized!`);
                }
              });
            }
          });
        })
        .catch(() => {
          console.error(`Failed: ${file}, failed to minimize`);
        });
    });
  }
});
