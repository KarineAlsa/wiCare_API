import * as amqp from 'amqplib';
import dotenv from 'dotenv';
import { getProfileDataAssociation, getProfileDataVolunteer } from '../Dependencies';
dotenv.config();


export const consumeMessages = async () => {

    try {
        const connection = await amqp.connect({
            protocol: process.env.RABBIT_PROTOCOL,
            hostname: process.env.RABBIT_HOST,
            port: 5672,
            username: process.env.RABBIT_USER,
            password: process.env.RABBIT_PASSWORD,
        });
        const channel    = await connection.createChannel();
        const exchange   = 'saga_exchange';
        
        await channel.assertExchange(exchange, 'direct', { durable: false });
    
        const queues = [
            { name: 'get_allevents_queue', bindingKey: 'getAllEvents', handler: handleGetEvents },
            { name: 'get_volunteer_queue', bindingKey: 'getEventVolunteers', handler: handleGetVolunteers },
            { name: 'get_event_by_id', bindingKey: 'getEventById', handler: handleEventId}
        ];
        for (const queue of queues) {
            await channel.assertQueue(queue.name, { durable: false });
            await channel.bindQueue(queue.name, exchange, queue.bindingKey);
    
            console.log(`[*] Waiting for messages in ${queue.name}. To exit press CTRL+C`);
    
            channel.consume(queue.name, async (msg: any) => {
                const message = JSON.parse(msg.content.toString());
                await handleMessage(
                    queue.handler,
                    message,
                    msg.properties.replyTo,
                    msg.properties.correlationId,
                    channel
                );
                console.log(`[x] Received message from ${queue.name}: ${JSON.stringify(message)}`);
            }, { noAck: true });
        }
    } catch (error:any) {
        console.error(`Error consuming messages:`, error.message);
    }
    
};

const handleMessage = async (handler: Function, message: any, replyTo: string, correlationId: string, channel: amqp.Channel) => {
    try {
        const response = await handler(message);
        channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(response)), { correlationId });
        console.log(`Responded to temporary queue:`, response);
    } catch (error: any) {
        console.error(`Error handling message:`, error.message);
    }
};

const handleGetEvents = async (message: any) => {
    
    try {

        for (const event of message) {
            event.association = await getProfileDataAssociation.run(event.association_id);
        }
        
        return message ;
    } catch (error:any) {
        console.error(`Error getting events:`, error.message);
    }
    
};

const handleGetVolunteers = async (message: any) => {
    
    try {

        for (const volunteer of message) {
            volunteer.profile = await getProfileDataVolunteer.run(volunteer.user_id);
        }
        return message;
    } catch (error:any) {
        console.error(`Error getting volunteers:`, error.message);
    }
    
};

const handleEventId = async (message: any) => {
    
    try {

        
        message.association = await getProfileDataAssociation.run(message.association_id);
        
        
        return message ;
    } catch (error:any) {
        console.error(`Error getting events:`, error.message);
    }
    
};

