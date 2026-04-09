import { useInfiniteQuery } from "@tanstack/react-query"

export function useSearchQuery(query){
    return useInfiniteQuery({
        queryFn: async ({ pageParam = 1 }) => {
            if (!query) return null

            const response = await fetch(
                `https://api.unsplash.com/search/photos?page=${pageParam}&query=${query}&client_id=${import.meta.env.VITE_ACCESS_KEY}`
            )

            return response.json()
        },
        getNextPageParam: (lastPage, allPages) => {
            if(allPages.length >= 10) return undefined
            if (lastPage?.total_pages > allPages.length) {
                return allPages.length + 1
            }
            return undefined
        },
        queryKey: ["Search", query],
        enabled: !!query
    })
}