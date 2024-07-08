// Importaciones de NestJS y bibliotecas asociadas para la gestión de controladores y manejo de excepciones.
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices'; // Importaciones para comunicación entre microservicios.
import { catchError } from 'rxjs'; // Utilizado para manejar errores en operaciones asíncronas.
import { PaginationDto } from 'src/common'; // DTO para la paginación de listados.
import { PRODUCT_SERVICE } from 'src/config'; // Constante de configuración para inyectar dependencias.
import { CreateProductDto } from './dto/create-product.dto'; // DTO para la creación de productos.
import { UpdateProductDto } from './dto/update-product.dto'; // DTO para la actualización de productos.

// Decorador Controller para especificar la ruta base del controlador.
@Controller('products')
export class ProductsController {
  // Inyecta un cliente de proxy para la comunicación entre microservicios.
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  // Método POST para crear un nuevo producto.
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  // Método GET para obtener todos los productos con soporte de paginación.
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  // Método GET para obtener un producto específico por su ID.
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // Método DELETE para eliminar un producto por su ID.
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // Método PATCH para actualizar un producto específico.
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
