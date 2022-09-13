import { storage } from "@Firebase/app";
import { ref, uploadBytes } from "firebase/storage";

export const uploadFile = (
  fileBlob: File,
  location: string,
  callback?: (snapshot: any) => void
) => {
  const fileRef = ref(storage, location);
  uploadBytes(fileRef, fileBlob).then((snapshot) => {
    if (callback) callback(snapshot);
  });
};
