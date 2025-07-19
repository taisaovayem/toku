"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, DataList, Link } from "@radix-ui/themes";
import { removeAccentsLetterOnly } from "@/helpers/string";
import {
  MagnifyingGlassIcon,
  CrossCircledIcon,
  DoubleArrowDownIcon,
  CopyIcon,
} from "@radix-ui/react-icons";
import { Post } from "@/helpers/post";
import debounce from "lodash/debounce";
import { useDebounce } from "@/hooks";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


type PostListProps = {
  posts: Post[];
};

const PAGE_SIZE = 10;

export function PostList({ posts }: PostListProps) {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<Post[]>(posts);
  const [postListDisplay, setPostListDisplay] = useState<Post[]>([]);
  const [lastIndex, setLastIndex] = useState(0);
  const loadPoint = useRef<HTMLDivElement>(null);

  const postListDisplayDebouce = useDebounce(postListDisplay);

  function addLastIndex(pageSize = PAGE_SIZE) {
    setLastIndex((previousIndex) => previousIndex + pageSize);
  }

  function handleSearch(searchValue: string) {
    if (!searchValue) {
      setPostList(posts);
      const _postDisplay = posts.slice(0, PAGE_SIZE);
      setPostListDisplay(_postDisplay);
      setLastIndex(_postDisplay.length - 1);
    }
    if (searchValue) {
      const result = posts.filter((post) =>
        removeAccentsLetterOnly(post.title)
          .toLocaleLowerCase()
          ?.match(removeAccentsLetterOnly(searchValue.toLocaleLowerCase()))
      );
      setPostList(result);
      const _postDisplay = result.slice(0, PAGE_SIZE);
      setPostListDisplay(_postDisplay);
      setLastIndex(_postDisplay.length - 1);
    }
  }

  const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);

  function loadMore() {
    if (postList.length === postListDisplay.length) return;
    const _postNext = postList.slice(lastIndex + 1, lastIndex + 1 + PAGE_SIZE);
    addLastIndex();
    setPostListDisplay((previousPostList) =>
      previousPostList.concat(_postNext)
    );
    return true;
  }

  function infiniteScrol() {
    const loadPointPosition = loadPoint.current?.offsetTop ?? 0;
    if (loadPointPosition < window.scrollY + window.innerHeight) {
      loadMore();
    }
  }

  useEffect(() => {
    setPostList(posts);
    setPostListDisplay(posts.slice(0, PAGE_SIZE));
    setLastIndex(posts.length >= PAGE_SIZE ? PAGE_SIZE : PAGE_SIZE - 1);
  }, [posts]);

  useEffect(() => {
    const infiniteScrollDebounce = debounce(infiniteScrol, 500);
    document.addEventListener("scroll", infiniteScrollDebounce);
    return () => document.removeEventListener("scroll", infiniteScrollDebounce);
  }, [lastIndex]);

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
                    setPostListDisplay(posts);
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
        {postListDisplayDebouce.map((post) => (
          <DataList.Item key={post.title}>
            <DataList.Label minWidth="88px">
              <Link href={post.link}>{post.title}</Link>
            </DataList.Label>
          </DataList.Item>
        ))}
      </DataList.Root>
      {postListDisplayDebouce.length !== postList.length && (
        <div className="flex justify-center w-full" ref={loadPoint}>
          <DoubleArrowDownIcon className="animate-bounce text-pink-700 w-6 h-6" />
        </div>
      )}
    </>
  );
}

export default PostList;
