import React from 'react';
import {useTheme, Text, Spacer, Link} from '@nextui-org/react'
import Image from 'next/image';
import NextLinK from 'next/link';


export const NavBar=()=> {

    const {theme}=useTheme();


  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'start',
        padding:'0px 20px',
        backgroundColor:theme?.colors.gray900.value,

    }}
        
    >
        <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg' alt='icono de la app' width={50} height={50}/>
        
        <NextLinK href='/'>
            <Link>
            <Text color='white' h2>P</Text>
              <Text color='white' h3 css={{marginRight:'4px'}}>okemon </Text>
              <Text color='white' h2> H</Text>
              <Text color='white' h3>ome</Text>
              
            
            </Link>
        </NextLinK>

        <Spacer css={{flex:1}}/>
        <NextLinK href='/favorites'>
          <Link>
            
              <Text color='white'>Favorites</Text>
          
          </Link>
        </NextLinK>

    </div>
  )
}
