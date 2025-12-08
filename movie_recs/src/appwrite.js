import {Client, Databases, ID, Query } from 'appwrite'
import search from './components/search';
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
.setEndpoint(`https://cloud.appwrite.io/v1`)
.setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // Uses AppWrite SDK to determine if the search already exists
    try {
        const result = await database.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal(`searchTerm`, searchTerm)
        ])

        if(result.documents.lengh > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DB_ID, COLLECTION_ID, doc.$id, data: [
                count: doc.count + 1
            ])
        } else {
            await database.createDocument(DB_ID, COLLECTION_ID, ID.unique(), data: {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch (error) {
        console.error(error);
    }
    // Updates count
    // OR creates new document with the search term and starting count
}