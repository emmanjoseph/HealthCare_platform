
import {DataTable} from '@/components/DataTable'
import StatCard from '@/components/StatCard'
import {columns} from '@/components/table/columns'
import { getRecentAppoinmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const Admin = async () => {
 
    const appointments = await getRecentAppoinmentList()
   

  return (
    <div
    className='mx-auto flex max-w-7xl flex-col space-y-4'
    >
        <header className="admin-header">
            <Link href='/' className='cursor-pointer' >
            <Image src='/assets/icons/logo-full.svg'
            alt='icon'
            width={32}
            height={162}
            className='w-full h-8'
            />
            </Link>

            <p className="text-16-semibold">Admin Dashboard</p>
        </header>
        <main className='admin-main'>
            <div className="w-full space-y-4">
                <h1 className="header">Welcome admin &#128075;</h1>
                <p className="text-dark-700">
                    Start the day width some new appointments
                </p>
            </div>

            <section className="admin-stat">
                <StatCard
                type = 'appointments'
                count={appointments.scheduledCount}
                label="Scheduled appointments"
                icon="/assets/icons/appointments.svg"
                />
                <StatCard
                type = 'pending'
                count={appointments.pendingCount}
                label="Pending appointments"
                icon="/assets/icons/pending.svg"
                />
                <StatCard
                type = 'cancelled'
                count={appointments.cancelledCount}
                label="Cancelled appointments"
                icon="/assets/icons/cancelled.svg"
                />
              
            </section>
            <DataTable
            columns = {columns}
            data={appointments.documents}
            
            />
          
        </main>
    </div>
  )
}

export default Admin