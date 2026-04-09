import './dialog.style.scss'
import { useDialog } from "../../ctx/DialogContext.jsx"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { IoCloseOutline } from "react-icons/io5"

function Dialog() {

    const {dialogRef, modalData, closeModal} = useDialog()

    function handleClick(e) {
        if (e.target === e.currentTarget) closeModal()
    }

    return (<dialog ref={dialogRef}>
        <div className={`dialog-context ${modalData ? 'active' : ''}`}
             onClick={(e) => handleClick(e)}>
            <div className='dialog-children-content'>
                <IoCloseOutline onClick={closeModal} />
                {modalData && <LazyLoadImage src={modalData.url} alt={modalData.description} effect="blur"/>}
            </div>
        </div>
    </dialog>)
}

export default Dialog