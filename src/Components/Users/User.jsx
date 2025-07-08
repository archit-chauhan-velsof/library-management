import { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import axios from 'axios';
import {baseUrl} from '../../config';
const User = ({ user }) => {

    // to create avatar
    const avatar = createAvatar(initials, {
        seed: user.name,
        radius: 10

    });
    const svg = avatar.toDataUri();

    // to delete the user

    // to edit the user

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [companyName, setCompanyName] = useState(user?.company?.name || '');
    const [website, setWebsite] = useState(user?.website || '');
    const [address, setAddress] = useState(`${user?.address?.street || ''} , ${user?.address?.city || ''} (${user?.address?.zipcode || ''})`)
    const [isLoading, setIsLoading] = useState(false);



    let handleEdit = () => {
        axios.patch(`${baseUrl}users/${user.id}`,{
            name,phone,email,
            company:{name:companyName},
            website
        }).then((res)=>{
            setName(res?.data?.name)
            setPhone(res?.data?.phone)
            setEmail(res?.data?.email)
            setCompanyName(res?.data?.company?.name)
            setWebsite(res?.data?.website)
            console.log(res.data);
        }).catch((err)=>console.log(err)).finally(()=> setEdit(false));
    }

    let handleDelete = () => {
        axios.delete(`${baseUrl}users/${user.id}`).then((res)=>{
            console.log(res.status);
        }).catch((err)=> console.log(err));
    }

    if (isLoading) {
        return (<div className=" w-full grid grid-cols-12 border-b p-3 mb-3 ">
            Loading....
        </div>

        )
    }

    else if (!edit && user) {
        return (<div className=" w-full grid grid-cols-12 border-b p-3 mb-3 ">

            <div className="col-span-2 p-4 rounded">
                <img src={svg} alt="user_Avatar" />
            </div>

            <div className=" col-span-9">

                <div><span className="font-bold">Name : </span>{name || ''}</div>
                <div><span className="font-bold">Phone : </span>{phone || ''}</div>
                <div><span className="font-bold">Email : </span>{email || ''}</div>
                <div><span className="font-bold">Company : </span>{companyName || ''}</div>
                <div><span className="font-bold">Website : </span>{website || ''}</div>
                <div><span className="font-bold">Address : </span>{address} </div>

            </div>
            <div className='flex flex-col justify-around'>
                <button className='p-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md' onClick={() => handleDelete()}>
                    Delete
                </button>
                <button className='p-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md' onClick={() => setEdit(true)}>
                    Edit
                </button>
            </div>


        </div>
        )
    }
    else if(edit){
        return (<div className=" w-full grid grid-cols-12 border-b p-3 mb-3 ">

            <div className="col-span-2 p-4 rounded">
                <img src={svg} alt="" srcset="" />
            </div>

            <div className=" col-span-9">

                <div><span className="font-bold">Name : </span><input className="border" onChange={(e) => setName(e.target.value)} value={name} /></div>
                <div><span className="font-bold">Phone : </span><input className="border" onChange={(e) => setPhone(e.target.value)} value={phone} /></div>
                <div><span className="font-bold">Email : </span><input className="border" onChange={(e) => setEmail(e.target.value)} value={email} /></div>
                <div><span className="font-bold">Company : </span><input className="border" onChange={(e) => setCompanyName(e.target.value)} value={companyName} /></div>
                <div><span className="font-bold">Website : </span><input className="border" onChange={(e) => setWebsite(e.target.value)} value={website} /></div>
                {/* <div><span className="font-bold">Address : </span><input className="border" onChange={(e) => setAddress(e.target.value)} value={address} /> </div> */}

            </div>
            <div className='flex flex-col justify-around'>
                <button className='p-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md' onClick={() => handleEdit()}>
                    Update
                </button>
            </div>
        </div>
        )
    }
    

}

export default User