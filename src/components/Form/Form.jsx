import './form.style.scss'
import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router"
import { IoIosSearch } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'

const SEARCH_PARAM = 'q'

function Form() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValue, setInputValue] = useState(
        () => searchParams.get(SEARCH_PARAM) ?? ''
    )

    useEffect(() => {
        const urlQuery = searchParams.get(SEARCH_PARAM) ?? ''
        setInputValue(urlQuery)
    }, [searchParams])

    function handleSubmit(e) {
        e.preventDefault()
        const trimmed = inputValue.trim()
        if (!trimmed) return
        setSearchParams({ [SEARCH_PARAM]: trimmed })
    }

    function handleClear() {
        setInputValue('')
        setSearchParams({})
    }

    const hasValue = inputValue.trim().length > 0

    return (<form onSubmit={handleSubmit}>
        <div className="container-input-icons">
            <div className='container-input'>
                <IoIosSearch />
                <input
                    type="text"
                    name="search"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Search..."
                    spellCheck={false}
                />
            </div>
            {hasValue && <IoCloseOutline onClick={handleClear} />}
        </div>
        <button type="submit">Search</button>
    </form>)
}

export default Form