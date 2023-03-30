import mongoose, { set } from "mongoose";
import ProductModel from "./models/products";
import { MONGO_DB_URI } from "./config";
import reqAuth from "./middleware/reqAuth";

export class Product {
  constructor() {
    this.#connect()
  }

  // connect mongoose to mongodb
  #connect() {
    mongoose.set("strictQuery", false);
    try {
      mongoose.connect(MONGO_DB_URI);
    } catch (err) {
      console.log(err);
    }
  }

  async getChartData(token) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }

    const elements = await ProductModel.find({});
    var setLabels = new Set();
    for (const prod of elements) {
      setLabels.add(prod.brandName);
    }
    
    var labels = []
    setLabels.forEach(element => labels.push(element))
    var data = [];
    for (const brand of labels) {
      var numberOfItems = 0;
      for (const prod of elements) {
        if (prod.brandName === brand) {
          numberOfItems = numberOfItems + 1;
        }
      }
      data.push(numberOfItems);
    }
    return { success: true, labels: labels, data: data, numberOfItems: elements.length };
  }

  async getAll(token) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }

    const elements = await ProductModel.find({});
    return { success: true, elements: elements };
  }

  async getById(token, id) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    const element = await ProductModel.findById(id);
    if (!element) {
      return { success: false, msg: "Element not found by given id" };
    }
    return { success: true, elements: element };
  }

  async create(
    token,
    name,
    description,
    photoLink,
    price,
    brandId,
    brandName,
    stock,
    warehouseCode,
    weight
  ) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (
      name == null ||
      description == null ||
      photoLink == null ||
      price == null ||
      brandId == null ||
      brandName == null ||
      stock == null ||
      warehouseCode == null ||
      weight == null
    ) {
      return { success: false, msg: "required fields are empty" };
    }
    const newProduct = await ProductModel.create({
      name: name,
      description: description,
      photoLink: photoLink,
      price: price,
      brandId: brandId,
      brandName: brandName,
      stock: stock,
      warehouseCode: warehouseCode,
      weight: weight,
    });
    return { success: true, elemId: newProduct._id };
  }

  async update(
    token,
    id,
    name,
    description,
    photoLink,
    price,
    brandId,
    brandName,
    stock,
    warehouseCode,
    weight
  ) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (!id) {
      return { success: false, msg: "Required fields are empty" };
    }
    const dataToSet = {};

    if (name != null) {
      dataToSet.name = name;
    }

    if (description != null) {
      dataToSet.description = description;
    }

    if (photoLink != null) {
      dataToSet.photoLink = photoLink;
    }

    if (price != null) {
      dataToSet.price = price;
    }

    if (brandId != null) {
      dataToSet.brandId = brandId;
    }

    if (brandName != null) {
      dataToSet.brandName = brandName;
    }

    if (stock != null) {
      dataToSet.stock = stock;
    }

    if (warehouseCode != null) {
      dataToSet.warehouseCode = warehouseCode;
    }

    if (weight != null) {
      dataToSet.weight = weight;
    }

    const newValues = { $set: dataToSet };
    const item = await ProductModel.updateOne({ _id: id }, newValues);
    if (!item) {
      return { success: false, msg: "Element does not exists" };
    }
    return { success: true };
  }

  async delete(token, id) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (!id) {
      return { success: false, msg: "Required fields are empty" };
    }
    await ProductModel.deleteMany({ _id: id });
    return { success: true };
  }
}
