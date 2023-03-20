import React, { type SVGProps } from "react";

export const SpacemanLogo = ({
  width,
  height,
  className,
}: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || "250"}
      height={height || "250"}
      version="1.1"
      viewBox="0 0 250 250"
      xmlSpace="preserve"
      className={className}
    >
      <defs>
        <linearGradient id="helmet">
          <stop offset="0" stopColor="#f83d92" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#371866" stopOpacity="1"></stop>
        </linearGradient>
        <linearGradient id="outer-bg">
          <stop offset="0" stopColor="#f64494" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#771972" stopOpacity="1"></stop>
        </linearGradient>
        <linearGradient id="inner-bg">
          <stop offset="0" stopColor="#010213" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#421149" stopOpacity="1"></stop>
        </linearGradient>
        <linearGradient
          id="linearGradient271"
          x1="88.514"
          x2="622.281"
          y1="205.192"
          y2="555.225"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#outer-bg"
        ></linearGradient>
        <linearGradient
          id="linearGradient273"
          x1="367.468"
          x2="708.113"
          y1="355.397"
          y2="425.136"
          gradientTransform="translate(0 -1.341)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#inner-bg"
        ></linearGradient>
        <linearGradient
          id="linearGradient275"
          x1="330.694"
          x2="222.315"
          y1="105.852"
          y2="177.572"
          gradientTransform="matrix(.84146 0 0 .84146 141.505 116.122)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#helmet"
        ></linearGradient>
      </defs>
      <g
        fill="#000"
        display="inline"
        transform="translate(-9.615 -12.363) scale(.34141)"
      >
        <circle
          cx="394.29"
          cy="402.337"
          r="366.127"
          fill="url(#linearGradient271)"
          fillOpacity="1"
          display="inline"
        ></circle>
        <circle
          cx="394.29"
          cy="402.337"
          r="339.304"
          fill="url(#linearGradient273)"
          fillOpacity="1"
          display="inline"
        ></circle>
        <circle
          cx="394.29"
          cy="219.944"
          r="92.537"
          fill="url(#linearGradient275)"
          fillOpacity="1"
          strokeWidth="0.841"
        ></circle>
        <path
          fill="#fff"
          strokeWidth="1.332"
          d="M399.332 102.246a131.033 131.033 0 00-9.417.12c-50.76 2.46-91.028 34.088-108.917 86.43-23.287 21.82-34.439 45.096-37.391 69.355l-.181 64.98c10.915-11.184 22.827-21.904 36.186-31.937-6.968-23.734-8.55-31.285-7.525-35.362l14.87-2.153c2.954 14.046 6.936 28.196 18.407 43.093-38.414 16.399-67.027 43.66-71.795 97.353l.227 86.095c-.077 9.163 13.046 22.284 29.232 22.284s29.308-13.122 29.233-22.691c-.001-.986.228-74.544.228-74.544 4.758-6.208 10.076-6.622 16.054-.213l-.108 31.621c56.848-.107 118.902-.042 171.71 0l-.108-31.621c5.978-6.409 11.297-5.995 16.054.213 0 0 .23 73.558.229 74.544-.076 9.57 13.046 22.69 29.232 22.69s29.31-13.12 29.232-22.283l.227-86.095c-4.768-53.693-33.38-80.954-71.795-97.353 11.47-14.897 15.453-29.047 18.408-43.093l14.869 2.153c1.026 4.077-.557 11.628-7.525 35.362 13.36 10.033 25.272 20.753 36.186 31.936l-.18-64.979c-2.953-24.26-14.102-47.536-37.39-69.355-23.088-58.668-61.692-85.458-108.253-86.55zm-5.028 25.673c50.073 0 90.665 40.593 90.665 90.665.001 50.074-40.591 90.668-90.665 90.668-50.075.001-90.669-40.593-90.668-90.668 0-50.073 40.594-90.666 90.668-90.665zm-4.276 237.816c.4 0 .799.026 1.195.076h47.804c.354-.045.711-.07 1.069-.076 5.395 0 9.77 4.373 9.77 9.769 0 5.395-4.375 9.77-9.77 9.768a9.625 9.625 0 01-1.07-.075h-47.929c-.354.044-.711.07-1.069.075-5.394 0-9.768-4.373-9.768-9.768 0-5.395 4.374-9.768 9.768-9.769zm0 35.261c.4.001.799.026 1.195.076h47.804c.354-.045.711-.07 1.069-.076 5.395 0 9.77 4.373 9.77 9.769s-4.375 9.77-9.77 9.768a9.625 9.625 0 01-1.07-.075h-47.929c-.354.044-.711.07-1.069.075-5.394 0-9.768-4.373-9.768-9.768 0-5.395 4.374-9.768 9.768-9.769zm-82.091 53.51l.43 45.334c107.891-3.1 91.376 102.725 95.416 114.845l68.649.863 8.417-160.393zm7.86 61.878c-2.329.056-3.37.226-5.702.511l4.532 98.365 70.59-.287-1.079-36.556c-2.552-40.091-33.416-62.863-68.341-62.033zm69.56 115.562l-69.875.108.84 44.86c-.132 10.63 15.432 25.333 34.63 25.333s34.761-14.457 34.476-26.255l-.07-44.154zm17.843.216s-.064 42.36-.068 44.291c-.285 11.798 15.278 26.01 34.476 26.01 19.199 0 34.763-14.458 34.63-25.087l.837-45.105z"
          display="inline"
        ></path>
      </g>
    </svg>
  );
};
