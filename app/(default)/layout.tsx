import { ReactNode } from "react";
import { TopBar } from "@/components/topBar";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default Layout;
