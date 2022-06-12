import React, { useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { setChatTextInput } from "@Redux/features/ui";

const EmojiPicker = (props: any) => {
  const dispatch = useAppDispatch();
  const chatTextInput = useAppSelector((state) => state.ui.chatTextInput);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new Picker({
      ...props,
      data,
      ref,
      onEmojiSelect: (emoji: any) => {
        dispatch(setChatTextInput(chatTextInput + emoji.native));
      },
    });
  }, []);

  return <div ref={ref} />;
};

export default EmojiPicker;
