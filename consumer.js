const amqp = require('amqplib');

const rabbitSettings = {
    protocol: 'amqp',
    hostname: '34.203.190.101',
    port: 5672,
    username: 'admin',
    password: 'admin',
}

async function connect () {
    const queue = "order";
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('conexion exitosa');

        const chanel = await conn.createChannel( queue );
        console.log('Canal creado exitosamente');

        await chanel.assertQueue(queue);

        chanel.consume(queue, (msg)=>{
            if (msg !== null) {
                console.log('Recieved',msg.content.toString());
            } else {
                console.log('Consumer Cancelled By Server');
            }
        });

    } catch (error) {
        console.error('Error =>', error);
        
    }
}

connect();