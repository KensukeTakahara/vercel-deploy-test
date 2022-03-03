import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  console.log("foo getStaticProps 1");
  const data = await fetch("https://www.yahoo.co.jp/").then((res) =>
    res.text()
  );
  console.log("foo getStaticProps 2");

  if (data.length > 1000) {
    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: "/bar", // リダイレクト先
        // destination: 'https://example.com/' // 別サイトでも指定可能
      },
    };
  }

  console.log("foo getStaticProps 3");
  return {
    props: { data: "empty" }, // will be passed to the page component as props
  };
};

export async function getStaticPaths() {
  console.log("foo getStaticPaths");
  return {
    paths: [],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false,
  };
}

const Foo: NextPage = () => {
  console.log("foo");
  const router = useRouter();
  const { id } = router.query;

  console.log(`foo: ${id}`);

  return <p>Post: {id}</p>;
};

export default Foo;
