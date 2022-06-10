import React, { useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import dynamic from "next/dynamic";

const EmojiPicker = (props: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
};

export default EmojiPicker;
