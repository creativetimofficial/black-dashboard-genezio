/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class User {
      static remote = new Remote("http://127.0.0.1:8083/User")
  
      static async create(name, email, password, userType, gender, phoneNumber, city, country) {
          return User.remote.call("User.create", name, email, password, userType, gender, phoneNumber, city, country)  
      }
  
      static async login(email, password) {
          return User.remote.call("User.login", email, password)  
      }
  
      static async getUserByToken(token) {
          return User.remote.call("User.getUserByToken", token)  
      }
  
      static async logout(token) {
          return User.remote.call("User.logout", token)  
      }
  
      static async updateUser(token, updatedUser) {
          return User.remote.call("User.updateUser", token, updatedUser)  
      }
  
      static async sendForgotPasswordEmail(email) {
          return User.remote.call("User.sendForgotPasswordEmail", email)  
      }
  
      static async resetPassword(userId, password) {
          return User.remote.call("User.resetPassword", userId, password)  
      }
  
      
  }
  
  export { Remote };
  