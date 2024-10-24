import React from 'react'
import { Button } from '../ui/button'


function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 bg-[#6A9C89]'>
        <img src='/logo.svg'/>
        <div>
          
            <Button className='hover:bg-[#20881c]'>Sign in</Button>
        </div>
    </div>
  )
}

export default Header