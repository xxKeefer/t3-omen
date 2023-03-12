import { type TableValue } from "@sanity/table";
import React from "react";

export type PortableTableProps = {
  value: TableValue;
};

export const PortableTable = ({ value }: PortableTableProps) => {
  return (
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
  );
};
