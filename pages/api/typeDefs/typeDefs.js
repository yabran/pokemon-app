import {gql} from 'apollo-server-micro';

export const typeDefs = gql`
  type Book {
    id: ID!
    name: String
  }

  type Pokemon{
    
    name:String!
    url:String!
    sprites:Sprite
  }

  type Sprite{
    back_shiny:String
    front_shiny:String
    front_default:String
    back_default:String
    default:String
  }


  type Query {
    getBooks: [Book]
    getPokemons:[Pokemon]
    getSpritesPokemon(name:String!):Sprite!
    getPokemonsWithSprites:[Pokemon]
    getPokemonWithSprites(name:String!):Pokemon!
  }
`;