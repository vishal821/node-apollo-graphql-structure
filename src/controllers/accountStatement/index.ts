const { typeDef } = require('./schema');
const UserDocument = require('../../mongoSchema/userdocuments');

const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

export const accountStatementTypeDefs = typeDef;
export const accountStatementResolvers = {
    Query: 
    { 
        books:async (_, args, context) => {
          let { db } = context;
          // let x = await UserDocument(db).find({});
          // console.log(x)
          return books;
        }
    },
};