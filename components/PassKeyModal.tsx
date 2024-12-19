'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";



const PassKeyModal = () => {
    const [open, setOpen] = useState(true)
    const path = usePathname()
    const [passKey, setPassKey] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const encryptedKey = localStorage.getItem("accessKey")

    useEffect(() => {
        const accessKey= encryptedKey && decryptKey(encryptedKey)

        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false)
                router.push("/admin")
            } else {
                setOpen(true)
            }
        }
    }, [encryptedKey])


    const closeModal = () => {
        setOpen(false)
        router.push("/")
    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passKey)

            localStorage.setItem('accessKey', encryptedKey)

            setOpen(false)
        } else {
            setError("Invalid passkey. Please try again.")
        }

    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">
                        Admin Access Verification
                        <Image
                            src={"/assets/icons/close.svg"}
                            width={20}
                            height={20}
                            alt="close"
                            className="cursor-pointer border-2 rounded-md"
                            onClick={closeModal}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot className="shad-otp-slot" index={0} />
                            <InputOTPSlot className="shad-otp-slot" index={1} />
                            <InputOTPSlot className="shad-otp-slot" index={2} />
                            <InputOTPSlot className="shad-otp-slot" index={3} />
                            <InputOTPSlot className="shad-otp-slot" index={4} />
                            <InputOTPSlot className="shad-otp-slot" index={5} />
                        </InputOTPGroup>
                    </InputOTP>


                    {error && (
                        <p className="shad-error text-14-regular mt-4 flex justify-center">
                            {error}
                        </p>
                    )}

                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="shad-primary-btn w-full" onClick={(e) => validatePasskey(e)}>
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PassKeyModal;
