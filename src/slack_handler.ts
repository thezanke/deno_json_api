import { Status } from "https://deno.land/std/http/mod.ts";
import { Handler, ApiContext, JsonApi } from "./json_api/mod.ts";

export class SlackHandler implements Handler {
  constructor() {}

  async handler({ request }: ApiContext) {
    if (request.url === "/hello") {
      return {
        status: Status.OK,
        body: { message: "hello world" },
      };
    }
  }
}
