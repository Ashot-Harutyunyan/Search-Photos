import { useSearchParams } from 'react-router'

const SEARCH_PARAM = 'q'

export function useSearch() {
    const [searchParams] = useSearchParams()
    return searchParams.get(SEARCH_PARAM) ?? ''
}
