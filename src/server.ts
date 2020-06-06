import {
  serve,
  Status,
} from "https://deno.land/std/http/mod.ts";
import { BodyParser } from "./body_parser.ts";
const server = serve({ port: 8000 });

for await (const req of server) {
  const body = await BodyParser.parse(req);
  req.respond({ status: Status.OK });
}
