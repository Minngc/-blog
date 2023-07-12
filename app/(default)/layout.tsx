import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return <>This is other Global Layout2. {children}</>;
};

export default Layout;
