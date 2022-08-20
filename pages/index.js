import Head from 'next/head'
import { BiCheck, BiUserPlus, BiX } from "react-icons/bi";
import Table from '../components/Table';
import Form from '../components/Form';
import { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../redux/reducer';
import {deleteUser, getUsers} from '../lib/helper'
import {useQueryClient} from 'react-query'

export default function Home() {
  
// dark mode toggle
const [isDarkMode, setIsDarkMode] = useState(false);

  const visible = useSelector((state) => state.app.client.toggleForm)

  const deleteId = useSelector((state) => state.app.client.deleteId)
  const dispatch = useDispatch()

  const queryclient = useQueryClient(); 

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const cancelhandler = async() =>{
    console.log('cancel')
    await dispatch(deleteAction(null));
  }

  const deletehandler = async() =>{
    if(deleteId){
      await deleteUser(deleteId)
      await queryclient.prefetchQuery('users', getUsers)
      await dispatch(deleteAction(null))
    }
   
  }

  return (
    <>
    
    <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} absolute h-full w-full flex py-4 justify-center`}>
      
      <Head>
        <title>CRUD Next Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DarkModeToggle className="flex " onToggle={setIsDarkMode} />
      <main className='py-5'>
        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl md:text-5xl text-center font-bold py-10`}>Employee Management</h1>
        

        <div className="container mx-auto flex justify-between lg:p-4 py-5 border-b">
            <div className="left flex gap-3">
                <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800'>
                  Add Employee <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                </button>
            </div>
            {deleteId? DeleteComponent({deletehandler, cancelhandler}):<></>}
        </div>

        {/* collapsable form */}
        { visible ? <Form></Form> : <></>}

        {/* table */}
        <div className="container mx-auto">
          <Table></Table>
        </div>

      </main>
    </section>
    </>
    
  )
}

function DeleteComponent({deletehandler, cancelhandler}){
  return(
    <div className='flex gap-5'>
      <button>Are you sure?</button>
      <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>Yes<span className='px-1'><BiX  color='rgba(255, 255, 255)' size={25} /></span></button>
      <button onClick={cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50'>No<span className='px-1'><BiCheck  color='rgba(255, 255, 255)' size={25} /></span></button>
    </div>
  )
}

function DarkModeToggle({ colour = 'bg-blue-600', on = false, onToggle = () => {}, tabIndex = 0 }) {
  const [isOn, setIsOn] = useState(on);

  function toggle() {
    setIsOn(!isOn);
    onToggle(!isOn);
  }

  function handleClick() {
    toggle();
  }

  function handleKeyDown({ key }) {
    if (key === 'Enter') toggle();
  }

  return (
    <div
      role="checkbox"
      aria-checked={isOn ? 'true' : 'false'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={`cursor-pointer w-11 h-5 ${colour} rounded-full relative px-1.5 flex items-center${isOn ? '' : ' justify-end'}`}
    >
      <div className={`w-4 h-4 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ${isOn ? 'translate-x-6' : 'translate-x-0'}`} />
      {isOn ? (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}