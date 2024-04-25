import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../features/users/userSlice'

const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const config = {
   headers: {
      'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      'Accept': 'application/json'
   }
}

const Users = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const users = useSelector((state) => state.users.users)
    useEffect(()=>{
      dispatch(getAllUsers(config))
    }, [])
    console.log(users)
    return (
      <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="5">15</option>
                        <option value="5">25</option>
                    </select>
                    <h2 className='text-white font-bold text-lg' >Users</h2>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Username</th>
                                <th scope='col' className='py-3 px-4'>Full Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Mobile</th>
                                <th scope='col' className='py-3 px-4'>Blocked</th>
                                <th scope='col' className='py-3 px-4'>Created</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-normal'>
                            {
                                users.map((d, i) => {
                                return(
                                  <tr key={i}>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                    {/* <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/${d.image}.jpg`} alt="" />
                                    </td> */}
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.username}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.fullname}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.email}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.mobile}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.isBlocked ? 'Blocked' : '---'}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <span>{d.createdAt}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <div className='flex justify-start items-center gap-4'>
                                            <Link to={`/admin/dashboard/seller/details/${d._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        </div>
                                    </td>
                                </tr>
                               )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* {
                    totalUsers <= parPage ? <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalUsers}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div> : ""
                } */}
            </div>
        </div>
    )
}

export default Users