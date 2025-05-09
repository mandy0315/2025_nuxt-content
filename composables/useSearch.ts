import { pageMap } from "@/utils/pageMap";

type Collection = "posts";
interface Post {
  title: string;
  description: string;
}
interface Page {
  title: string;
  path: string;
}

const useSearch = async () => {
  const { getCategories } = useCategory();
  const posts = useState<Post[]>("searchPosts", () => []);
  const categories = useState<string[]>("searchCategories", () => []);
  const pages = useState<Page[]>("searchPages", () => []);

  // 搜尋文章
  const searchInCollection = async (
    collection: Collection,
    keyword: string,
    fields: string[]
  ) => {
    try {
      const posts = await queryCollection(collection)
        .orWhere((q) => {
          for (const field of fields) {
            q.where(field, "LIKE", `%${keyword}%`);
          }
          return q;
        })
        .select("title", "description")
        .all();
      return posts;
    } catch (error) {
      console.error("搜尋文章錯誤", error);
      return [];
    }
  };

  // 搜尋分類
  const searchInCategories = async (keyword: string) => {
    const categories = await getCategories();
    if (keyword === "") return categories || [];
    return (
      categories?.filter((category) => {
        return category.toLowerCase().includes(keyword.toLowerCase());
      }) || []
    );
  };

  // 搜尋頁面
  const searchInPages = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    const pagesValues = pageMap.values();
    if (keyword === "") return Array.from(pagesValues);

    const searchPages = [];
    for (let val of pagesValues) {
      const path = val.path.toLowerCase();
      const title = val.title.toLowerCase();
      const isMatch =
        path.includes(lowerKeyword) || title.includes(lowerKeyword);

      isMatch && searchPages.push(val);
    }
    return searchPages;
  };

  const updatedKeywords = async (keywords: string) => {
    const [kPosts, kCategories] = await Promise.all([
      searchInCollection("posts", keywords, ["title", "description"]),
      searchInCategories(keywords),
    ]);
    const kPages = searchInPages(keywords);

    posts.value = kPosts;
    categories.value = kCategories;
    pages.value = kPages;
  };

  return { posts, categories, pages, updatedKeywords };
};

export default useSearch;
