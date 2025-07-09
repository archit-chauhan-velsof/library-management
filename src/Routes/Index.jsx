import {lazy,Suspense, useState} from 'react'
import Booklist from '../components/Booklist'
import Studentlist from '../components/Studentlist'
import AddBook from '../components/AddBook'
// import Studentlist from '../components/Studentlist'
import ViewStudent from '../components/ViewStudent'
import App from '../App'
import NotFound from '../components/NotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// lazy loading the user'sList as it uses API calls 
const UsersList = lazy(() => import('../components/Users/UsersList'));



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