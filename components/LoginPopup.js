import React, { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from 'next/link';
import { Signin } from '../utils/helpers/Email/signIn';

function LoginPopup() {
const [isOpen, setIsOpen] = useState(true); 
  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(true)} className="relative z-50">
          <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-5xl bg-yellow-300 text-left flex flex-col -200 w-[500px] items-center h-[300px] space-y-4 border p-12">
              <DialogTitle className="font-bold text-[20px]">Login To View Dashboard</DialogTitle>
              <Description></Description>
              <div className="flex gap-4">
                <Link onClick={() => setIsOpen(false)} href={'/'} className="bg-gray-300 p-2 rounded">Cancel</Link>
                <button onClick={Signin} className="bg-blue-500 p-2 rounded text-white">Login</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
    </div>
  )
}

export default LoginPopup