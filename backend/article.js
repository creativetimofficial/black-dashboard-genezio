import mongoose from "mongoose";
import ArticleModel from "./models/articles";
import { MONGO_DB_URI } from "./config";
import reqAuth from "./middleware/reqAuth";
import { numberOfPastMonths } from "./utils/constants";
import {GenezioDeploy} from "@genezio/types";

@GenezioDeploy()
export class Article {
  constructor() {
    this.#connect();
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

    const elements = (await ArticleModel.find({})).map(elem => {
      return {
        __v: undefined,
        ...elem
      };
    });
    var labels = [];
    for (var i = 1; i <= numberOfPastMonths; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const currentLabel = date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();
      labels.push(currentLabel);
    }
    var data = [];
    for (const label of labels) {
      var numberOfItems = 0;
      for (const elem of elements) {
        if (!elem.publishDate) {
          continue;
        }

        if (
          elem.publishDate
            .toLocaleString("en-US", { month: "short" })
            .toUpperCase() === label
        ) {
          numberOfItems = numberOfItems + 1;
        }
      }
      data.push(numberOfItems);
    }
    return {
      success: true,
      labels: labels,
      data: data,
      numberOfItems: elements.length
    };
  }

  async getAll(token) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }

    const elements = await ArticleModel.find({});
    return { success: true, elements: elements };
  }

  async getById(token, id) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    const element = await ArticleModel.findById(id);
    if (!element) {
      return { success: false, msg: "Element not found by given id" };
    }
    return { success: true, elements: element };
  }

  async create(token, title, content, publishDate, createdBy, tags, status) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (
      title == null ||
      content == null ||
      publishDate == null ||
      createdBy == null ||
      status == null
    ) {
      return { success: false, msg: "required fields are empty" };
    }
    const newObj = await ArticleModel.create({
      title: title,
      content: content,
      publishDate: publishDate,
      createdBy: createdBy,
      tags: tags,
      status: status
    });
    return { success: true, elemId: newObj._id };
  }

  async update(
    token,
    id,
    title,
    content,
    publishDate,
    createdBy,
    tags,
    status
  ) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (!id) {
      return { success: false, msg: "Required fields are empty" };
    }
    const dataToSet = {};

    if (title != null) {
      dataToSet.title = title;
    }

    if (content != null) {
      dataToSet.content = content;
    }

    if (publishDate != null) {
      dataToSet.publishDate = publishDate;
    }

    if (createdBy != null) {
      dataToSet.createdBy = createdBy;
    }

    if (tags != null) {
      dataToSet.tags = tags;
    }

    if (status != null) {
      dataToSet.status = status;
    }

    const newValues = { $set: dataToSet };
    const item = await ArticleModel.updateOne({ _id: id }, newValues);
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
    await ArticleModel.deleteMany({ _id: id });
    return { success: true };
  }
}
