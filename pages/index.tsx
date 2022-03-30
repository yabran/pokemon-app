import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { GetStaticProps, NextPage, } from 'next'
import { pokeApi } from '../api'


import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { PokemonListResponse, SmallPokemon } from '../interfaces'


interface Props{
  pokemons:SmallPokemon[];
 

}

const HomePage: NextPage<Props> = (props) => {

  const {pokemons}=props;
  

  return (
    <Layout title={'Listado de pokemones'}>
      <Grid.Container gap={2} justify='flex-start'>
        
          {pokemons.map((pokemon)=>{
            return(
              <PokemonCard key={pokemon.id} pokemon={pokemon}/>
            )
          })}
          
        

      </Grid.Container>

    </Layout>
  )
}

export const getStaticProps:GetStaticProps=async(ctx)=>{

  interface Pokemon{
    name:string;
    url:string;
    id:number;
    img:string;

  }
  
  const {data}= await pokeApi.get<PokemonListResponse>('pokemon?limit=151');
  
  
   
  

  const pokemons:SmallPokemon[]=data.results.map( (poke:Pokemon,index:number)=>{

    

    const pokemon={
      name:poke.name,
      url:poke.url,
      id:(index+1),
      img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    }

    return(pokemon)
  })


{/* "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg",*/}
  
  
  return{
    props:{
      pokemons:pokemons
    }
  }
}

export default HomePage
