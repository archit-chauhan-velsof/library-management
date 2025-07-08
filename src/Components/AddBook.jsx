import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/Reducers/bookSlice";

const AddBook = () => {

    const dispatch = useDispatch();

    const [formValid, setFormValid] = useState(true);
    const [bookId, setBookId] = useState('');
    // const [bookName, setBookName] = useState('');

    const [author, setAuthor] = useState('');
    const [bookIdError, setBookIdError] = useState('');
    const [bookNameError, setBookNameError] = useState('');
    const [authorError, setAuthorError] = useState('');

    // to trigger the useEffect 
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    // to use bookname using the reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case 'changed_name':
                return { name: action.nextName };
            default:
                throw new Error('Unknown Action: ' + action.type);
        }
    };
    const intialState = { name: '' };
    const [bookName, bookNameDispatch] = useReducer(reducer, intialState);


    const validateBookId = () => {
        if (bookId.trim().length === 0 || isNaN(bookId)) {
            setBookIdError('Book ID is required and must be a number.');
            return false;
        } else {
            setBookIdError('');
            return true;
        }
    };

    const validateBookName = () => {
        if (bookName.name.trim().length === 0) {
            setBookNameError('Book Name is required.');
            return false;
        } else {
            setBookNameError('');
            return true;
        }
    };

    const validateAuthor = () => {
        if (author.trim().length === 0) {
            setAuthorError('Author is required.');
            return false;
        } else {
            setAuthorError('');
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isBookIdValid = validateBookId();
        const isBookNameValid = validateBookName();
        const isAuthorValid = validateAuthor();

        if (!isBookIdValid || !isBookNameValid || !isAuthorValid) {
            setFormValid(false);
            return;
        }
        console.log(bookId, bookName.name, author);

        dispatch(addBook({id:bookId,title:bookName.name,author}));

        setSubmitted(true);
    };

    useEffect(() => {
        if (!submitted) return;

        const timeOut = setTimeout(() => {

            navigate('/booklist');
            setSubmitted(false);
        }, 500);

        return () => clearTimeout(timeOut);
    }, [submitted]);


    return (
        <div className='bg-white w-full h-full rounded-md shadow flex flex-col gap-10 justify-center items-center'>
            <h1 className='font-semibold text-3xl'>Book Details Form</h1>
            <form action="" className="grid grid-cols-6 grid-rows-4 gap-4 w-1/2" onSubmit={handleSubmit}>
                <div className="row-span-1 col-span-2 flex items-center">
                    <label htmlFor="bookId" className="text-lg font-semibold">Book ID:</label>
                </div>
                <div className="row-span-1 col-span-4">
                    <input
                        type="text"
                        id="bookId"
                        name="bookId"
                        className="w-full p-2 border-2 rounded-md"
                        placeholder="Enter Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        onBlur={validateBookId}
                    />
                    {bookIdError && <p className='text-sm text-red-400'>{bookIdError}</p>}
                </div>

                <div className="row-span-1 col-span-2 flex items-center">
                    <label htmlFor="bookName" className="text-lg font-semibold">Book Name:</label>
                </div>
                <div className="row-span-1 col-span-4">
                    <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        className="w-full p-2 border-2 rounded-md"
                        placeholder="Enter Book Name"
                        value={bookName.name}
                        onChange={(e) => bookNameDispatch({ type: 'changed_name', nextName: e.target.value })}
                        onBlur={validateBookName}
                    />
                    {bookNameError && <p className='text-sm text-red-400'>{bookNameError}</p>}
                </div>

                <div className="row-span-1 col-span-2 flex items-center">
                    <label htmlFor="author" className="text-lg font-semibold">Author:</label>
                </div>
                <div className="row-span-1 col-span-4">
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="w-full p-2 border-2 rounded-md"
                        placeholder="Enter Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        onBlur={validateAuthor}
                    />
                    {authorError && <p className='text-sm text-red-400'>{authorError}</p>}
                </div>

                <div className="row-span-1 col-span-6 flex justify-center">
                    <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
