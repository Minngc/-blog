import Link from "next/link";

const TitleListPanel = (props: {
  tocHead: (
    | { type: "nolist"; href: string; value: string }
    | {
        type: "haslist";
        href: string;
        value: string;
        children: { href: string; value: string }[];
      }
  )[];
}) => {
  return (
    <div style={{ position: "sticky", top: "60px"}}>
      <nav>
        <ul style={{ position: "sticky", top: "60px", float: "right" }}>
          {props.tocHead.map((value) => {
            if (value.type === "nolist") {
              return (
                <TitleLi
                  key={`headLink_${value.href}`}
                  href={value.href}
                  content={value.value}
                />
              );
            } else {
              return (
                <li key={`headLink_${value.href}`}>
                  <a href={value.href}>{value.value}</a>
                  <ul>
                    {value.children.map((h3Title) => {
                      return (
                        <TitleLi
                          key={`headLink_${h3Title.href}`}
                          href={h3Title.href}
                          content={h3Title.value}
                        />
                      );
                    })}
                  </ul>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
};

const TitleLi = (props: {
  className?: string;
  href: string;
  content: string;
}) => {
  const { content, className, href } = props;
  return (
    <li>
      <a className={className} href={href}>
        {content}
      </a>
    </li>
  );
};

export { TitleListPanel };
