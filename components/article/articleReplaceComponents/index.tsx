const H1 = (props: any) => {
  return <></>;
};

const H2 = (props: any) => {
  return (
    <h2 className="article-ele-h2" id={props.id}>
      {props.children}
    </h2>
  );
};

const H3 = (props: any) => {
  return (
    <h3 className="article-ele-h3" id={props.id}>
      {props.children}
    </h3>
  );
};

const H4 = (props: any) => {
  return (
    <h4 className="article-ele-h4" id={props.id}>
      {props.children}
    </h4>
  );
};

const Del = (props: any) => {
  return <del className="article-ele-del">{props.children}</del>;
};

const Anchor = (props: any) => {
  if ((props.href as string).startsWith("#"))
    return (
      <a className="article-ele-anchor" href={props.href}>
        {props.children}
      </a>
    );
  return (
    <a className="article-ele-anchor" href={props.href}>
      {props.children}
    </a>
  );
};

const Blockquote = (props: any) => {
  return (
    <blockquote className="article-ele-blockquote">{props.children}</blockquote>
  );
};

const P = (props: any) => {
  return <p className="article-ele-p">{props.children}</p>;
};

const Ol = (props: any) => {
  return <ol className="article-ele-ol">{props.children}</ol>;
};

const Ul = (props: any) => {
  return <ul className="article-ele-ul">{props.children}</ul>;
};

const Li = (props: any) => {
  return <li className="article-ele-li">{props.children}</li>;
};

const Table = (props: any) => {
  return (
    <div className="article-ele-table--container">
      <table className="article-ele-table">{props.children}</table>
    </div>
  );
};

const THead = (props: any) => {
  return <thead className="article-ele-thead">{props.children}</thead>;
};
const TBody = (props: any) => {
  return <tbody className="article-ele-tbody">{props.children}</tbody>;
};
const Tr = (props: any) => {
  return <tr className="article-ele-tr">{props.children}</tr>;
};
const Th = (props: any) => {
  return <th className="article-ele-th">{props.children}</th>;
};
const Td = (props: any) => {
  return <td className="article-ele-td">{props.children}</td>;
};
const Code = (props: any) => {
  if (!props.className) {
    return <code className="article-ele-code">{props.children}</code>;
  }
  return <code {...props} />;
};
const Hr = () => {
  return <hr className="article-ele-hr" />;
};

// export
export const articleReplaceComponents = {
  h2: H2,
  a: Anchor,
  h3: H3,
  h4: H4,
  blockquote: Blockquote,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: Tr,
  th: Th,
  td: Td,
  code: Code,
  hr: Hr,
  del: Del,
};
