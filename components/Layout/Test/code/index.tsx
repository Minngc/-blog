import { localMonoFont } from "config/global/fonts";
import { ReactNode } from "react";

const Code:React.FC<{children?:ReactNode}> = ({children}) => {
  return <code className={localMonoFont.className}>{children}</code>;
};

export default Code;
