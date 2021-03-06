import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createCtx } from './createCtx';
import { Link, Category } from 'interfaces';
import { checkIfCategory } from '../interfaces/index';

export const [useLinksContext, Provider] = createCtx<{
  links: readonly Link[];
  setLinks: (links: Link[]) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}>();

export const LinksProvider: React.FC<{
  children: React.ReactElement | React.ReactElement[];
  ssrLinks: Link[] | [];
}> = ({ children, ssrLinks }) => {
  const router = useRouter();
  const { query } = router;

  const initialSearchValue = query.search
    ? Array.isArray(query.search)
      ? query.search[0]
      : query.search
    : null;

  const initialCategory = query.category
    ? Array.isArray(query.category)
      ? query.category[0]
      : query.category
    : null;

  const [links, setLinks] = useState<readonly Link[]>(ssrLinks);
  const [searchQuery, setSearchQuery] = useState<string | null>(initialSearchValue);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    checkIfCategory(initialCategory) ? initialCategory : null
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    const newParams = params.toString();
    router.replace(newParams ? `/?${newParams}` : '/');
  }, [searchQuery, selectedCategory]);

  const withCategoryFilter = selectedCategory
    ? links.filter((link: Link) => link.category === selectedCategory)
    : links;

  const filteredLinks = searchQuery
    ? withCategoryFilter.filter((link: Link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : withCategoryFilter;

  return (
    <>
      <Provider
        value={{
          links: filteredLinks,
          setLinks,
          searchQuery,
          setSearchQuery,
          selectedCategory,
          setSelectedCategory,
        }}
      >
        {children}
      </Provider>
    </>
  );
};
