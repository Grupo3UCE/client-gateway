// Importa Type de 'class-transformer' para manejar la transformación de tipos de datos.
import { Type } from 'class-transformer';

// Importa IsOptional y IsPositive de 'class-validator' para validar las propiedades de paginación.
import { IsOptional, IsPositive } from 'class-validator';

// Define la clase PaginationDto para gestionar los datos de paginación recibidos en las solicitudes.
export class PaginationDto {

  // Declara la propiedad 'page' que indica la página actual en la paginación.
  // @IsPositive asegura que el valor sea un número positivo.
  // @IsOptional permite que la propiedad sea opcional, proporcionando un valor por defecto si no se especifica.
  // @Type(() => Number) convierte el valor de entrada a número, útil para el manejo de datos recibidos como cadenas.
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  // Declara la propiedad 'limit' que indica la cantidad de elementos por página.
  // La configuración de validación y transformación es similar a la propiedad 'page'.
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

}
