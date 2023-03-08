import React from "react";
import Image from "next/image";

export type PortableImageProps = {
  value: {
    _key: string;
    _type: string;
    alt: string;
    dimensions: Dimensions;
    url: string;
  };
};

type Dimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

export const PortableImage = ({ value }: PortableImageProps) => {
  return (
    <Image
      className="aspect-square max-w-md self-center"
      src={value.url}
      alt={value.alt}
      height={value.dimensions.height}
      width={value.dimensions.width}
    />
  );
};
