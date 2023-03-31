const amqp = require('amqplib');

const rabbitSettings = {
    protocol: 'amqp',
    hostname: '34.203.190.101',
    port: 5672,
    username: 'admin',
    password: 'admin',
    vhost: '/'
}

async function connect () {
    const queue = "order";
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('conexion exitosa');

        const chanel = await conn.createChannel();
        console.log('Canal creado exitosamente');

        //await chanel.assertQueue(queue);

        setInterval (()=>{
            chanel.sendToQueue(queue, Buffer.from('Pedidos'));
        }, 1000 );

    } catch (error) {
        console.error('Error =>', error);
        
    }
}

connect();