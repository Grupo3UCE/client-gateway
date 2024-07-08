// Importaciones necesarias desde el framework NestJS y los módulos locales.
import { NestFactory } from '@nestjs/core'; // Importa la función NestFactory para la creación de la aplicación NestJS.
import { AppModule } from './app.module'; // Importa AppModule que actúa como módulo raíz de la aplicación.
import { envs } from './config'; // Importa las variables de entorno configuradas en el archivo de configuración.
import { Logger, ValidationPipe } from '@nestjs/common'; // Importa utilidades comunes de NestJS: Logger para los logs y ValidationPipe para la validación.
import { RpcCustomExceptionFilter } from './common'; // Importa un filtro personalizado para manejar excepciones de llamadas RPC.

// Función asíncrona bootstrap para inicializar y configurar la aplicación.
async function bootstrap() {
  // Crea una instancia del Logger específica para el Gateway.
  const logger = new Logger('Main-Gateway');

  // Crea la aplicación NestJS basada en el módulo raíz AppModule.
  const app = await NestFactory.create(AppModule);

  // Establece un prefijo global para todas las rutas de la API.
  app.setGlobalPrefix('api');

  // Configura globalmente el ValidationPipe para la aplicación.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite las propiedades que son explícitamente declaradas en los DTOs.
      forbidNonWhitelisted: true, // Lanza un error si se encuentran propiedades no permitidas.
    }),
  );

  // Utiliza un filtro global para manejar excepciones específicas de llamadas RPC.
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // Inicia la aplicación escuchando en el puerto definido en las variables de entorno
  await app.listen(envs.port);

  // Registra en el log que el Gateway está corriendo y en qué puerto.
  logger.log(`Gateway running on port ${envs.port}`);
}

// Llama a la función bootstrap para iniciar el proceso.
bootstrap();
