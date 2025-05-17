
# Installation

`git clone` this project

`npm install` to install dependencies

`npm run dev` to start development build

----------

# What is goal of this project

-   When developing UI, sometimes we need a word template that contains spacing properly — this project solves that.
    
-   I also want to show how to use [react/tanstackQuery/queryKey](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
    

----------

# What is queryKey
- TanStack Query uses `queryKey` to uniquely identify each query. The `queryKey` is an array, and you can include variables in it. When any element in the `queryKey` array changes, TanStack Query considers it a new query.
-   Let's think like this: this project continuously fetches data, but the fetched **data** never changes — or doesn't change for a certain time — so we don’t have to fetch the **data** again. We can use caching instead.
    
-   When fetching data, it uses a `queryKey`. You can set the `queryKey` and state to define which data to fetch. For example:

```
["paragraph", 1] = dataOne  
["paragraph", 2] = dataTwo
 ```
 -   When `paragraphCount` is 1, the `queryKey` is `["paragraph", 1]`. TanStack Query caches the data fetched for this key.
    
-   When `paragraphCount` is 2, the `queryKey` is `["paragraph", 2]`. This is a different key, so TanStack Query will fetch and cache the data for this key.
    
-   If you switch back to `paragraphCount` 1, TanStack Query will look for `["paragraph", 1]` in its cache. If found and not stale, it will use the cached data.

```ts


const { isFetching, error, data, refetch } = useQuery({
  queryKey: ["paragraph", paragraphCount], // set paragraphCount to defines the query
  queryFn: () =>
    fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${paragraphCount}&start-with-lorem=1&format=html`
    ).then((res) => res.text()),
  enabled: false,
});
```

You can check more usage examples here: [TanStack Query examples](https://tanstack.com/query/latest/docs/framework/react/examples/basic) 
