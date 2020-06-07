import { Status, STATUS_TEXT } from "https://deno.land/std/http/mod.ts";
import { ApiContext, Handler, NotFoundException } from "./json_api/mod.ts";

export class ExceptionHandler implements Handler {
  async errorHandler({ error }: ApiContext) {
    console.log(error);
    if (error instanceof NotFoundException) {
      return {
        status: Status.NotFound,
        message: STATUS_TEXT.get(Status.NotFound),
      };
    } else {
      return {
        status: Status.InternalServerError,
      };
    }
  }
}
