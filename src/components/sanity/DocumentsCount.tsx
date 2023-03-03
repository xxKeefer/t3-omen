import groq from "groq";

export const query = groq`count(*[])`;

export function DocumentsCount({ data }: { data: number }) {
  return (
    <>
      Documents: <strong>{data}</strong>
    </>
  );
}
