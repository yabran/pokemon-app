import axios from "axios";


const pokeApi=axios.create({
    baseURL:'https://pokeapi.co/api/v2/'
})



 

export const resolvers = {
    Query: {
        getBooks: () => {
            return books
        },

        getPokemons:async()=>{
            const {data}=await pokeApi.get('pokemon?limit=151')
            data.results.map(async(item)=>{
                const {data:images}=await pokeApi.get(`pokemon/${item.name}`)
                
            })

            
            return data.results
        },

        getSpritesPokemon:async(_,{name})=>{
            const {data}= await pokeApi.get(`/pokemon/${name}`);
            console.log(data.sprites.back_default)
            return data.sprites;
            
        },

        getPokemonsWithSprites:async()=>{
           
            const {data}=await pokeApi.get('pokemon?limit=5')
            let pokemons=[]
            for await(let item of data.results){
                                let pokemon={}
                                const {data}=await pokeApi.get(`pokemon/${item.name}`)
                                console.log(item)
                                const sprites={
                                    back_shiny:data.sprites.back_shiny,
                                    front_shiny:data.sprites.front_shiny,
                                    front_default:data.sprites.front_default,
                                    back_default:data.sprites.back_default,
                                    default:data.sprites.other.dream_world.front_default
                                        
                                }
                               

                                pokemon={
                                    name:data.species.name,
                                    url:data.species.url,
                                    sprites:sprites
                                }

                                pokemons=[...pokemons,pokemon]
                        }
            
            console.log('////esto es pokemons')
            console.log(pokemons)
            
            return pokemons
        },
        getPokemonWithSprites:async(_,{name})=>{

            const {data}=await pokeApi(`pokemon/${name}`);
            
            const pokemon={
                name:data.name,
                url:data.species.name,
                sprites:{
                    back_shiny:data.sprites.back_shiny,
                    front_shiny:data.sprites.front_shiny,
                    front_default:data.sprites.front_default,
                    back_default:data.sprites.back_default,
                    default:data.sprites.other.dream_world.front_default
                        
                }
            }
            return pokemon
        },
    },
};




function callAPI() {
    const pokeApi=axios.create({
        baseURL:'https://pokeapi.co/api/v2/'
    })
    
    pokeApi.get('pokemon?limit=151')
    .then((result)=>{
        return pokemons
    })

  
}



