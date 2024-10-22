import db from "./db.js";
export const resolvers = {
    Query: {
        // games resolver
        // returns all games from our db when user runs the games query
        // name should match with our schema
        games() {
            return db.games;
        },
        authors() {
            return db.authors;
        },
        reviews() {
            return db.reviews;
        },
        // resolvers have 3 optional parameters 
        // (parent, args, context)
        // parent gabs data from parent query when dealing with nested queries
        // args stands for arguments that we can pass into our queries
        // use _ to skip over ones that aren't needed for example if you DONT need parents but need to access args, do the following:
        game(_, args) {
            // go through our array and find the game whose id matches our args id
            return db.games.find((game) => game.id === args.id);
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
    },
    // Nested Resolvers
    // these are for queries nested inside other queries 
    // for example, if we want to grab game data inside of our review query, we need nested resolvers in order to access that data
    Game: {
        // allows us to grab review data inside of our game query
        // parent in this case will grab the ID from our Game and pass it into the reviews nested resolver
        reviews(parent) {
            // use filter to grab all reviews whose game_id equals the parent id
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => parent.game_id === game.id);
        },
        author(parent) {
            return db.authors.find((author) => parent.author_id === author.id);
        }
    },
    // Mutation
    Mutation: {
        addGame(_, args) {
            // structure our game data into a game variable
            const newGame = {
                id: String(Date.now()),
                // shortcut, evaluates to the same as below
                ...args.game
                // title: args.game.title,
                // platform: args.game.platform
            };
            // add it to database
            db.games.push(newGame);
            // return the new game we created
            return newGame;
        }
    }
};
