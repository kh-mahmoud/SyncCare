"use client"

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';

type StatCardProps = {
    type: "appointments" | "pending" | "cancelled"
    count: number,
    label: string,
    icon: string
}

const StatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
    return (
        <div className={cn('stat-card', {
            "bg-appointments": type === "appointments",
            "bg-pending": type === "pending",
            "bg-cancelled": type === "cancelled"
        })}>
            <div className='flex items-center gap-4'>
                <Image
                    src={icon}
                    alt={label}
                    width={32}
                    height={32}
                />

                <h2 className='text-32-bold text-white'>
                    <CountUp
                        preserveValue
                        redraw={false}
                        start={0}
                        end={count}
                         />
                </h2>
            </div>
            <p className='text-14-regular'>{label}</p>
        </div>
    );
}

export default StatCard;
