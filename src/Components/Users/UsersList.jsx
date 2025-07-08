import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../../config';
import axios from 'axios';
import User from './User';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(`${BASE_URL}users`).then((res) => {
            console.log(res.data)
            setUsers(res.data)
        }).catch((err) => console.log(err)).finally(() => {
            setIsLoading(false);
        })

    }, []);
    return (
        <div className='bg-white w-full h-full rounded-md shadow flex flex-col gap-10 justify-center items-center'>
            <h2 className='text-4xl font-extrabold'>Users</h2>
           
                <div className='overflow-y-scroll py-10 w-full'>
                {!isLoading && 
                users?.map((u) => {
                    return <User user={u} key={u.id}/>
                })}
                {
                    isLoading && 
                    <div>Loading....</div>
                }
            </div>
        </div>
    )
}

export default UsersList