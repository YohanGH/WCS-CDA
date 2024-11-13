import { ApolloServer } from "@apollo/server"; // Importing ApolloServer for GraphQL
import { UserInputError } from 'apollo-server-errors';
import { startStandaloneServer } from "@apollo/server/standalone"; // Importing function to start the server
import "reflect-metadata";
import { ObjectType, Field, ID, Resolver, Query, Mutation, Arg, InputType, buildSchema } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
class Book {
  @Field(() => ID)
  id!: string; // Unique identifier for the book

  @Field(() => String)
  title!: string; // Title of the book

  @Field(() => String)
  author!: string; // Author of the book
}

@InputType()
class BookInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'The title is required' })
  @Length(3, 125, { message: 'The title must be between 3 and 125 characters' })
  title!: string; // Input field for book title

  @Field(() => String)
  @IsNotEmpty({ message: 'The author is required' })
  @Length(3, 125, { message: 'The author must be between 3 and 125 characters' })
  author!: string; // Input field for book author
}

// Sample data for books
const books: Book[] = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

@Resolver(Book)
class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return books; // Returns the list of books
  }

  @Query(() => Book, { nullable: true }) // nullable: true allows the book to be undefined
  getBookById(@Arg('id') id: string): Book | undefined {
    const book = books.find((book) => book.id === id); // Finds a book by its ID
    if (!book) {
      throw new UserInputError('Book not found', { invalidArgs: { id } }); // Throws an error if the book is not found
    }
    return book;
  }

  @Mutation(() => Book)
  addBook(@Arg('input') input: BookInput): Book {
    const newBook = {
      id: uuidv4(), // Generates a new ID for the book
      title: input.title,
      author: input.author,
    };
    books.push(newBook); // Adds the new book to the list
    return newBook; // Returns the newly added book
  }
}

// Main function to start the server asynchronously for better performance
(async () => {
// Move the schema definition outside of the resolver class
const schema = await buildSchema({
  resolvers: [BookResolver],
});

// Creating an instance of ApolloServer with the schema
const server = new ApolloServer({ schema }); // Initializing the server with type definitions and resolvers

// Starting the standalone server on port 4000
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, // Listening on port 4000
  });

// Logging the server URL to the console
  console.log(`🚀  Server ready at: ${url}`); // Outputting the server URL
})();
