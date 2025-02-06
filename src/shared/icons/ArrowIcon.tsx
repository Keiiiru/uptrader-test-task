import React from "react";

type Props = {
  style: Object;
};

const ArrowIcon = ({ style }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      height={25}
      width={25}
      fill="#fff"
      style={style}
      viewBox="-949 951 100 85"
    >
      <switch>
        <foreignObject
          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
          x="0"
          y="0"
          width="1"
          height="1"
        />
        <g>
          <path d="M-864.1,973.9c3.6,0,7.2,1.5,9.7,4.5c4.5,5.4,3.7,13.3-1.6,17.8l-34.9,29.1c-4.7,3.9-11.5,3.9-16.2,0l-34.9-29.1    c-5.4-4.5-6.1-12.4-1.6-17.8c4.5-5.4,12.4-6.1,17.8-1.6l26.8,22.3l26.8-22.3C-869.8,974.8-867,973.9-864.1,973.9z" />
        </g>
      </switch>
    </svg>
  );
};

export default ArrowIcon;
