import { closeCreateGroupSidebar } from "@Redux/features/createGroupSidebar";
import { useAppDispatch} from "@Redux/hooks";
import { useState } from "react";
import { AddGroupInformation } from "./AddGroupInformation";
import { AddGroupParticipants } from "./AddGroupParticipants";

export const CreateGroupSidebar = () => {
  const dispatch = useAppDispatch();

  const [canEditGroupInfo, shouldEditGroupInfo] = useState(false);

  return (
    <>
      {!canEditGroupInfo ? (
        <AddGroupParticipants
          handlePrevState={() => dispatch(closeCreateGroupSidebar())}
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
