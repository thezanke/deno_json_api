import { Status } from "https://deno.land/std/http/mod.ts";
import { Handler, HandlerPayload } from "./json_api/mod.ts";

export class SlackHandler implements Handler {
  async handler({ request }: HandlerPayload) {
    if (request.url === "/hello") {
      return {
        status: Status.OK,
        message: "hello world",
      };
    }
  }
}
