import React from 'react'

type PaginationProps = {
    totalPages: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}


const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
    return (
        <div className='flex gap-2 items-center justify-end p-2'>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                prev
            </button>
            <span>{page}/{totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>next</button>

        </div>
    )
}

export default Pagination
