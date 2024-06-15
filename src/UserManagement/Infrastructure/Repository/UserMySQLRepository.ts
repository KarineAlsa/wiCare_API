import { User } from "../../Domain/Entity/User";
import VolunteerInterface from "../../Domain/Port/UserInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Volunteer } from "../../Domain/Entity/Volunteer";

export default class UserMysqlRepository implements VolunteerInterface {
  
  async login(mail: string, password: string): Promise<any> {
    const sql = "SELECT * FROM User WHERE email = ?";
    const params: any[] = [mail];
    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [[result]]: any = await query(sql, params,connection);
        
      if (result){
        
        if(bcrypt.compareSync(password, result.password) == true){
            
            return {id:result.id, role:result.role};
            
        }
        else{
          return false
        }
      }
      else {
        return false
      }
    }catch (error) {
        return false;
    }
  }

  async logout(token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
