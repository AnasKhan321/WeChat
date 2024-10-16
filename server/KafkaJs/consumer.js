const {kafka} = require("./kafkaJsClient.js")
const  Message = require("../Models/Message.js")
const ConnectToMongo = require("../db.js")


async function init(){
    ConnectToMongo()
    const consumer = kafka.consumer({ groupId: 
    "messages"
     })

    await consumer.subscribe({ topics: ['messages'] , fromBeginning: true  })



    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            const data = JSON.parse(message.value)

            await Message.create({
                message :  data.message, 
                groupid :data.id , 
                user : data.user
            })
        },
    })
}

init()