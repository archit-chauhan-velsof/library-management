import React, { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance, baseUrl } from '../../config';
import axios from 'axios';
import User from './User';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createNew, setCreateNew] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');

    let handleSubmit = () => {
        axiosInstance.post(`users`).then((res)=> {
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
        setCreateNew(false);
    }


    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get(`users`).then((res) => {
            console.log(res.data)
            setUsers(res.data)
        }).catch((err) => console.log(err)).finally(() => {
            setIsLoading(false);
        })

    }, []);
    return (
        <div className='bg-white w-full h-full rounded-md shadow flex flex-col gap-10 justify-center items-center'>
            <div className='flex w-1/2 flex-row-reverse justify-between'>
                <button onClick={() => setCreateNew(!createNew)} className='bg-green-500 text-white font-semibold hover:bg-green-600 p-3 rounded-md'>Create new</button>
                <h2 className='text-4xl font-extrabold'>Users</h2>

            </div>

            <div className='overflow-y-scroll py-10 w-full'>
                {!isLoading && !createNew &&
                    users?.map((u) => {
                        return <User user={u} key={u.id} />
                    })}
                {
                    isLoading && !createNew &&
                    <div>Loading....</div>
                }
                {
                    createNew &&
                    <div className='h-full w-full flex flex-col gap-3 items-center'>

                        <div><span className="font-bold">Name : </span><input className="border" onChange={(e) => setName(e.target.value)} value={name} /></div>
                        <div><span className="font-bold">Phone : </span><input className="border" onChange={(e) => setPhone(e.target.value)} value={phone} /></div>
                        <div><span className="font-bold">Email : </span><input className="border" onChange={(e) => setEmail(e.target.value)} value={email} /></div>
                        <div><span className="font-bold">Company : </span><input className="border" onChange={(e) => setCompanyName(e.target.value)} value={companyName} /></div>
                        <div><span className="font-bold">Website : </span><input className="border" onChange={(e) => setWebsite(e.target.value)} value={website} /></div>
                        <div><span className="font-bold">Website : </span><input className="border" onChange={(e) => setAddress(e.target.value)} value={address} /></div>
                        <button className='p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-fit' onClick={()=>handleSubmit()}>Submit</button>

                    </div>
                }
            </div>
        </div>
    )
}

export default UsersList