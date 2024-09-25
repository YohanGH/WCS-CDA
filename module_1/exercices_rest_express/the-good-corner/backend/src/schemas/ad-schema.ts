import Joi from "joi";

const adSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  owner: Joi.string().optional(),
  price: Joi.number().optional(),
  picture: Joi.string().optional(),
  location: Joi.string().optional(),
});

export default adSchema;
