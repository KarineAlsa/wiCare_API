import { User } from "../../Domain/Entity/User";
import VolunteerInterface  from "../../Domain/Port/VolunteerInterface";
import bcrypt, { hashSync } from 'bcrypt'
import query from "../../Database/mysql";
import { Volunteer } from "../../Domain/Entity/Volunteer";


export default class UserMysqlRepository implements VolunteerInterface {
  async registerVolunteer(user: User, volunteer: Volunteer): Promise<any> {
    const sqlUser = "INSERT INTO User (email, password,role) VALUES (?,?,?)";
    const sqlContact = "INSERT INTO Contact (name,age, cellphone, address, genre, user_id) VALUES (?,?,?,?,?,?)";
    const sqlVolunteer = "INSERT INTO Volunteer (CURP, occupation,contact_id) VALUES (?,?,?)";
    const hash = bcrypt.hashSync(user.password, 10);
    const paramsUser: any[] = [user.email, hash,user.role];
    const paramsContact: any[] = [user.contact.name, user.contact.age, user.contact.cellphone, user.contact.address, user.contact.genre];
    const paramsVolunteer: any[] = [volunteer.CURP,volunteer.occupation];
    try {
        const [resultUser]: any = await query(sqlUser, paramsUser);
      if (resultUser) {
        paramsContact.push(resultUser.insertId);
        const [resultContact]: any = await query(sqlContact, paramsContact);

        if (resultContact) {
          paramsVolunteer.push(resultContact.insertId);
          const [resultVolunteer]: any = await query(sqlVolunteer, paramsVolunteer);
          if (resultVolunteer) {
            return {
              id: resultUser.insertId, 
              email: user.email,
              role: user.role,
            }
          }
        }
      } else {
        throw new Error("Error al insertar el usuario en la base de datos");
        }
    }
    catch (error) {
      throw new Error(`Error en la operación de guardado`);
    }
  }  

  async login(mail: string, password: string): Promise<any> {
    const sql = "SELECT * FROM Users WHERE email = ?";
    const params: any[] = [mail];
    try {
      const [[result]]: any = await query(sql, params);
        
      if (result){
        
        if(bcrypt.compareSync(password, result.password) == true){
            const birthday=result.birthday.toISOString().slice(0, 10);
            const createDate = result.createDate.toISOString().slice(0, 10);
            return {id:result.id,name:result.name, username: result.username, email:result.email, birthday:birthday,createDate:createDate};
            
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