import { ReactNode } from "react";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <h1 style={{ backgroundColor: "blue" }}>{children}</h1>;
};

export default Header;
