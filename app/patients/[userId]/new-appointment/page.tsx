

import AppointmentForm from '@/components/Forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patients.actions'
import Image from 'next/image'
import React from 'react'

const AppointmentPage = async ({params:{userId}}:SearchParamProps)=> {

    const patient = await getPatient(userId)
  return (
    <div
    className='flex h-screen max-h-screen'>
      {/* verification modal OTP */}
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px]">
        <Image src='/assets/icons/logo-full.svg'
         alt='logo'
          width={1000} 
          height={1000}
        className='mb-12 h-10'
        />

        <AppointmentForm
        type='create'
        userId={userId}
        patientId={patient.$id}

        />
        <div className="text-14-regular mt-20 flex justify-between">
       <p className="justify-items-end text-dark-600 xl:text-left">
       &copy; 2024 Carepulse
       </p>
      
        </div>
      </div>
    </section>
    <Image src='/assets/images/appointment-img.png' alt=''
    width={1000}
    height={1000}
    className='side-img max-w-[390px]'
    />
    </div>
  )
}

export default AppointmentPage