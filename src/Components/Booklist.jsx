import { useState } from 'react';

import ReactPaginate from 'react-paginate';
// import items from '../../Data/booksList.json';
import {itemsPerPage,pageRangeDisplayed} from '../config';

import { useSelector } from 'react-redux';



const  Items = ({ currentItems }) => {

  return (

    <div className='flex justify-center items-center'>
      <div className='rounded-md'>
        <h2 className='text-4xl text-center text-gray-600'>Book List</h2>
        <table className='border-gray-200 border-collapse'>
          <thead>
            <tr className='text-white'>
              <th className='border p-5 bg-gray-500'>Book ID</th>
              <th className='border p-5 bg-gray-500'>Book Name</th>
              <th className='border p-5 bg-gray-500'>Author Name</th>
            </tr>
          </thead>
          <tbody>
          
            {
              currentItems?.map((row) => (
                <tr key={row.id} className='even:bg-gray-50  odd:bg-gray-300 border-gray-200'>
                  <td className='border p-3'>{row.id}</td>
                  <td className='border p-3'>{row.title}</td>
                  <td className='border p-3'>{row.author}</td>
                </tr>
              ))}
            {
              !currentItems.length && <tr>No Data Found</tr>
            }
          </tbody>
        </table>
      </div>
    </div>

  );
}

const Booklist = () => {
  const items = useSelector((state) => state.books.books);

 




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
        className=' flex gap-3 bg-gray-200 p-4 border rounded-md' activeClassName='px-2 bg-white rounded-md' previousClassName='font-bold' nextClassName='font-bold' />

    </div>
  )
}

export default Booklist