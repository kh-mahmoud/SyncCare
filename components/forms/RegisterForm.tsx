"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { Field, FieldType, User } from "@/types"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/schemas/validation"
import { useRouter } from "next/navigation"
import { FormControl, } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"
import { Label } from "../ui/label"
import { registerPatient } from "@/lib/actions/patient.actions"






const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true)

        let formData;
        if (
            values.identificationDocument &&
            values.identificationDocument?.length > 0
        ) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.identificationDocument[0].name);
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData
            }

            const register = await registerPatient(patientData)

            if (register) {
                setIsLoading(false)
                router.push(`/patients/${user.$id}/new-appointment`)
            }


        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-12"
            >
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>

                    {/* NAME */}

                    <CustomFormField
                        fieldType={FieldType.INPUT}
                        control={form.control}
                        name="name"
                        placeholder="John Doe"
                        icon="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    {/* EMAIL & PHONE */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="Email address"
                            placeholder="johndoe@gmail.com"
                            icon="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                        <CustomFormField
                            fieldType={FieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    {/* BirthDate & Gender */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of birth"
                            dateFormat="dd/MM/yyyy"
                            />

                        <CustomFormField
                            fieldType={FieldType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="Gender"
                            renderSkelton={(field: Field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option, i) => (
                                            <div key={option + i} className="radio-group">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>

                    {/* Address & Occupation */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="14 street, New york, NY - 5101"
                        />

                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder=" Software Engineer"
                        />
                    </div>

                    {/* Emergency Contact Name & Emergency Contact Number */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="Guardian's name"
                        />

                        <CustomFormField
                            fieldType={FieldType.PHONE_INPUT}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency contact number"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>

                    {/* PRIMARY CARE PHYSICIAN */}
                    <CustomFormField
                        fieldType={FieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary care physician"
                        placeholder="Select a physician"
                    >
                        {Doctors.map((doctor) => (
                            <SelectItem className="cursor-pointer hover:bg-dark-500" value={doctor.name} key={doctor.name}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt="doctor"
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    {/* INSURANCE & POLICY NUMBER */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="insuranceProvider"
                            label="Insurance provider"
                            placeholder="BlueCross BlueShield"
                        />

                        <CustomFormField
                            fieldType={FieldType.INPUT}
                            control={form.control}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ABC123456789"
                        />
                    </div>

                    {/* ALLERGY & CURRENT MEDICATIONS */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.TEXTAREA}
                            control={form.control}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="Peanuts, Penicillin, Pollen"
                        />

                        <CustomFormField
                            fieldType={FieldType.TEXTAREA}
                            control={form.control}
                            name="currentMedication"
                            label="Current medications"
                            placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
                        />
                    </div>

                    {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FieldType.TEXTAREA}
                            control={form.control}
                            name="familyMedicalHistory"
                            label=" Family medical history"
                            placeholder="Mother had alergies , Father has hypertension"
                        />

                        <CustomFormField
                            fieldType={FieldType.TEXTAREA}
                            control={form.control}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="Appendectomy in 2015, Asthma diagnosis"
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verfication</h2>
                    </div>

                    <CustomFormField
                        fieldType={FieldType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select identification type"
                    >
                        {IdentificationTypes.map((type, i) => (
                            <SelectItem className="cursor-pointer hover:bg-dark-500" value={type} key={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FieldType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="123456789"
                    />

                    <CustomFormField
                        fieldType={FieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned Copy of Identification Document"
                        renderSkelton={(field: Field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>


                    <CustomFormField
                        fieldType={FieldType.CHECKBOX}
                        control={form.control}
                        name="PrivacyConsent"
                        label="I acknowledge that I have reviewed and agree to
                         the privacy policy"
                    />
                </section>

                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;