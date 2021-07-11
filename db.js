const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const url = 'mongodb+srv://admin:admin123@cluster0.cr55q.mongodb.net/test?retryWrites=true&w=majority'
MongoClient.connect(url, (error,client) => {
    if(error) return;
    const db = client.db('test');
    db.collection('users').insertOne ({
        name: 'Anil',
        age: 30
    })
    .then(res => console.log(res.ops))
    .catch(e => console.log(e))

    /*db.collection('users').insertMany ([
        {
            name: 'Nitin',
            age: 26
        },
        {
            name: 'Deepak',
            age: 40
        }
    ])
    .then(res => console.log(res.ops))
    .catch(e => console.log(e))*/

    /*db.collection('users').findOne ({age: 30})
    .then(res => console.log(res))
    .catch(e => console.log(e))*/

    /*db.collection('users').find ({}).toArray()
    .then(res => console.log(res))
    .catch(e => console.log(e))*/

    /*db.collection('users').updateOne ({age:30},
        {
            $set:{
                age: 32
            }
        })
    .then(res => console.log(res))
    .catch(e => console.log(e))*/

    /*db.collection('users').updateMany ({},
        {
            $inc:{
                age: 1
            }
        })
    .then(res => console.log(res.modifiedCount))
    .catch(e => console.log(e))*/

    /*db.collection('users').deleteOne ({name:'Deepak'})
    .then(res => console.log(res))
    .catch(e => console.log(e))*/

    /*db.collection('users').deleteMany ({})
    .then(res => console.log(res.deletedCount))
    .catch(e => console.log(e))*/
})
