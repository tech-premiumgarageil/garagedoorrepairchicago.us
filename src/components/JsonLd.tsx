import type { Thing, WithContext } from "schema-dts";

/** Renders a JSON-LD script tag. `<` is escaped to prevent script injection. */
export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
