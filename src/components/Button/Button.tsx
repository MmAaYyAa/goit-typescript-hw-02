import React from "react";
import { BtnLoadMore } from "./Button.styled";
import { ButtonProps } from "../ComponentsProps/Props.types";

const Button: React.FC<ButtonProps> = ({ handleBtnLoad }) => {
  return (
    <BtnLoadMore onClick={handleBtnLoad} type="button">
      Load more
    </BtnLoadMore>
  );
};
export default Button;
