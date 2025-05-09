export const useCategory = () => {
  const router = useRouter();

  const goToCategoriesPage = (category: string) => {
    const path = encodeURI(`/categories/${category}`);
    router.push(path);
  };

  const getCategories = async (limit?: number) => {
    try {
      const selectItemInPosts = await queryCollection("posts")
        .order("date", "DESC")
        .select("categories")
        .all();

      let categories = selectItemInPosts.map((item) => item.categories).flat();

      if (limit) {
        categories = categories.slice(0, limit);
      }

      const uniqueCategories = Array.from(new Set(categories));
      return uniqueCategories;
    } catch (error) {
      console.error("取得分類錯誤", error);
      return [];
    }
  };

  return { goToCategoriesPage, getCategories };
};
