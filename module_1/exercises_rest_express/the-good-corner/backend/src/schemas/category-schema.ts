import Joi from "joi";

const categorySchema = Joi.object({
  title: Joi.string().required(),
});

export default categorySchema;
