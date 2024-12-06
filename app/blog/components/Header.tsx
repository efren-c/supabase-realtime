'use client'

import Link from 'next/link';
import styles from './Header.module.css'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient()

const BlogHeader = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        //Trae el usuario de la DB, el que está ligado a la sesión activa.
        const getUserData = async () => {
            try {
                const { error, data: authUser } = await supabase.auth.getUser()

                if (error) {
                    throw new Error()
                }

                const { data: publicUser, error: publicError } = await supabase.from('users').select('*').eq('id', authUser.user.id).single()

                if (publicUser.id && !publicError) {
                    setUser(publicUser)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getUserData().catch(console.error)
    }, [])

    const handleSingOutClick = async () => {
        await supabase.auth.signOut()
        setUser({})
    }


    return (
        <header className={styles.header}>
            <Link href="/blog"> CF Blog </Link>
            <nav>
                {user.id && (
                    <>
                        <span>Bienvenido, {user?.first_name} </span>
                        <button onClick={handleSingOutClick} className='ml-4 border-solid bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded' >Cerrar sesión</button>
                    </>
                )}

                {!user?.id && <Link href="/sing-in">Iniciar sesión</Link>}
                {/* <Link href="/">Inicio</Link> */}
            </nav>
        </header>
    )
}

export default BlogHeader;