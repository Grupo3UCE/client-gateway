// Importa el módulo dotenv para cargar las variables de entorno desde un archivo .env al objeto process.env.
import 'dotenv/config';

// Importa la biblioteca Joi para la validación de esquemas.
import * as joi from 'joi';

// Define una interfaz TypeScript para tipar las variables de entorno esperadas.
interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
}

// Define el esquema Joi para las variables de entorno, especificando los tipos y la obligatoriedad.
const envsSchema = joi.object({
  PORT: joi.number().required(), // Puerto para la aplicación, debe ser un número y es requerido.
  PRODUCTS_MICROSERVICE_HOST: joi.string().required(), // Host del microservicio de productos, debe ser una cadena y es requerido.
  PRODUCTS_MICROSERVICE_PORT: joi.number().required(), // Puerto para el microservicio de productos, debe ser un número y es requerido.
})
.unknown(true); // Permite que el objeto contenga otras propiedades además de las definidas.

// Valida el objeto process.env con el esquema definido, capturando cualquier error y los valores validados.
const { error, value } = envsSchema.validate(process.env);

// Si hay un error en la validación, lanza una excepción con el mensaje de error.
if ( error ) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Asigna los valores validados a la variable envVars, asegurando que cumplan con la interfaz EnvVars.
const envVars: EnvVars = value;

// Exporta las variables de entorno validadas y tipadas como un objeto para su uso en la aplicación.
export const envs = {
  port: envVars.PORT,
  productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
};
