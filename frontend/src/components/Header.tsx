import React from 'react'

function Header() {
  return (
    <div className='flex flex-row justify-between bg-gray-800 h-max px-8 py-8'>
      <div className='font-bold text-3xl text-white'>Xpedia</div>
      <div className='text-white'>Navigations</div>
      <div className='text-white'>Credentials</div>
    </div>
  )
}

export default Header
