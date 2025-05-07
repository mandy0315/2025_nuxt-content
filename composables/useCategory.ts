export const useCategory = () => {
  const router = useRouter();

  const goToCategoryPage = (category: string) => {
    const path = encodeURI(`/categorys/${category}`);
    router.push(path);
  };

  const getCategories = async (limit?: number) => {
    const { data: categories } = await useAsyncData("categories", async () => {
      const selectItemInPosts = await queryCollection("posts")
        .order("date", "DESC")
        .select("title", "categorys")
        .all();
      // 從物件陣列取出 categorys 並合併成一個陣列
      let categorys = selectItemInPosts.map((item) => item.categorys).flat();
      // limit 參數用來限制取得的分類數量
      if (limit) {
        categorys = categorys.slice(0, limit);
      }
      // 用 Set 去除重複的分類
      const uniqueCategorys = Array.from(new Set(categorys));
      return uniqueCategorys;
    });
    return categories;
  };

  return { goToCategoryPage, getCategories };
};
