import { ServerRequest } from "https://deno.land/std/http/mod.ts";
import { decode } from "https://deno.land/std/encoding/utf8.ts";

export class BodyParser {
  static async parse(req: ServerRequest) {
    const bodyBuff = await Deno.readAll(req.body);
    const body = decode(bodyBuff);

    const contentType = req.headers.get("content-type");
    if (contentType === "application/json") {
      try {
        return JSON.parse(body);
      } catch (e) {
        console.error("Couldn't parse JSON body:\n", body);
        return null;
      }
    }

    return body;
  }
}
