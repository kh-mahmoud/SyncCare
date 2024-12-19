import { StatusIcon } from '@/constants';
import { cn } from '@/lib/utils';
import { Status } from '@/types';
import Image from 'next/image';
import React from 'react';



const StatusBadge = ({ status }: { status: Status }) => {
    return (
        <div className={cn("status-badge", {
            'bg-green-600': status === "scheduled",
            'bg-blue-600': status === "pending",
            'bg-red-600': status === "cancelled",

        })}>

            <Image
               src={StatusIcon[status]}
               alt='icon'
               width={20}
               height={20}
               className='w-3 h-fit'
            />

            <p className={cn("text-xs font-semibold capitalize",{
            'text-green-500': status === "scheduled",
            'text-blue-500': status === "pending",
            'text-red-500': status === "cancelled",

        })}>
                 {status}
            </p>

        </div>
    );
}

export default StatusBadge;
