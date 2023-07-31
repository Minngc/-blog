import classNames from "classnames";
import styles from "./page.module.scss";
import { Line } from "@/components/line";
import { Avatar } from "@/components/avatar";

const HomeSidebar = () => {
  return (
    <>
      <div className={classNames(styles.notice)}>
        <div className={classNames(styles.noticeHeader)}>
          <div className={styles.noticeTitle}>公告</div>
          <div className={styles.noticeDate}>07/29/2023</div>
        </div>
        <Line />
        <div className={classNames(styles.noticeContainer)}>
          博客建设工作仍在进行中，已经发布一些测试博文，之后会发布更多博文。
        </div>
      </div>

      <div className={classNames(styles.notice)}>
        <div className={classNames(styles.noticeHeader)}>
          <div className={styles.noticeTitle}>アニメ</div>
          {/* <div>07/29/2023</div> */}
        </div>
        <Line />
        <div className={classNames(styles.animeContainer)}>
          <div className={classNames(styles.animeCard)}>
            <Avatar size={70} />
            <div className={classNames(styles.animeMessage)}>
              <div className={classNames(styles.animeTitle)}>
                异世界XX冒险录
              </div>
              <div className={classNames(styles.animeType)}>
                类型: 轻改 异世界 后宫
              </div>
              <div className={classNames(styles.animeState)}>
                连载状态: 月曜日
              </div>
            </div>
          </div>

          <div className={classNames(styles.animeCard)}>
            <Avatar size={70} />
            <div className={classNames(styles.animeMessage)}>
              <div className={classNames(styles.animeTitle)}>
                异世界XX冒险录
              </div>
              <div className={classNames(styles.animeType)}>
                类型: 轻改 异世界 后宫
              </div>
              <div className={classNames(styles.animeState)}>
                连载状态: 月曜日
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.notice)}>
        <div className={classNames(styles.noticeHeader)}>
          <div className={styles.noticeTitle}>标签</div>
          {/* <div>07/29/2023</div> */}
        </div>
        <Line />
        <div className={classNames(styles.tagContainer)}>
          <div className={classNames(styles.tag)}>
            <div>language:</div>
            <div>#tag1 #tag2 #tag3</div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.notice)}>
        <div className={classNames(styles.noticeHeader)}>
          <div className={styles.noticeTitle}>日志</div>
          {/* <div>07/29/2023</div> */}
        </div>
        <Line />
        <div className={classNames(styles.logContainer)}>
          <div className={classNames(styles.log)}>
            <div className={classNames(styles.logDate)}>2023-07-29:</div>
            <div className={classNames(styles.logMsg)}>制作了新的 SideBar</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeSidebar;
