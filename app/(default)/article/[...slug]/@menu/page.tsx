async function getMd(path: string) {
  const data = await fetch(`http://localhost:3000/api/article/${path}`).then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const Menu = async (props: { params: { slug: [string, string, string] } }) => {
  const { tocHead } = (await getMd(props.params.slug[2])) as {
    tocHead: { href: string; value: string }[];
  };
  return (
    <>
      <ul>
        {tocHead.map(({ href, value }) => {
          return (
            <li key={href + " " + "value"}>
              <a href={href}>{value}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
