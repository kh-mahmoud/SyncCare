"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FieldType } from "@/types"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/schemas/validation"
import { useRouter } from "next/navigation"
import { CreateUser } from "@/lib/actions/patient.actions"







const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })


  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {

      const user = await CreateUser(values)

      if (user) router.push(`/patients/${user.$id}/register`)



    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <h1 className="header">Hi there👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          name="name"
          label="Full name"
          control={form.control}
          fieldType={FieldType.INPUT}
          placeholder="John Doe"
          icon="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          name="email"
          label="Email"
          control={form.control}
          fieldType={FieldType.INPUT}
          placeholder="jhondoe@gmail.com"
          icon="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          name="phone"
          label="Phone number"
          control={form.control}
          fieldType={FieldType.PHONE_INPUT}
          placeholder="(555) 244-578"
          icon="/assets/icons/email.svg"
          iconAlt="email"
        />



        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
