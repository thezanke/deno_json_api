import { Status, STATUS_TEXT } from "https://deno.land/std/http/mod.ts";
import { Handler } from "./json_api/mod.ts";

export class NotFoundHandler implements Handler {
  async handler() {
    return {
      status: Status.NotFound,
      message: STATUS_TEXT.get(Status.NotFound),
    };
  }
}
