import {lazy,Suspense, useState} from 'react'
import Booklist from '../Components/Booklist'
import Studentlist from '../Components/Studentlist'
import AddBook from '../Components/AddBook'
// import Studentlist from '../Components/Studentlist'
import ViewStudent from '../Components/ViewStudent'
import App from '../App'
import NotFound from '../Components/NotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// lazy loading the user'sList as it uses API calls 
const UsersList = lazy(() => import('../Components/Users/UsersList'));



const Index = () => {

   
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='booklist' element={<Booklist />} />
                    <Route path='allstudent' element={<Studentlist />} />
                    <Route path='addbook' element={<AddBook />} />
                    <Route path='studentlist' element={<Studentlist />}>
                        <Route path='/studentlist/:id' element={<ViewStudent />}></Route>
                    </Route>
                    <Route path='usersList' element={<Suspense UsersList fallback = {<h4>Loading....</h4>}><UsersList/></Suspense>}></Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Index