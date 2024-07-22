import { User } from "../../Domain/Entity/User";
import AssociationInterface from "../../Domain/Port/AssociationInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Association } from "../../Domain/Entity/Association";
import { Bank } from "../../Domain/Entity/Bank";

export default class UserMysqlRepository implements AssociationInterface {
  async updateBankInformation(id: string, updateFields: any): Promise<User | any> {
    let sql = "UPDATE Bank SET ";
    const params: any[] = [];
    Object.entries(updateFields).forEach(([key, value]) => {
      sql += `${key} = ?, `;
      params.push(value);
    });
    sql = sql.slice(0, -2);
    sql += " WHERE association_id = ?";
    params.push(id);
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);

      if (result && result.affectedRows > 0) {
        return {
          updateFields
        };
      }
      return false;
    } catch (error) {
      console.error("Error al actualizar información bancaria:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
  }
  }
  async getBankInformation(id: number): Promise<Bank | any> {
    const sql = "SELECT * FROM Bank WHERE association_id = ?";
    const params = [id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result && result.length > 0) {
        return {
          name: result[0].name,
          number: result[0].number,
          bank: result[0].bank,
          association_id: result[0].association_id
        };
      }
      return false;
    } catch (error) {
      console.error("Error al obtener información bancaria:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
  }
}
  async addBankAccount(bank: Bank): Promise<any> {
    const sql = "INSERT INTO Bank (name, number, bank, association_id) VALUES (?,?,?,?)";
    const params = [bank.name, bank.number, bank.bank, bank.association_id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [result]: any = await query(sql, params, connection);
      if (result.insertId) {
        await connection.commit();
        return {
          name: bank.name,
          number: bank.number,
          bank: bank.bank,
          association_id: bank.association_id
        };
      }
      
    } catch (error) {
      console.error("Error al agregar cuenta bancaria:", error);
      if (connection) {
        await connection.rollback();
        await connection.release();
      }
      return false;
    }
  }
  async getProfileDataAssociation(id: number): Promise<any> {
    const sql = "SELECT * FROM User u JOIN Contact c ON u.id = c.user_id JOIN Manager m ON c.id = m.contact_id JOIN Association a ON m.institution_id = a.id WHERE u.id = ?";
    const params = [id];
    
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      console.log(result);
      
      if (result && result.length > 0) {
        return {
          id: result[0].id,
          email: result[0].email,
          role: result[0].role,
          name: result[0].name,
          description: result[0].description,
          cellphone: result[0].cellphone,
          location: {
            latitude: result[0].latitude,
            longitude: result[0].longitude
          },
          profilePicture:result[0].photo,
        };
      }
      await connection.rollback();
      return false;
    }
    catch (error) {
      console.error("Error al obtener datos de la asociación:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async registerAssociation(user: User, association: Association): Promise<any> {
    const sqlUser = "INSERT INTO User (email, password, role, photo) VALUES (?,?,?,?)";
    const sqlContact = "INSERT INTO Contact (name, age, cellphone, latitude, longitude, genre, user_id) VALUES (?,?,?,?,?,?,?)";
    const sqlAssociation = "INSERT INTO Association (name, foundation_date, social_reason, description, RFC, latitude, longitude, cellphone) VALUES (?,?,?,?,?,?,?,?)";
    const sqlManager = "INSERT INTO Manager (position, contact_id, institution_id, type) VALUES (?,?,?,?)";
    const hash = bcrypt.hashSync(user.password, 10);

    const paramsUser: any[] = [user.email, hash, user.role, 'https://wicare.s3.amazonaws.com/profile/deafult.jpeg'];
    const paramsContact: any[] = [user.contact?.name, user.contact?.age, user.contact?.cellphone, user.contact?.latitude, user.contact?.longitude, user.contact?.genre];
    const paramsAssociation: any[] = [association.name, association.foundation_date, association.social_reason, association.description, association.RFC, association.latitude, association.longitude, association.cellphone];
    const paramsManager: any[] = [association.manager.position];

    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();

        const [resultUser]: any = await query(sqlUser, paramsUser, connection);

        if (resultUser && resultUser.insertId) {
          
          paramsContact.push(resultUser.insertId);
          const [resultContact]: any = await query(sqlContact, paramsContact, connection);

          if (resultContact && resultContact.insertId) {
            
            const [resultAssociation]: any = await query(sqlAssociation, paramsAssociation, connection);
            
            if (resultAssociation && resultAssociation.insertId) {
              
              paramsManager.push(resultContact.insertId, resultAssociation.insertId, 'association');
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
      console.error("Error al registrar asociación:", error);
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
