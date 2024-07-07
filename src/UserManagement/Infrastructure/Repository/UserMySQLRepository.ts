import { User } from "../../Domain/Entity/User";
import UserInterface from "../../Domain/Port/UserInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";

export default class UserMysqlRepository implements UserInterface {
  async uploadPhoto(fileUrl:string, id:any): Promise<any> {
    const sql = "UPDATE User SET photo = ? WHERE id = ?";
    const params: any[] = [fileUrl,id];
    let connection;
    try{
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      await query(sql, params,connection);
      await connection.commit();
      await connection.release();
      return {url:fileUrl,
              userid:id
      };

    }
    catch(error){
      if (connection) {
        await connection.rollback();
        await connection.release();
      }
      console.error("Error al subir la foto del usuario:", error);
      return false;
    }
  }
  
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
            await connection.commit();
            await connection.release();
            return {id:result.id, role:result.role};
            
        }
        else{
          await connection.release();
          return false
        }
      }
      else {
        await connection.release();
        return false
      }
    }catch (error) {
      if (connection) {
        await connection.rollback();
        return false;
      }
    }
  }

  async logout(token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
