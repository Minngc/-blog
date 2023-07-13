import { ReactNode } from "react";

const HomeLayout = (props: { children: ReactNode }) => {
  const { children } = props
  return <>{children}</>;
};

export default HomeLayout;
