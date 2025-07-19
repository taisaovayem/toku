import { getAllPost } from "@/helpers";
import { Badge, Box, Heading } from "@radix-ui/themes";
import { PostList } from "@/components";
import { Metadata } from "next";
import { CommontLayout } from "@/components/CommonLayout";
export const metadata: Metadata = {
  title: "Tokusatsu Bookmark",
  description: "Tổng hợp link phim tokusatsu từ các nhóm dịch",
};

export default async function Page() {
  const allPostData = await getAllPost();
  const postSorted = allPostData.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <CommontLayout>
      <Box
        p="4"
        style={{ background: "var(--gray-a3)", borderRadius: "var(--radius-4)" }}
      >
        <Heading className="mb-4">Tokusatsu Bookmark</Heading>
        <Badge className="mb-4" color="pink">
          Tổng hợp link phim tokusatsu từ các nhóm dịch
        </Badge>
      </Box>
      <article>
        <PostList posts={postSorted} />
      </article>
    </CommontLayout>
  );
}
