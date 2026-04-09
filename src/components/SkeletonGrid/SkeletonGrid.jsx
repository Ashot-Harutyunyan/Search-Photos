import './skeletonGrid.style.scss'

function SkeletonGrid({ count = 12 }) {
    return <div className="content-image">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="skeleton-card" />
            ))}
    </div>
}

export default SkeletonGrid