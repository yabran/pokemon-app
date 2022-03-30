import React from 'react'
import { FC } from 'react'
import Head from 'next/head'
import { NavBar } from '../ui';

interface Properties {
    children:JSX.Element,
    title: string;
}

export const Layout=({children,title}:Properties)=> {
  return (
    <>
        <Head>
            <title>{title||'Pokemon App'}</title>
            <meta name='author' content="Fernando Vallejos"/>
            <meta name='description' content='Informacion sobre el pokemon XXX'/>
            <meta name='keywords' content='XXX, pokemon, pokedex'/>
        </Head>

        <NavBar/>


        <main>
            
            {children}
        </main>
    
    </>
  )
}
