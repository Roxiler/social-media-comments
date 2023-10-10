import { IconProps } from "../Icon.types";

const ReplyIcon = ({ color='#9e9e9e', size = 20 }: IconProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  xmlSpace="preserve"
  width={size}
  height={size}
  viewBox="0 0 512 512"
  style={{marginTop:"8px"}}
  fill={color}
>
  <path d="M185.2 128.6V19.7L0 204.9l185.2 185.2v-109c152.5 0 250.5 0 326.8 217.9 0-108.9 10.9-370.4-326.8-370.4z" />
</svg>
);

export default ReplyIcon;
