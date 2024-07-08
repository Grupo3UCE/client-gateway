// Importa Type de 'class-transformer' para transformar propiedades de objetos antes de realizar la validación.
import { Type } from 'class-transformer';

// Importa decoradores de 'class-validator' para aplicar restricciones de validación en las propiedades.
import { IsNumber, IsString, Min } from 'class-validator';

// Define la clase CreateProductDto para especificar cómo se aceptan los datos para la creación de productos.
export class CreateProductDto {

  // Decora la propiedad 'name' con IsString para asegurar que solo se aceptan valores de tipo cadena.
  @IsString()
  public name: string;

  // Decora la propiedad 'price' con IsNumber y establece un límite de decimales usando 'maxDecimalPlaces'.
  // Esto garantiza que el valor sea numérico y que no exceda el número de decimales especificados.
  @IsNumber({
    maxDecimalPlaces: 4,
  })

  // Usa Min para especificar que el precio debe ser al menos 0, evitando valores negativos.
  @Min(0)

  // Usa Type para asegurar que el valor recibido sea convertido a número antes de las validaciones.
  // Esto es especialmente útil cuando se trabaja con datos que vienen en formato de texto (como JSON) y necesitas garantizar el tipo correcto.
  @Type(() => Number )
  public price: number;

}

