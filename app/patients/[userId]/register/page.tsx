
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
   
    <section className="remove-scrollbar container flex-1 flex-col py-12">
      <div className="sub-container max-w-[860px]">
        <Image src='/assets/icons/logo-full.svg'
         alt='logo'
          width={1000} 
          height={1000}
        className='mb-12 h-10'
        />

        <RegisterForm user={user}/>
      
       <p className=" my-5 text-[13px] justify-items-end text-dark-600 xl:text-left">
       &copy; 2024 Carepulse
       </p>
      
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