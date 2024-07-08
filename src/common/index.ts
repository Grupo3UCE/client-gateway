// Esto permite que cualquier otro archivo importe directamente desde este archivo índice, en lugar de tener que especificar la ruta completa hasta 'pagination.dto'.
export * from './dto/pagination.dto';

// Exporta todo desde el archivo 'rpc-custom-exception.filter'.
// Similar al anterior, facilita la importación de 'RpcCustomExceptionFilter' sin necesidad de especificar la ruta completa del archivo.
export * from './exceptions/rpc-custom-exception.filter';