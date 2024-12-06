import { createClient } from "@/utils/supabase/server";

export default async function SupaComponentServer() {
    const supabase = await createClient();
    let { data: users, error: userError } = await supabase.from('users').select();

    console.log(users, userError);

    return (
        <h1>Server Comopnent Supabase</h1>
    )
}
