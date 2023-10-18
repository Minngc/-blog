import { ReactNode } from "react";
import { TopBar } from "@/components/topBar";
import { ControlPanel } from "@/components/control-panel";
import topmenu from "@/external/config/pages-config/topmenu.json";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <TopBar menuList={topmenu} />
      {children}
      <ControlPanel />
    </>
  );
};

export default Layout;
