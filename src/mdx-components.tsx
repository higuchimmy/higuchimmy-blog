import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h3 style={{ margin: 0 }} {...props} />,
    ul: (props) => <ul style={{ margin: 0 }} {...props} />,
    li: (props) => <li style={{ margin: 0 }} {...props} />,
    // 背景色つけて、擬似要素無くす
    code: (props) => (
      <span
        style={{
          backgroundColor: "#EFEFEF",
          padding: "0.1em 0.3em",
          borderRadius: "0.2em",
        }}
        {...props}
      />
    ),
    ...components,
  };
}
