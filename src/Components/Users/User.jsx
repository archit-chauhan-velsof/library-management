import { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import axios from 'axios';
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
        axios.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`,{
            name,phone,email,
            company:{name:companyName},
            website
        }).then((res)=>console.log(res.data)).catch((err)=>console.log(err));
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

                <div><span className="font-bold">Name : </span>{user?.name || ''}</div>
                <div><span className="font-bold">Phone : </span>{user?.phone || ''}</div>
                <div><span className="font-bold">Email : </span>{user?.email || ''}</div>
                <div><span className="font-bold">Company : </span>{user?.company?.name || ''}</div>
                <div><span className="font-bold">Website : </span>{user?.website || ''}</div>
                <div><span className="font-bold">Address : </span>{`${user?.address?.street || ''} , ${user?.address?.city || ''} (${user?.address?.zipcode || ''})`} </div>

            </div>
            <div className='flex flex-col justify-around'>
                <button className='p-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md' >
                    Delete
                </button>
                <button className='p-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md' onClick={() => setEdit(true)}>
                    Edit
                </button>
            </div>


        </div>
        )
    }
    else {
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