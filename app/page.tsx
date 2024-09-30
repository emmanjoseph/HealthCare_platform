import PatientForm from '@/components/Forms/PatientForm';
import PasskeyModal from '@/components/PasskeyModal';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = ({searchParams}:SearchParamProps) => {
  const isAdmin = searchParams.admin === 'true'; // Fix here

  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PasskeyModal />} {/* Modal will appear if admin query param is 'true' */}

      {/* Main Section */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image 
            src='/assets/icons/logo-full.svg'
            alt='logo'
            width={1000} 
            height={1000}
            className='mb-12 h-10'
          />

          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 Carepulse
            </p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image 
        src='/assets/images/onboarding-img.png' 
        alt=''
        width={1000}
        height={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}

export default Home;
