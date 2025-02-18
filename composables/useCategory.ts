export const useCategory = () => {
  const router = useRouter();

  const goToCategoryPage = (category: string) => {
    const path = encodeURI(`/categorys/${category}`);
    router.push(path);
  };

  return { goToCategoryPage };
};
