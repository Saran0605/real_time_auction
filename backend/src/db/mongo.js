const mongoose = require('mongoose');
mongoose.set('debug', true);

const DATABASE_NAME = 'ragul';
const CONNECTION_URI = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;

async function main() {
    await mongoose.connect(CONNECTION_URI);
}

main()
    .then(() => {
        console.log("Database is Connected");
    })
    .catch(console.log);
