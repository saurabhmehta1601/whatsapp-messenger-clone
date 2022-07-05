import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  children: React.ReactNode;
  options: {
    label: string;
    onSelect: () => void;
  }[];
  className?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}
export const DropDown = (props: IProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = React.useState(false);
  const handleOptionSelect = (label: string) => {
    setIsDropDownVisible(false);
    props.options.find((option) => option.label === label)?.onSelect();
  };
  return (
    <span className={styles.container} style={props.containerStyle}>
      <div
        onClick={() =>
          setIsDropDownVisible((isDropDownVisible) => !isDropDownVisible)
        }
      >
        {props.children}
      </div>
      {isDropDownVisible && (
        <div
          className={[styles.list, props.className].join(" ")}
          style={props.style}
        >
          {props.options.map((option) => (
            <div
              key={option.label}
              onClick={() => handleOptionSelect(option.label)}
              className={styles.item}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};
