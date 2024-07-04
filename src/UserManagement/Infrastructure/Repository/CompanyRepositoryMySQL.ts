import { User } from "../../Domain/Entity/User";
import CompanyInterface from "../../Domain/Port/CompanyInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Company } from "../../Domain/Entity/Company";

export default class UserMysqlRepository implements CompanyInterface {
  async getProfileDataCompany(id: number): Promise<any> {
      throw new Error("Method not implemented.");
  }
  async registerCompany(user: User, company: Company): Promise<any> {
    const sqlUser = "INSERT INTO User (email, password, role) VALUES (?,?,?)";
    const sqlContact = "INSERT INTO Contact (name, age, cellphone, address, genre, user_id) VALUES (?,?,?,?,?,?)";
    const sqlCompany = "INSERT INTO Company (name, foundation_date, context, description, RFC, address, cellphone) VALUES (?,?,?,?,?,?,?)";
    const sqlManager = "INSERT INTO Manager (position, contact_id, institution_id, type) VALUES (?,?,?,?)";
    const hash = bcrypt.hashSync(user.password, 10);

    const paramsUser: any[] = [user.email, hash, user.role];
    const paramsContact: any[] = [user.contact?.name, user.contact?.age, user.contact?.cellphone, user.contact?.address, user.contact?.genre];
    const paramsCompany: any[] = [company.name, company.foundation_date, company.context, company.description, company.RFC, company.address, company.cellphone];
    const paramsManager: any[] = [company.manager.position];

    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();

        const [resultUser]: any = await query(sqlUser, paramsUser, connection);

        if (resultUser && resultUser.insertId) {
          
          paramsContact.push(resultUser.insertId);
          const [resultContact]: any = await query(sqlContact, paramsContact, connection);

          if (resultContact && resultContact.insertId) {
            
            const [resultAssociation]: any = await query(sqlCompany, paramsCompany, connection);
            
            if (resultAssociation && resultAssociation.insertId) {
              
              paramsManager.push(resultContact.insertId, resultAssociation.insertId, 'company');
              const [resultManager]: any = await query(sqlManager, paramsManager, connection);

              if (resultManager && resultManager.insertId) {
               
                await connection.commit();
                return {
                  id: resultUser.insertId,
                  email: user.email,
                  role: user.role,
                };
              }
            }
          }
        }
       
        await connection.rollback();
        return false;
    } catch (error) {
      console.error("Error al registrar compania:", error);
      if (connection) {
        await connection.rollback();
      }
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }

  async logout(token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
