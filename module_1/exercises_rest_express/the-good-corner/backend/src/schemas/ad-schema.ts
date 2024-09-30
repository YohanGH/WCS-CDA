import Joi from "joi";

const adSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  owner: Joi.string().required(),
  price: Joi.number().required(),
  picture: Joi.string().optional(),
  location: Joi.string().optional(),
  createdAt: Joi.date().required(),
  category: Joi.object({
    id: Joi.number().required()
  }).required(),
  tags: Joi.array().items(
    Joi.object({
      id: Joi.number().required()
    })
  ).optional()
});

export default adSchema;
