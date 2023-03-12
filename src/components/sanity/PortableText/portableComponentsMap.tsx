import { type PortableTextReactComponents } from "@portabletext/react";
import { Anchor } from "~/components/Buttons";
import { PortableImage, type PortableImageProps } from "./PortableImage";
import { type TableValue } from "@sanity/table";

export const portableComponentsMap = (
  anchor?: `#${string}`
): Partial<PortableTextReactComponents> => ({
  types: {
    image: ({ value }: PortableImageProps) => <PortableImage value={value} />,
    table: ({ value }: { value: TableValue }) => (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {value.rows.map((row, rowIndex) =>
              rowIndex === 0 ? (
                <tr key={row._key}>
                  {row.cells.map(
                    (text, cellIndex) => text && <th key={cellIndex}>{text}</th>
                  )}
                </tr>
              ) : (
                <tr key={row._key}>
                  {row.cells.map((text, cellIndex) =>
                    cellIndex === 0 ? (
                      text && <th key={cellIndex}>{text}</th>
                    ) : (
                      <td key={cellIndex}>{text}</td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-black text-white sm:text-5xl md:text-5xl lg:text-6xl xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-black text-white sm:text-4xl md:text-4xl lg:text-5xl xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-black text-white sm:text-3xl md:text-3xl lg:text-4xl xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-black text-white sm:text-2xl md:text-2xl lg:text-3xl xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-black text-white sm:text-xl md:text-xl lg:text-2xl xl:whitespace-nowrap">
        {children}
        {anchor && <Anchor href={anchor} />}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-md sm:text-md font-black text-white md:text-xl lg:text-xl xl:whitespace-nowrap">
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
