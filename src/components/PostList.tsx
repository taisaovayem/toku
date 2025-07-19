"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, DataList, Link } from "@radix-ui/themes";
import { removeAccentsLetterOnly } from "@/helpers/string";
import { MagnifyingGlassIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Post } from "@/helpers/post";
import debounce from "lodash/debounce";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<Post[]>(posts);

  function handleSearch(searchValue: string) {
    if (!searchValue) {
      setPostList(posts);
    }
    if (searchValue) {
      const result = posts.filter((post) =>
        removeAccentsLetterOnly(post.title)
          .toLocaleLowerCase()
          ?.match(removeAccentsLetterOnly(searchValue.toLocaleLowerCase()))
      );
      setPostList(result);
    }
  }

  const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  useEffect(() => {
    handleSearchDebounce(searchText);
  }, [searchText]);

  return (
    <>
      <Box py="2">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField.Root
            placeholder="Tìm kiếm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            radius="full"
            color="indigo"
            variant="soft"
            style={{fontSize: "1rem"}}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            {searchText?.length > 0 && (
              <TextField.Slot>
                <IconButton
                  title="Xóa"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setSearchText("");
                    setPostList(posts);
                  }}
                  radius="full"
                >
                  <CrossCircledIcon />
                </IconButton>
              </TextField.Slot>
            )}
          </TextField.Root>
        </form>
      </Box>
      <DataList.Root>
        {postList.map((post) => (
          <DataList.Item key={post.title}>
            <DataList.Label minWidth="88px">
              <Link href={post.link}>{post.title}</Link>
            </DataList.Label>
          </DataList.Item>
        ))}
      </DataList.Root>
    </>
  );
}

export default PostList;
