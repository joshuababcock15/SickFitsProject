import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // first thing it does it asks the read function for those items.
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are the last page
      // JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We dont have any items, we must goto the network to fetch them
        return false;
      }
      // If there are items just return them from the cache, and we dont need to goto the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }

      // We either do one of two things:

      // first things we can do is return the items bc they are already in the cache

      // The other thing we can do is return false from here(network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the apollo client comes back from the network with our product
      console.log(`Merging items from the network${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
