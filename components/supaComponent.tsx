'use client'
import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client";

export default function SupaComponent() {
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const supabase = createClient();
                let { data: users, error: userError } = await supabase.from('users').select();

                console.log(users, userError);
            } catch (error) {

            }
        }

        loadUsers().catch(console.error)
    }, [])

    return (
        <h1>First component using Supabase</h1>
    )
}
