import { useRouter } from "next/router";
import styles from "./index.module.scss";
import classNames from "classnames";
import { MenuList } from "./menuList";

interface TopMenuProps {
  menuHidden: boolean | undefined;
}
/**
 * 页面顶端 Menu
 * @param props
 * @param props.menuHidden 当前 nav 是否处于隐藏状态
 * @returns ReactNode
 */
const TopMenu = (props: TopMenuProps) => {
  const router = useRouter();
  const { menuHidden } = props;
  const display = menuHidden !== undefined;
  return (
    <>
      {display && (
        <nav
          className={classNames(
            [styles.menuNav],
            [styles.hiddenMenuNav],
            {
              [styles.foldMenuNav]: menuHidden,
            },
          )}
        >
          <MenuList />
        </nav>
      )}
    </>
  );
};

export { TopMenu };
