// 5 GraphQL types - Int, Float, String, Boolean, ID
export const typeDefs = `#graphql
    type Game {
        # ID type ensures id is unique 
        # ! means the data is REQUIRED!
        id: ID!
        title: String!
        # String! inside the brackets [] specifies we need at least one platform inside the array
        # ! - outside of the array []! specifies that the array is required in the first place
        platform: [String!]!
        reviews: [Review]
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    # ALWAYS need a type Query to specify the entry point/return type for our data!!
    # these should match with our resolvers
    type Query {
        # this specifies we will have a 'games' entry point that returns an array of our Game type (our games array!)
        games: [Game]
        authors: [Author]
        reviews: [Review]
        # entry points for grabbing individual entities
        # need to make sure we take in our unique ID as a parameter
        game(id: ID!): Game
        author(id: ID!): Author
        review(id: ID!): Review
    }
    # allows us to manipulate data (post, put, delete)
    type Mutation {
        addGame(game: AddGameInput!): Game
    }
    # custom input utilizing input keyword
    # used for mutations
    input AddGameInput {
        title: String!
        platform: [String!]!
    }

`;
