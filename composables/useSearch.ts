import { pageMap } from "@/utils/pageMap";

type Collection = "posts";
interface Post {
  title: string;
  description: string;
  path: string;
}
interface Page {
  title: string;
  path: string;
}

const useSearch = () => {
  const isShowSearchModal = useState<boolean>("isShowSearchModal", () => false);
  const { getCategories } = useCategory();
  const posts = useState<Post[]>("searchPosts", () => []);
  const categories = useState<string[]>("searchCategories", () => []);
  const pages = useState<Page[]>("searchPages", () => []);
  const keywords = useState<string>("keywords", () => "");

  // 搜尋文章
  const searchInPosts = async (
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
        .select("title", "description", "path")
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
  // 設定搜尋列表
  const setSearchList = async () => {
    const [kPosts, kCategories] = await Promise.all([
      searchInPosts("posts", keywords.value, ["title", "description"]),
      searchInCategories(keywords.value),
    ]);
    const kPages = searchInPages(keywords.value);

    posts.value = kPosts;
    categories.value = kCategories;
    pages.value = kPages;
  };

  const updatedKeywords = (val: string) => {
    keywords.value = val;
    setSearchList();
  };

  const clearAllSearchList = () => {
    posts.value = [];
    categories.value = [];
    pages.value = [];
  };

  return {
    keywords,
    posts,
    categories,
    pages,
    updatedKeywords,
    isShowSearchModal,
    clearAllSearchList,
  };
};

export default useSearch;
