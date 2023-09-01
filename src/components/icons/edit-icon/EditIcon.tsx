import React from "react";
import { IconProps } from "../Icon.types";

const EditIcon = ({ color, size = 20 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginTop: "10px" }}
    width={size}
    height={size}
    className="icon"
    viewBox="0 0 48 48"
  >
    <path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"></path>
  </svg>
);

export default EditIcon;
