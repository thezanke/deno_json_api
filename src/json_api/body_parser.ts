import { ServerRequest } from "https://deno.land/std/http/mod.ts";
import { decode } from "https://deno.land/std/encoding/utf8.ts";
import { ContentType } from "./content_type.ts";

export class BodyParser {
  static async parse(req: ServerRequest) {
    const bodyBuffer = await Deno.readAll(req.body);
    const body = decode(bodyBuffer);

    const contentType = req.headers.get("content-type");
    if (contentType === ContentType.JSON) {
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
