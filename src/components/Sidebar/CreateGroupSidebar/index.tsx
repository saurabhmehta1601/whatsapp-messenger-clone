import { createGroup } from "@Firebase/utils/db/createGroup";
import { toggleCreateGroupSidebar } from "@Redux/features/createGroupSidebar";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { AddGroupInformation } from "./AddGroupInformation";
import { AddGroupParticipants } from "./AddGroupParticipants";

export const CreateGroupSidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createGroupSidebar = useAppSelector(
    (state) => state.createGroupSidebar
  );
  const [canEditGroupInfo, shouldEditGroupInfo] = useState(false);

  return (
    <>
      {!canEditGroupInfo ? (
        <AddGroupParticipants
          handlePrevState={() => dispatch(toggleCreateGroupSidebar())}
          handleNextState={() => {
            shouldEditGroupInfo(true);
          }}
        />
      ) : (
        <AddGroupInformation
          handlePrevState={() => shouldEditGroupInfo(false)}
        />
      )}
    </>
  );
};
