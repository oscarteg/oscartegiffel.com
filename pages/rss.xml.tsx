export default function Rss() {
  return null;
}

export async function getServerSideProps(context) {
  const res = context.res;
  if (!res) {
    return;
  }
  // fetch your RSS data from somewhere here
  // const blogPosts = getRssXml(await fetchPages()());
  res.setHeader('Content-Type', 'text/xml');
  // res.write(blogPosts);
  res.end();
}
