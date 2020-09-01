  
// The GraphQL schema in string form
export const typeDef = `
    type Query
    { 
        books: [Book]
    }
    type Book 
    {
        title: String,
        author: String
    }
`;