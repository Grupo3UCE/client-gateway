// Importa los decoradores y interfaces necesarios desde el core de NestJS para la creación de filtros de excepciones.
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

// Importa RpcException desde el módulo de microservicios de NestJS, utilizado para manejar excepciones específicas de RPC.
import { RpcException } from '@nestjs/microservices';

// Usa el decorador @Catch para especificar que este filtro manejará excepciones de tipo RpcException.
@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  // Método 'catch' que se invoca cuando se captura una excepción del tipo especificado.
  catch(exception: RpcException, host: ArgumentsHost) {
    // Obtiene el contexto HTTP para manipular la respuesta HTTP.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Extrae el error del objeto de excepción RPC.
    const rpcError = exception.getError();

    // Verifica si el error es un objeto y contiene las propiedades 'status' y 'message'.
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      // Convierte el estado a número y utiliza 400 como predeterminado si no es numérico.
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      // Devuelve una respuesta HTTP con el estado y el error como JSON.
      return response.status(status).json(rpcError);
    }

    // Si el error no cumple con el formato esperado, devuelve un error genérico con estado 400.
    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
