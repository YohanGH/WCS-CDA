import Joi from "joi";

const adSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  owner: Joi.string().required(),
  price: Joi.number().required(),
  picture: Joi.string().optional(),
  location: Joi.string().optional(),
  createdAt: Joi.string().required(),
});

export default adSchema;
