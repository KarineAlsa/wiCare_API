import { User } from "../../Domain/Entity/User";
import VolunteerInterface from "../../Domain/Port/VolunteerInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Volunteer } from "../../Domain/Entity/Volunteer";

export default class UserMysqlRepository implements VolunteerInterface {
  async getProfileDataVolunteer(id: number): Promise<any> {
    const sql = "SELECT * FROM User u JOIN Contact c ON u.id = c.user_id JOIN Volunteer v ON c.id = v.contact_id WHERE u.id = ?";
    const params = [id];
    
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      console.log(result)
      if (result && result.length > 0) {
        return {
          id: result[0].id,
          email: result[0].email,
          role: result[0].role,
          name: result[0].name,
          cellphone: result[0].cellphone,
          genre: result[0].genre,
          occupation: result[0].occupation,
        };
      }
      return false;
    }
    catch (error) {
      console.error("Error al obtener datos del voluntario:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  async registerVolunteer(user: User, volunteer: Volunteer): Promise<any> {
    const sqlUser = "INSERT INTO User (email, password, role) VALUES (?, ?, ?)";
    const sqlContact = "INSERT INTO Contact (name, age, cellphone, latitude,longitude, genre, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const sqlVolunteer = "INSERT INTO Volunteer (CURP, occupation, contact_id, postal) VALUES (?, ?, ?, ?)";

    const hash = bcrypt.hashSync(user.password, 10);
    const paramsUser: any[] = [user.email, hash, user.role];
    const paramsContact: any[] = [user.contact?.name, user.contact?.age, user.contact?.cellphone, user.contact?.latitude, user.contact?.longitude, user.contact?.genre];
    const paramsVolunteer: any[] = [volunteer.CURP, volunteer.occupation];

    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [resultUser]: any = await query(sqlUser, paramsUser, connection);
      if (resultUser && resultUser.insertId) {
        paramsContact.push(resultUser.insertId);
        const [resultContact]: any = await query(sqlContact, paramsContact,connection);
        if (resultContact && resultContact.insertId) {
          paramsVolunteer.push(resultContact.insertId, volunteer.postal);
          const [resultVolunteer]: any = await query(sqlVolunteer, paramsVolunteer,connection);
          if (resultVolunteer && resultVolunteer.insertId) {
            await connection.commit();
            return {
              id: resultUser.insertId,
              email: user.email,
              role: user.role,
            };
          }
        }
      }

      await connection.rollback();
      return false;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error("Error al registrar voluntario:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async login(mail: string, password: string): Promise<any> {
    // Implementación del método login
  }

  async logout(token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
