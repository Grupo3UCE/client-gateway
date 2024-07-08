// Importa el decorador Module desde NestJS para la creación de módulos.
import { Module } from '@nestjs/common';
// Importa el controlador para los productos.
import { ProductsController } from './products.controller';
// Importa los módulos y utilidades necesarios para implementar microservicios y transporte de datos.
import { ClientsModule, Transport } from '@nestjs/microservices';
// Importa constantes y configuraciones del proyecto, incluyendo la referencia al servicio de productos y variables de entorno.
import { PRODUCT_SERVICE, envs } from 'src/config';

// Decorador Module que define la configuración del módulo ProductsModule.
@Module({
  controllers: [ProductsController], // Lista de controladores que están registrados en este módulo, gestionando las rutas relacionadas con los productos.
  providers: [], // Lista de proveedores de servicios que pueden ser inyectados en otros componentes del módulo.
  imports: [
    // Importa y configura el módulo ClientsModule para establecer conexiones con otros servicios micro.
    ClientsModule.register([
      // Registro de un cliente microservicio.
      { 
        name: PRODUCT_SERVICE, // Nombre del servicio para referencia interna en NestJS.
        transport: Transport.TCP, // Tipo de transporte, en este caso TCP para la comunicación entre microservicios.
        options: {
          host: envs.productsMicroserviceHost, // Host del microservicio de productos, obtenido de variables de entorno.
          port: envs.productsMicroservicePort // Puerto en el cual está expuesto el microservicio de productos.
        }
      },
    ]),
  ]
})
// Exporta la clase ProductsModule para su uso en otras partes de la aplicación.
export class ProductsModule {}
