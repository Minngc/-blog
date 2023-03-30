// import { getMatter } from "lib/getPostFiles";
import type { GetStaticProps, GetStaticPaths } from "next";
import fs from "node:fs"

import { useEffect } from "react";

const Post = (props: any) => {
  return <>{12}</>;
};

// const getStaticPaths: GetStaticPaths = async () => {
//   const matterDate = await getMatter();
//   const pathList = matterDate.map((value) => {
//     return {
//       params: {
//         post: [...value.Date.slice(0, 2), value.Link],
//         id: `${value.Id}`,
//       },
//     };
//   });
//   return {
//     paths: [...pathList],
//     fallback: false,
//   };
// };
// const getStaticProps: GetStaticProps = async (context) => {
//   console.log(context.params);
//   console.log(fs.readdirSync('./'))
//   const file = fs.readFileSync("./")
//   return {
//     props: {
//       data: 123,
//     },
//   };
// };

// export { getStaticPaths, getStaticProps };

export default Post;
