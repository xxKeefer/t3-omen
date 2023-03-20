import React, { type SVGProps } from "react";

export const SpacemanHead = ({
  width,
  height,
  className,
}: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || "63.547"}
      height={height || "48.452"}
      version="1.1"
      viewBox="0 0 105.547 89.452"
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
          id="linearGradient469"
          x1="88.514"
          x2="622.281"
          y1="205.192"
          y2="555.225"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#outer-bg"
        ></linearGradient>
        <linearGradient
          id="linearGradient471"
          x1="367.468"
          x2="708.113"
          y1="355.397"
          y2="425.136"
          gradientTransform="translate(0 -1.341)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#inner-bg"
        ></linearGradient>
        <linearGradient
          id="linearGradient473"
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
        transform="translate(-81.842 -34.895) scale(.34141)"
      >
        <circle
          cx="394.29"
          cy="402.337"
          r="366.127"
          fill="url(#linearGradient469)"
          fillOpacity="1"
          display="none"
        ></circle>
        <circle
          cx="394.29"
          cy="402.337"
          r="339.304"
          fill="url(#linearGradient471)"
          fillOpacity="1"
          display="none"
        ></circle>
        <circle
          cx="394.29"
          cy="219.944"
          r="92.537"
          fill="url(#linearGradient473)"
          fillOpacity="1"
          strokeWidth="0.841"
        ></circle>
        <path
          fill="#fff"
          strokeWidth="1.332"
          d="M399.33 102.244a131.04 131.04 0 00-9.416.12c-50.76 2.461-91.028 34.093-108.917 86.435-23.287 21.82-34.438 45.093-37.39 69.352l-.183 64.982c10.914-11.183 22.83-21.906 36.189-31.939-6.968-23.734-8.549-31.283-7.523-35.36l14.868-2.156c2.955 14.046 6.933 28.196 18.404 43.094-30.441 12.994-54.503 33.056-65.645 67.441h309.148c-11.143-34.385-35.21-54.447-65.651-67.441 11.47-14.898 15.454-29.049 18.409-43.094l14.868 2.156c1.026 4.077-.554 11.626-7.523 35.36 13.36 10.033 25.27 20.756 36.184 31.939l-.177-64.982c-2.953-24.26-14.104-47.533-37.391-69.352-23.088-58.668-61.693-85.463-108.253-86.555zm-5.028 25.675c50.073 0 90.667 40.595 90.668 90.668 0 50.073-40.594 90.667-90.668 90.667-50.075.001-90.669-40.593-90.668-90.667 0-50.074 40.594-90.669 90.668-90.668z"
          display="inline"
        ></path>
      </g>
      <path
        fill="olive"
        strokeWidth="1"
        d="M-92.008 88.781H212.09200000000004V230.94H-92.008z"
        display="none"
      ></path>
    </svg>
  );
};
