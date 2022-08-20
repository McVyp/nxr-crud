import React from 'react'
import { useReducer } from 'react';
import { FiPlus } from 'react-icons/fi';
import Success from './Success';
import Bug from './bug';
import {useQuery} from 'react-query';
import {getUser}  from '../lib/helper';


export default function UpdateUserForm({formId, formData, setFormData}) {

    const {isLoading, isError, data, error} = useQuery(['users', formId], () => getUser(formId))

    if(isLoading) return <div>Loading</div>
    if(isError) return <div>Error</div>
    const {name, salary, date, email, status} = data;

    const [firstname, lastname] = name? name.split(' '): formData;

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(Object.keys(formData).length==0) return console.log("Don't have form data")
        console.log(formData)
    }
    
    
  return (
   <form className='grid lg:grid-cols-2 w-4/6 gap-4'>
        <div className='input-type'>
            <input type="text" onChange={setFormData} defaultValue={firstname} name="firstname"
            className='border w-full px-5 py-3 focus:outline-none rounded-md'  placeholder='FirstName'/>
            
        </div>
        <div className='input-type'>
        <input type="text" onChange={setFormData} defaultValue={lastname} name="lastname"
            className='border w-full px-5 py-3 focus:outline-none rounded-md'  placeholder='LasttName'/>
        </div>
        <div className='input-type'>
            <input type="email" onChange={setFormData} defaultValue={email}  name="email"
            className='border w-full px-5 py-3 focus:outline-none rounded-md'  placeholder='Email'/>
        </div>
        <div className='input-type'>
            <input type="number" onChange={setFormData} defaultValue={salary} name="salary"
            className='border w-full px-5 py-3 focus:outline-none rounded-md'  placeholder='Salary'/>
        </div>
        <div className='input-type'>
            <input type="date"  onChange={setFormData} defaultValue={date} name="date"
            className='border px-5 py-3 focus:outline-none rounded-md'  placeholder='Date'/>
        </div>
        <div className='flex gap-10 items-center'>
            <div className='form-check'>
                <input type="radio" onChange={setFormData}  defaultChecked={status == "Active"}value="active" id="radioDefault1" name='status' className='form-checko-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus-outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'/>
                <label htmlFor="radioDefault1" className='inline-block text-gray-800'>Active</label>
            </div>
            <div className='form-check'>
                <input type="radio" defaultChecked={status !== "Active"} onChange={setFormData} value="inactive" id="radioDefault2" name='status' className='form-checko-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus-outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'/>
                <label htmlFor="radioDefault2" className='inline-block text-gray-800'>Inactive</label>
            </div>
        </div>
        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Update <span className='px-1'><FiPlus size={24}/></span></button>
   </form>
  )
}
