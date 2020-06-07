import { Status } from "https://deno.land/std/http/mod.ts";
import { ApiContext, Handler, NotFoundException } from "./json_api/mod.ts";

export class SlackHandler implements Handler {
  async handler({ request }: ApiContext) {
    if (request.url === "/hello") {
      throw new NotFoundException('test');
      // return {
      //   status: Status.OK,
      //   body: { message: "hello world" },
      // };
    }
  }
}
