interface Post {
  title: string;
  path: string;
  categories: string[];
  image: string;
  description: string;
  date: string;
}

type SortOrder = "ASC" | "DESC";
export const usePost = () => {
  const limitCount = 9;
  const isLoading = useState<boolean>("loading", () => false);
  const posts = useState<{
    list: Post[];
    totalPosts: number;
    currentPage?: number;
    totalPage?: number;
  }>("posts", () => {
    return {
      list: [],
      totalPosts: 0,
    };
  });

  const validateAndFormatSortOrder = (sort: string) => {
    if (["desc", "asc"].includes(sort)) {
      return sort.toUpperCase() as SortOrder;
    } else {
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
  };

  const setPosts = async (sort: SortOrder = "DESC") => {
    const { data } = await useAsyncData("posts", () => {
      return queryCollection("posts")
        .order("date", sort)
        .select("title", "path", "categories", "image", "description", "date")
        .all();
    });

    if (data.value && data.value.length > 0) {
      posts.value.list = data.value;
      posts.value.totalPosts = data.value?.length;
    }
  };

  const filteredPostsInCategory = (category: string) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    const postsInCategory = posts.value.list.filter((post) =>
      post.categories.includes(category)
    );

    if (postsInCategory && postsInCategory.length > 0) {
      posts.value.list = postsInCategory;
      posts.value.totalPosts = postsInCategory.length;
    }
  };

  const setPaginatePosts = (limitCount = 1, currentPage = 1) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    // 一頁限有幾筆文章
    const totalPage = Math.ceil(list.length / limitCount);

    // 頁面的文章
    const postsInPage = list.slice(
      (currentPage - 1) * limitCount,
      currentPage * limitCount
    );

    posts.value = {
      list: postsInPage,
      currentPage,
      totalPage,
      totalPosts: list.length,
    };
  };

  const updatePosts = async (currentPage = 1, currentSort = "desc") => {
    isLoading.value = true;
    const sort = validateAndFormatSortOrder(currentSort);

    await setPosts(sort || "DESC");

    setPaginatePosts(limitCount, currentPage);
    isLoading.value = false;
  };

  const updatePostsInCategory = async (
    currentPage = 1,
    currentCategory = ""
  ) => {
    isLoading.value = true;
    await setPosts();
    filteredPostsInCategory(currentCategory);
    setPaginatePosts(limitCount, currentPage);
    isLoading.value = false;
  };

  return {
    updatePosts,
    posts,
    isLoading,
    updatePostsInCategory,
  };
};
