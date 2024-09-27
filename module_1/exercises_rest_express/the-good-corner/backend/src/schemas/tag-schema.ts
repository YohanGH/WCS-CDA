import Joi from "joi";

const tagSchema = Joi.object({
  title: Joi.string().required(),
});

export default tagSchema;
