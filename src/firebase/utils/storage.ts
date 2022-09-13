import { storage } from "@Firebase/app";
import { ref, uploadBytes } from "firebase/storage";

/**
 *
 * @param fileBlob BLOB file object
 * @param folderName name of folder to store file in
 *
 * uploads
 */

export const uploadFile = (
  fileBlob: File,
  location: string,
  callback: (snapshot: any) => void
) => {
  const imgRef = ref(storage, location);
  uploadBytes(imgRef, fileBlob).then((snapshot) => {
    callback(snapshot);
  });
};
