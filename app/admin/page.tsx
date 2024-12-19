import { columns } from '@/components/columns';
import { DataTable } from '@/components/dataTable';
import LogoFull from '@/components/LogoFull';
import StatCard from '@/components/StatCard';
import { GetAppointments } from '@/lib/actions/appointment.action';
import Link from 'next/link';
import React from 'react';


const Admin = async () => {
    const appointments = await GetAppointments();

    return (
        <div className='mx-auto flex flex-col space-y-6'>
            <header className='admin-header'>

                <Link href={"/"}>
                    <LogoFull height={35} width={35} />
                </Link>

                <p className='text-16-semibold'>Admin Dashboard</p>
            </header>

            <main className='admin-main'>
                <section className='w-full'>
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Get the day going by managing incoming appointments</p>
                </section>

                <section className='admin-stat'>
                    <StatCard
                        type="appointments"
                        count={appointments?.scheduled || 0}
                        label={"Scheduled appointments"}
                        icon="/assets/icons/appointments.svg" />

                    <StatCard
                        type="pending"
                        count={appointments?.pending || 0}
                        label={"Pending appointments"}
                        icon="/assets/icons/pending.svg" />

                    <StatCard
                        type="cancelled"
                        count={appointments?.cancelled || 0}
                        label={"Cancelled appointments"}
                        icon="/assets/icons/cancelled.svg" />
                </section>

                <DataTable columns={columns} data={appointments.data} />
            </main>
        </div>
    );
}

export default Admin;
