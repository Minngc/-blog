import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      <div>This is Global Layout1.{children}</div>
    </>
  );
};

export default Layout;
