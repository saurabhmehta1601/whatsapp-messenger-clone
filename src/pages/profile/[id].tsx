import { PageLayout } from "layouts/PageLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@Styles/profile.module.scss";
import { ImageUpload } from "@Components/ImageUpload";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [previewSrc, setPreviewSrc] = useState("");

  return (
    <PageLayout>
      <div className={styles.form}>
        <div className={styles.imageWrapper}>
          <ImageUpload
            handleImageChange={(e) => {}}
            previewSrc={previewSrc}
            style={{ transform: "scale(0.8)" }}
          />
        </div>
        <div className={styles.bio}>
          <div className={styles.rowColumns}>
            <div className={styles.formControl}>
              <label htmlFor="displayName">Display Name</label>
              <input type="text" name="displayName" id="displayName" />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="phoneNo">Phone No</label>
              <input type="text" name="phoneNo" id="phoneNo" />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="status">Status</label>
            <textarea name="status" id="status" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
