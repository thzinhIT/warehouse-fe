import Dashboard from "@/app/(auth)/(dashboard)/page";
import { cn } from "@/lib/utils";
import type { IconBaseProps } from "react-icons";

export interface IconsProps extends IconBaseProps {
  width?: number;
  height?: number;
}

export const Icons = {
  Dashboard: ({ width = 18, height = 18, ...rest }: IconsProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
      width={width}
      height={height}
      {...rest}
    >
      <metadata>
        {" "}
        Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
      </metadata>
      <g>
        <g>
          <path
            fill="#000000"
            d="M35.3,10H10v236h236v-25.3H35.3V10z M80.3,178.6c10.9,0,19.7-9.2,19.7-20.5c0-4.1-1.2-8-3.2-11.2l34.6-40.9c0.6,0,1.1,0.1,1.7,0.1s1.2,0,1.7-0.1l25.1,40.9c-2,3.2-3.2,7.1-3.2,11.2c0,11.3,8.8,20.5,19.7,20.5s19.7-9.2,19.7-20.5c0-4.3-1.3-8.3-3.4-11.6L225,93.2c0.4,0,0.9,0,1.3,0c10.9,0,19.7-9.2,19.7-20.5c0-11.4-8.8-20.5-19.7-20.5s-19.7,9.2-19.7,20.5c0,4.3,1.3,8.3,3.4,11.6l-32.2,53.3c-0.4,0-0.9,0-1.3,0c-0.6,0-1.2,0-1.7,0.1l-25.2-40.9c2-3.2,3.2-7.1,3.2-11.2c0-11.3-8.8-20.5-19.7-20.5c-10.9,0-19.7,9.2-19.7,20.5c0,4.1,1.2,8,3.2,11.2l-34.5,40.9c-0.6,0-1.2-0.1-1.8-0.1c-10.9,0-19.7,9.2-19.7,20.5C60.6,169.3,69.4,178.6,80.3,178.6z"
          />
        </g>
      </g>
    </svg>
  ),
  Loading: ({ width = 24, height = 24, className, ...rest }: IconsProps) => (
    <svg
      className={cn(`animate-spin text-black `, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      {...rest}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ),
};
