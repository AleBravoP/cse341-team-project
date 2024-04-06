const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.setTimeout(60000)

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(
            process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('players')
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new user into the users collection', async () => {
        const players = db.collection('players');

        const mockUser = {
            ID: 4000,
            id: 'some-user-id',
            forename: "Andres",
            surname: "Bayona",
            imageURL: "https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg",
        }


        await players.insertOne(mockUser)

        const insertedPlayer = await players.findOne({ id: 'some-user-id' });

        expect(insertedPlayer).toEqual(mockUser)
    },
        
    it('should delete a user from the users collection', async () => {
        const players = db.collection('players')
        await players.deleteMany({ id: 'some-user-id' })
        const deletedPlayer = await players.findOne({ id: 'some-user-id' });
        expect(deletedPlayer).toEqual(null)
    })
)})





















