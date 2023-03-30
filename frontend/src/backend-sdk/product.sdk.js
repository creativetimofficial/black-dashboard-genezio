/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Product {
      static remote = new Remote("http://127.0.0.1:8083/Product")
  
      static async getChartData(token) {
          return Product.remote.call("Product.getChartData", token)  
      }
  
      static async getAll(token) {
          return Product.remote.call("Product.getAll", token)  
      }
  
      static async getById(token, id) {
          return Product.remote.call("Product.getById", token, id)  
      }
  
      static async create(token, name, description, photoLink, price, brandId, brandName, stock, warehouseCode, weight) {
          return Product.remote.call("Product.create", token, name, description, photoLink, price, brandId, brandName, stock, warehouseCode, weight)  
      }
  
      static async update(token, id, name, description, photoLink, price, brandId, brandName, stock, warehouseCode, weight) {
          return Product.remote.call("Product.update", token, id, name, description, photoLink, price, brandId, brandName, stock, warehouseCode, weight)  
      }
  
      static async delete(token, id) {
          return Product.remote.call("Product.delete", token, id)  
      }
  
      
  }
  
  export { Remote };
  