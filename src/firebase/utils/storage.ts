import { storage } from "@Firebase/app";
import { ref, uploadBytes } from "firebase/storage";

/**
 *
 * @param img File object
 * @param imgName unique name for image
 */

export const uploadImgToStore = (
  img: File,
  imgName: string,
  callback: (snapshot: any) => void
) => {
  const imgRef = ref(storage, `group-images/${imgName}`);
  uploadBytes(imgRef, img).then((snapshot) => {
    callback(snapshot);
  });
};
