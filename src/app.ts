import express from "express";
import dotenv from 'dotenv'
import path from 'path';
import { exec } from 'child_process';
import volunteerRouter from "./UserManagement/Infrastructure/Route/VolunteerRoutes";
import associationRouter from "./UserManagement/Infrastructure/Route/AssociationRoutes";
import userRoutes from "./UserManagement/Infrastructure/Route/UserRoutes";
import companyRouter from "./UserManagement/Infrastructure/Route/CompanyRoutes";
import { consumeMessages } from "./UserManagement/Infrastructure/Service/SagaConsumer";

dotenv.config()
const server = express();
const server_port =process.env.PORT;
server.use(express.json());
server.use('/', userRoutes);
server.use('/volunteer', volunteerRouter);
server.use('/association', associationRouter);
server.use('/company', companyRouter)


const migrateScript = path.join(__dirname, '..', 'src', 'UserManagement', 'Infrastructure', 'Migration', 'Migration.ts');

const migrationProcess = exec(`ts-node ${migrateScript}`);

migrationProcess.on('exit', (code: number) => {
    if (code === 0) {
        console.log('Migración completada con éxito');
    } else {
        console.error('Error durante la migración');
    }
});


async function startServer() {

    await consumeMessages();

    server.listen(3000, () => {
        console.log(`Server listening on http://localhost:${server_port}/`);
    });
    

}

startServer();
