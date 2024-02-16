import * as Joi from 'joi';

const schema = Joi.object({
  port: Joi.number().integer(),
  rabbitMQ: Joi.object({
    url: Joi.string().uri(),
    queue: Joi.string(),
  }),
});

export default () => {
  const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    rabbitMQ: {
      url: process.env.URL_RABBIT_MQ || 'amqp://localhost:5672',
      queue: process.env.QUEUE_RABBIT_MQ,
    },
  };
  const { error } = schema.validate(config);
  if (error) {
    throw new Error(`Config error: ${error.message}`);
  }
  console.log(config);
  return config;
};
