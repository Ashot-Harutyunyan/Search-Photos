import './emptyState.style.scss'
import { MdOutlineImageNotSupported, MdErrorOutline, MdOutlineImageSearch } from "react-icons/md"

const ICONS = {
    search: ( <MdOutlineImageSearch /> ),
    empty: ( <MdOutlineImageNotSupported /> ),
    error: ( <MdErrorOutline /> ),
}

function EmptyState({ icon, title, text, action }) {
    return <div className="empty-state">
        <div className={`empty-icon ${icon}`}>{ICONS[icon]}</div>
        <h2>{title}</h2>
        <p>{text}</p>
        {action && <button onClick={action.onClick}>{action.label}</button>}
    </div>
}

export default EmptyState