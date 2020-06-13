import { decode } from "https://deno.land/std/encoding/utf8.ts";
import { ServerRequest } from "https://deno.land/std/http/mod.ts";
import { ContentType } from "./content_type.ts";

export class BodyParser {
  static async parse(req: ServerRequest) {
    const bodyBuffer = await Deno.readAll(req.body);
    const body = decode(bodyBuffer);

    const contentType = req.headers.get("content-type");
    try {
      switch (contentType) {
        case ContentType.JSON: {
          return JSON.parse(body);
        }
        case ContentType.formEncoded: {
          return Object.fromEntries(new URLSearchParams(body));
        }
      }
    } catch (e) {
      console.error(`Couldn't parse ${contentType} body:\n`, body);
      return null;
    }

    return body;
  }
}
