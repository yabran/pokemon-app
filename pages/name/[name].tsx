import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import axios from 'axios';
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { NoUndefinedVariablesRule } from 'graphql';

interface Sprite{
  back_default:string,
  front_default:string,
  back_shiny:string,
  front_shiny:string
  default:string
}

interface Pokemon{
  name:string,
  url:string,
  sprites:Sprite
}

interface Props{
  pokemon:Pokemon
}

const PokemonByNamePage:NextPage<Props>=({pokemon})=> {

  

  return (
    <Layout title= {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}>
      
      
      
      
      <Grid.Container css={{marginTop:'5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{padding:'30px'}}>
              <Card.Body>

                <Card.Image src={pokemon.sprites.default || '/no-image.png'}
                            alt={pokemon.name}
                            width='100%'
                            height={200}
                />
              </Card.Body>
            </Card>

          </Grid>
          <Grid xs={12} sm={8}>
        <Card>
          <Card.Header css={{display:'flex', justifyContent:'space-between'}}>
                <Text h1 transform='capitalize' > {pokemon.name} </Text>
                <Button
                  color="gradient"
                  ghost
                >
                    Add to favorites
                </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction='row' display='flex'>
              <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
              <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
              <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
              <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
            </Container>
          </Card.Body>
        </Card>

      </Grid>
      </Grid.Container>

     
      

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths=async(ctx)=> {


    const{data}=await pokeApi.get<PokemonListResponse>('pokemon?limit=151');
    
    const pokemonNames=data.results.map(pokemon=>pokemon.name)
    
    
    
    

    return {
      paths: pokemonNames.map(name=>({
          params:{name}
      })),
      fallback: false // false or 'blocking'
    };
  }

  export const getStaticProps:GetStaticProps=async({params})=>{
      
    const {name}= params as {name:string};
    const {data}=await pokeApi.get<Pokemon>(`/pokemon/${name}`)

    const pokemon=await callAPI(name)
    console.log('Esto es pokemon!')
    console.log(pokemon)

      return{
        props:{
         pokemon:pokemon
        }
      }
  }


  async function callAPI(name:string) {
    const {data}=await axios({
        'method': 'POST',
        'url': 'http://localhost:3000/api/graphql',
        'data': {
            'query': `query{
                          getPokemonWithSprites(name:"${name}"){
                            name
                            url
                            sprites{
                              back_shiny
                              front_shiny
                              front_default
                              back_default
                              default
                              
                            }
                          }
                        }
            `
        }
      })
      
      console.log(data.data.getPokemonWithSprites)
      return data.data.getPokemonWithSprites
      
    
}


export default PokemonByNamePage;