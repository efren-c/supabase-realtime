'use client';
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface OrderListProps {
    orders: Array<any>;
}

export default function OrderList({
    orders = []
}: OrderListProps) {
    const supabase = createClient()
    const [internalOrders, setInternalOrders] = useState(orders)


    useEffect(() => {
        const subscriber = supabase.channel('order')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
            }, (payload: any) => {
                setInternalOrders((prevOrders) => [...prevOrders, payload.new])
            })
            .subscribe();

        return () => {
            subscriber.unsubscribe();
        }
    }, [])

    return (
        <table className="table-auto border border-gray-300">
            <thead className="table-head bg-gray-4  00">
                <tr>
                    <th className="text-center px-4 py-2">Order ID</th>
                    <th className="text-center px-4 py-2">Subtotal</th>
                    <th className="text-center px-4 py-2">Discount</th>
                    <th className="text-center px-4 py-2">Total</th>
                </tr>
            </thead>
            <tbody>
                {internalOrders?.map((order) => (
                    <tr key={order.id}>
                        <td className="text-left px-4 py-2">{order.id}</td>
                        <td className="text-center px-4 py-2"> {order.sub_total} </td>
                        <td className="text-center px-4 py-2"> {order.discount} </td>
                        <td className="text-center px-4 py-2"> {order.total} </td>
                    </tr>
                ))}
            </tbody>
            <tbody>
                {internalOrders?.map((order) => (
                    <tr key={order.id}>
                        <td className="text-left px-4 py-2">{order.id}</td>
                        <td className="text-center px-4 py-2"> {order.first_name} </td>
                        <td className="text-center px-4 py-2"> {order.last_name} </td>
                        <td className="text-center px-4 py-2"> {order.age} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}