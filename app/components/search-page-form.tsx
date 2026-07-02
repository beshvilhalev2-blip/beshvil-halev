"use client";

import SearchAutocomplete from "@/app/components/search-autocomplete";

type SearchPageFormProps = {
  initialQuery?: string;
};

export default function SearchPageForm({ initialQuery = "" }: SearchPageFormProps) {
  return <SearchAutocomplete variant="page" initialQuery={initialQuery} />;
}
