'use client'

import UserItem from "@/components/UserItem"
import { createClient } from "@/utils/supabase/client"
import { PostgrestError } from "@supabase/supabase-js"
import { ChangeEvent, useEffect, useState } from "react"
import { createUser, updateUser } from "@/app/actions"

type User = {
  id: number,
  first_name: string,
  last_name: string,
  age: number,
  created_at?: string
}

const initialState = {
  id: -1,
  first_name: "",
  last_name: "",
  age: 0
}

export default function Index() {
  const [formValues, setFormValues] = useState<User>(initialState)
  const [users, setUsers] = useState<User[] | null>()
  const [error, setError] = useState<PostgrestError>()

  const loadUsers = async () => {
    try {
      const supabase = await createClient()
      const { data: users, error: usersError } = await supabase.from('users').select().order('id')

      if (usersError) {
        setError(usersError)
      }
      setUsers(users)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])


  const handleFormAction = async (formData: FormData) => {
    if (formValues.id === -1) {
      await createUser(formData)
    } else {
      await updateUser(formData)
    }
    setFormValues(initialState)
    loadUsers()
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }))
  }

  const handleEditUser = (user: User) => {
    setFormValues(user)
  }


  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h4 className="text-xl">Lista de usuarios</h4>
      <form action={handleFormAction} className="w-[480px] mb-12 border-2 border-white rounded-md px-4 py6">
        <label className="flex flex-col mb-3 mt-1">
          Nombre(s)
          <input
            type="text"
            name="first_name"
            className="bg-white rounded-sm text-black text-sm p-1 w-full"
            required
            maxLength={100}
            minLength={1}
            value={formValues.first_name}
            onChange={handleFormChange} />
        </label>
        <label className="flex flex-col mb-3">
          Apellido
          <input
            type="text"
            name="last_name"
            className="bg-white rounded-sm text-black text-sm p-1 w-full"
            required
            maxLength={100}
            minLength={1}
            value={formValues.last_name}
            onChange={handleFormChange} />
        </label>
        <label className="flex flex-col">
          Edad
          <input
            type="number"
            name="age"
            className="bg-white rounded-sm text-black text-sm p-1 w-12"
            required
            maxLength={100}
            minLength={1}
            value={formValues.age}
            onChange={handleFormChange} />
        </label>
        <input type="hidden" name="id" value={formValues?.id} />
        <br />
        <button type="submit" className="w-24 border-white text-white border-2 text-sm h-8 rounded-sm mb-2 hover:bg-slate-900">
          Save
        </button>
        <button type="reset" className="w-24 bg-white border-none text-black text-sm h-8 rounded-sm ml-2 hover:bg-slate-200"
          onClick={() => setFormValues(initialState)}>
          Clear
        </button>
      </form>
      <div>
        {users?.map(user => <UserItem
          {...user}
          onRefresh={loadUsers}
          onEdit={handleEditUser}
          key={user.id} />)}
      </div>
    </main>
  );
}