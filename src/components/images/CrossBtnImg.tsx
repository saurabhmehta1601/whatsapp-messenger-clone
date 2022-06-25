import React, { ComponentPropsWithoutRef } from "react";

export const CrossBtnImg = (props: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...props}>
      <path
        fill="currentColor"
        d="m12.174 4.661-.836-.835L8 7.165 4.661 3.826l-.835.835L7.165 8l-3.339 3.339.835.835L8 8.835l3.338 3.339.836-.835L8.835 8l3.339-3.339z"
      ></path>
    </svg>
  );
};
