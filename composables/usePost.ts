export const usePost = () => {
  interface Post {
    title: string;
    path: string;
    categorys: string[];
    image: string;
    description: string;
    date: string;
  }
  const posts = useState<{
    list: Post[];
    totalList: number;
    currentPage: number;
    totalPage: number;
  }>("posts", () => {
    return {
      list: [],
      totalList: 0,
      currentPage: 0,
      totalPage: 0,
    };
  });

  const updatePosts = async (currentPage = 1, currentSort = "desc") => {
    // 排序

    if (!["desc", "asc"].includes(currentSort)) {
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
    //-轉大寫;
    const sortToUpperCase = currentSort.toUpperCase() as "ASC" | "DESC";

    const { data: postList } = await useAsyncData("posts", () => {
      return queryCollection("posts")
        .order("date", sortToUpperCase)
        .select("title", "path", "categorys", "image", "description", "date")
        .all();
    });

    // 一頁限有幾筆文章
    const LimitItemsInPage = 2;
    const totalPage = postList.value?.length
      ? Math.ceil(postList.value.length / LimitItemsInPage)
      : 0;

    // 如果當前頁數大於總頁數，則顯示 404 頁面
    if (currentPage > totalPage) {
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }

    if (postList.value && postList.value.length > 0) {
      // 目前頁面的文章列表
      const currentPagePostList = postList.value?.slice(
        (currentPage - 1) * LimitItemsInPage,
        currentPage * LimitItemsInPage
      );
      posts.value = {
        list: currentPagePostList || [],
        totalList: postList.value.length,
        currentPage,
        totalPage,
      };
    }
  };

  return {
    updatePosts,
    posts,
  };
};
