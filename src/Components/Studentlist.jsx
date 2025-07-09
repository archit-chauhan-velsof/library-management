import { useState } from 'react';

import ReactPaginate from 'react-paginate';
import items from '../data/studentsList.json';
import { NavLink, useParams } from 'react-router-dom';
import {itemsPerPage,pageRangeDisplayed} from '../config';

const Items = ({ currentItems }) => {
    return (
        <div className='flex justify-center items-center'>
            <div className='rounded-md'>
                <h2 className='text-4xl text-center text-gray-600'>Student List</h2>
                <table className='border-gray-200 border-collapse'>
                    <thead>
                        <tr className='text-white'>
                            <th className='border p-5 bg-gray-500'>Student ID</th>
                            <th className='border p-5 bg-gray-500'>Student Name</th>
                            <th className='border p-5 bg-gray-500'>Age</th>
                            <th className='border p-5 bg-gray-500'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.length > 0 &&
                            currentItems.map((row) => (
                                <tr key={row.id} className='even:bg-gray-50  odd:bg-gray-300 border-gray-200'>
                                    <td className='border p-3'>{row.id}</td>
                                    <td className='border p-3'>{row.title}</td>
                                    <td className='border p-3'>{row.age}</td>
                                    <td className='border'><NavLink to={`/studentlist/${row.id}`} className='p-3'>View</NavLink></td>
                                </tr>
                            ))}
                        {!currentItems?.length && (
                            <tr>
                                <td colSpan="100%">No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const Studentlist = () => {

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //   `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    const { id } = useParams();
    if (!id) {
        return (
            <div className='bg-white w-full h-full rounded-md shadow flex flex-col gap-10 justify-center items-center'>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={pageRangeDisplayed}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='flex gap-3 bg-gray-200 p-4 border rounded-md' activeClassName='px-2 bg-white rounded-md' previousClassName='font-bold' nextClassName='font-bold' />

            </div>
        )
    }
    else {
        let student = items.find((i) => i.id === parseInt(id));
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className='border w-[20vw] flex flex-col'>
                    <div className='flex justify-around px-6'><span className="mx-2">ID:</span><span className="mx-2">{student.id}</span></div>
                    <div className='flex justify-around px-6'><span className="mx- text-left">Name:</span><span className="mx-2">{student.title}</span></div>
                    <div className='flex justify-around px-6'><span className="mx-2">Age:</span><span className="mx-2">{student.age}</span></div>
                </div>
            </div>
        )
    }

}

export default Studentlist