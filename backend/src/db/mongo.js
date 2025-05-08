import mongoose from 'mongoose';
mongoose.set('debug', true);

const DATABASE_NAME = 'rabin';
const CONNECTION_URI = `mongodb://localhost:27017/${DATABASE_NAME}`;

async function main() {
    await mongoose.connect(CONNECTION_URI);
}

main()
    .then(() => {
        console.log("Database is Connected");
    })
    .catch(console.log);