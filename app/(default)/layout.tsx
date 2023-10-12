import { ReactNode } from "react";
import { TopBar } from "@/components/topBar";
import { ControlPanel } from "@/components/control-panel";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <TopBar />
      {children}
      <ControlPanel />
    </>
  );
};

export default Layout;
