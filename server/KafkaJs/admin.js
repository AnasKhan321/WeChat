const {kafka} = require("./kafkaJsClient.js")




async function init(){
    const admin = kafka.admin()
    admin.connect()

    await admin.createTopics({
        topics: [
          {
            topic: "messages",
            numPartitions: 1,
          },
        ],
      });
  
 

      await admin.disconnect();
}

init()