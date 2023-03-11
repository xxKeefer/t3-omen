import { type PortableTextReactComponents } from "@portabletext/react";
import { Anchor } from "~/components/Buttons";
import { PortableImage, type PortableImageProps } from "./PortableImage";

export const portableComponentsMap = (
  anchor?: `#${string}`
): Partial<PortableTextReactComponents> => ({
  types: {
    image: ({ value }: PortableImageProps) => <PortableImage value={value} />,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-6xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-5xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-4xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-3xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-2xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-xl font-black text-white xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h6>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
});
