import './content.style.scss'
import { useSearchQuery } from "../SearchQuery/SearchQuery.js"
import { useSearch } from '../hooks/useSearch.js'
import { useDialog } from "../../ctx/DialogContext.jsx"
import SkeletonGrid from '../SkeletonGrid/SkeletonGrid.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Content() {

    const query = useSearch()
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError, error, refetch } = useSearchQuery(query)
    const { openModal } = useDialog()

    if (!query) {
        return <EmptyState
                    icon="search"
                    title="Find something"
                    text="Enter the word in the search bar above"
                />
    }

    if (isLoading) return <SkeletonGrid count={12} />

    if (error) {
        return <EmptyState
                    icon="error"
                    title="Something went wrong"
                    text={error.message}
                    action={{ label: 'Repeat', onClick: refetch }}
                />
    }

    if (!data.pages.find((page) => page.results.length)) {
        return <EmptyState
                    icon="empty"
                    title="Nothing found"
                    text={`There are no images matching the search term "${query}". Try a different search term.`}
                />
    }

    return (<section>
        <div className='content-image'>
            {data && data.pages.map(page =>
                page.results.map(({id, urls, description}) => {
                return <div key={id} onClick={() => openModal({ url: urls.regular, description: description }) }>
                    <LazyLoadImage src={urls.small} alt={description} effect="blur" />
                </div>
            }))}
        </div>
        {isFetchNextPageError && <EmptyState icon="error" title="Something went wrong" text={'Error loading'} />}
        {isFetchingNextPage && <SkeletonGrid count={6} />}
        {hasNextPage && <button className='button-load-more' onClick={() => fetchNextPage()}>Load More</button>}
    </section>)
}

export default Content