export const useCategory = () => {
  const router = useRouter();

  const goToCategoriesPage = (category: string) => {
    const path = encodeURI(`/categories/${category}`);
    router.push(path);
  };

  const getCategories = async (limit?: number) => {
    const { data: categories } = await useAsyncData("categories", async () => {
      const selectItemInPosts = await queryCollection("posts")
        .order("date", "DESC")
        .select("categories")
        .all();
      // 從物件陣列取出 categories 並合併成一個陣列
      let categories = selectItemInPosts.map((item) => item.categories).flat();
      // limit 參數用來限制取得的分類數量
      if (limit) {
        categories = categories.slice(0, limit);
      }
      // 用 Set 去除重複的分類
      const uniqueCategories = Array.from(new Set(categories));
      return uniqueCategories;
    });
    return categories;
  };

  return { goToCategoriesPage, getCategories };
};
