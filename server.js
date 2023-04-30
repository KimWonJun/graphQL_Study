import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        text: String
        hello: String
    }
`; // 따옴표가 아닌 ``를 사용한다.

const server = new ApolloServer({typeDefs})

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`)
});