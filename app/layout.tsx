import "./global.scss";

import { ReactNode } from "react";
import classNames from "classnames";

export const metadata = {
  title: "Ming's Blog",
  description: "Hello!",
};

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <html>
      <body >{children}</body>
    </html>
  );
};

export default Layout;
