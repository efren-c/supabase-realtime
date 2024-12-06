import OrderList from "@/components/OrderList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  try {
    console.log('Fetching data from "order" table...');
    const { data, error, status } = await supabase
      .from('order')
      .select('*');

    console.log('Supabase response status:', status);
    console.log('Supabase response data:', data);
    console.log('Supabase response error:', error);

    if (error) {
      console.error('Error fetching data:', error);
      return <div>Error fetching data: {error.message}</div>;
    }

    if (data && data.length > 0) {
      return (
        <>
          {/* <div>
            <h1>Protected Page</h1>
            <h2>Orders:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div> */}
          <OrderList orders={data as any[]} />
        </>
      );
    } else {
      console.log('No data found in the order table.');
      return <div>No orders found.</div>;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return <div>An unexpected error occurred: {error instanceof Error ? error.message : String(error)}</div>;
  }
}