import { PageLayout } from "layouts/PageLayout";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styles from "@Styles/profile.module.scss";
import { ImageUpload } from "@Components/ImageUpload";
import { addUserToFirestoreIfNotExists } from "@Firebase/utils/db/CRUD";
import { uploadFile } from "@Firebase/utils/storage";
import { getDownloadURL } from "firebase/storage";
import { useFirebaseAuth } from "@Hooks/useFirebaseAuth";

const Profile = () => {
  const router = useRouter();

  const loggedUser = useFirebaseAuth();

  console.log("activeUser", loggedUser);
  const { id: userId } = router.query;
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNo] = useState("");
  const [status, setStatus] = useState("");

  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    console.log("form is submitted ")
    e.preventDefault();
    const target = e.target as typeof e.target & {
      displayName: string;
      phoneNumber: string;
      status: string;
    };

    console.log(target.displayName);
    console.log("profileImageInputRef.current", profileImageInputRef.current);

    if (
      userId &&
      profileImageInputRef.current &&
      profileImageInputRef.current.files &&
      profileImageInputRef.current.files.length > 0
    ) {
      const image = profileImageInputRef.current.files[0];
      console.log("selected image is ", image);
      uploadFile(image, `profile-images/${userId}`, (snap) => {
        getDownloadURL(snap.ref).then((photoURL) => {
          addUserToFirestoreIfNotExists(userId as any, {
            displayName,
            groupIds: [],
            phoneNumber,
            photoURL,
            status,
          }).then(() => {
            router.push("/group");
          });
        });
      });
    }
  };

  return (
    <PageLayout>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.imageWrapper}>
          <ImageUpload
            ref={profileImageInputRef}
            onChange={(e) => {
              console.log(e.target.files);
            }}
            style={{ transform: "scale(0.8)" }}
          />
        </div>
        <div className={styles.bio}>
          <div className={styles.rowColumns}>
            <div className={styles.formControl}>
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                defaultValue={loggedUser?.displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="phoneNumber">Phone No</label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                defaultValue={loggedUser?.phoneNumber}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="status">Status</label>
            <textarea
              name="status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.submit}
            data-validated={
              displayName.length >= 3 &&
              displayName.length < 18 &&
              phoneNumber.length >= 10 &&
              status.length < 48
                ? "yes"
                : "no"
            }
          >
            SUBMIT
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default Profile;
