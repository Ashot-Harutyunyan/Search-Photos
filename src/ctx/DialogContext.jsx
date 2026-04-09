import { createContext, use, useRef, useMemo, useState } from 'react'

const DialogCTX = createContext(null)

export default function DialogContext({ children }) {

    const [modalData, setModalData] = useState(null)
    const dialogRef = useRef(null)

    function openModal(imageData) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.paddingRight = `${scrollbarWidth}px`
        setModalData(imageData)
        dialogRef.current?.showModal()
        document.body.classList.add('no-scroll')
    }

    function closeModal() {
        document.body.style.paddingRight = '0px'
        setModalData(null)
        dialogRef.current?.close()
        document.body.classList.remove('no-scroll')
    }

    const value = useMemo(() => ({
        dialogRef, modalData, openModal, closeModal
    }), [modalData])

    return (<DialogCTX value={value}>{children}</DialogCTX>)
}

export const useDialog = () => use(DialogCTX)