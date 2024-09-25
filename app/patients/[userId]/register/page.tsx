
import RegisterForm from '@/components/Forms/RegisterForm'
import { getUser } from '@/lib/actions/patients.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params:{userId}}:SearchParamProps) => {
  const user = await getUser(userId)
  return (
    <div
    className='flex h-screen max-h-screen'>
   
    <section className="remove-scrollbar container my-auto">
      <div className="subcontainer max-w-[496px]">
        <Image src='/assets/icons/logo-full.svg'
         alt='logo'
          width={1000} 
          height={1000}
        className='mb-12 h-10'
        />

        <RegisterForm user={user}/>
        <div className="text-14-regular mt-20 flex justify-between">
       <p className="justify-items-end text-dark-600 xl:text-left">
       &copy; 2024 Carepulse
       </p>
       <Link href='/?admin=true'
       className='text-green-500'
       >
        Admin
       </Link>
        </div>
      </div>
    </section>
    <Image src='/assets/images/register-img.png' alt=''
    width={1000}
    height={1000}
    className='side-img max-w-[390px]'
    />
    </div>
  )
}

export default Register