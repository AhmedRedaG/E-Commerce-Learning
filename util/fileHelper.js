import { unlink } from "fs";
import { join } from "path";

export const deleteImage = (imagePath) => {
  try {
    const filePath = join(process.cwd(), "images", "productImages", imagePath);
    unlink(filePath, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
};
