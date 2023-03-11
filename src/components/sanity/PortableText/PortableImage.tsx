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
      className="aspect-auto max-h-[18rem] max-w-xs self-center object-cover sm:max-h-[24rem] sm:max-w-sm md:max-h-[30rem] md:max-w-lg lg:max-h-[36rem] lg:max-w-2xl"
      src={value.url}
      alt={value.alt}
      height={value.dimensions.height}
      width={value.dimensions.width}
    />
  );
};
