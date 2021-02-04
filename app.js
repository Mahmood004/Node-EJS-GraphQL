const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');

const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const errorController = require('./controllers/error');

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// app.use(adminRoutes);
// app.use(shopRoutes);


app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    pretty: true,
    formatError: function(error) {
        if (!error.originalError) {
            return error;
        }
        const data = error.originalError.data;
        const message = error.message || 'An error occurred';
        const status = error.originalError.code || 500;
    }
}));

// app.use(errorController.get404);

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-f2vlt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then(() => {
        app.listen(3000, () => {
            console.log('mongodb connection successful, app is listening on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });

// const io = require('./socket').init(server);
// io.on('connection', socket => {
//     console.log('client connected');
// });