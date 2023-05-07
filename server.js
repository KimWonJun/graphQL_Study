import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id:"1",
        text:"first one ",
        userId:"2"
    },
    {
        id:"2",
        text:"second one",
        userId:"1"
    },
]

let users = [
    {
        id:"1",
        firstname:"nico",
        lastname:"las"
    },
    {
        id:"2",
        firstname:"Elon",
        lastname:"mask"
    }
];

const typeDefs = gql`
    type User {
        id: ID!
        firstname: String
        lastname: String
        fullname: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Query {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`; // 따옴표가 아닌 ``를 사용한다.

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(root, {id}) {
            return tweets.find(tweet => tweet.id == id);
        },
        allUsers() {
            console.log("all users called!");
            return users;
        }
    },
    Mutation: {
        postTweet(_, {text, userId}) {
            const newTweet = {
                id: tweets.length + 1,
                text,
                userId
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        }
    },
    User: {
        fullname({firstname, lastname}) {
            return `${firstname} ${lastname}`
        }
    },
    Tweet: {
        author({userId}) {
            const result = users.find(user => user.id === userId);
            if(!result) {
                console.log("user가 존재하지 않습니다.");
                return null;
            }
            return result;
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`)
});