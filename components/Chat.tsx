'use client'

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface ChatProps {
    userId?: string
}

export default function Chat({ userId }: ChatProps) {
    const supabase = createClient();
    const channel = supabase.channel('general', {
        config: {
            broadcast: { self: true }
        }
    })

    const [subscribed, setSubscribed] = useState(false)
    const [messages, setMessages] = useState<any>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        channel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                setSubscribed(true)
            }
        })

        channel.on('broadcast', {
            event: 'message'
        }, ({ payload }) => { setMessages((prevState: any) => [...prevState, payload]) })

        return () => {
            channel.unsubscribe()
        }
    }, [])

    const onHandleSubmit = (e: any) => {
        e.preventDefault();
        if (subscribed) {
            channel.send({
                type: 'broadcast',
                event: 'message',
                payload: {
                    message,
                    user: userId
                }
            })
            setMessage('')
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex 1">
                <ul>
                    {messages.map(({ message }: any, index: number) => {
                        <li key={index}> {message} </li>
                    })}
                </ul>
            </div>
            <form onSubmit={onHandleSubmit}>
                <input
                    value={message}
                    onChange={(e) => e.target.value}
                    type="text"
                    placeholder="message" />
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 ml-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Send</button>
            </form>
        </div>
    )
}