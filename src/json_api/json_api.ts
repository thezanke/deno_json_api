import {
  serve,
  Status,
  Server,
  ServerRequest,
  STATUS_TEXT,
} from "https://deno.land/std/http/mod.ts";
import { BodyParser } from "./body_parser.ts";
import { ContentType } from "./content_type.ts";

interface ApiOptions {
  port: number;
}

export interface HandlerPayload {
  request: ServerRequest;
  body: any;
  api: JsonApi;
}

export interface Handler {
  handler(options: HandlerPayload): Promise<any | undefined>;
}

export class JsonApi {
  public server: Server;
  private handlers: Array<Handler> = [];

  constructor({ port = 8000 }: ApiOptions) {
    this.server = serve({ port });
  }

  addHandler(h: Handler) {
    this.handlers.push(h);
  }

  async getResponse({ request, body }: { request: ServerRequest; body: any }) {
    return {
      status: Status.InternalServerError,
      message: STATUS_TEXT.get(Status.InternalServerError),
    };
    // try {
    //   for (const entry of this.handlers) {
    //     const response = entry.handler({ request, body, api: this });
    //     return response;
    //   }
    // } catch (e) {
    //   console.trace(e);
    //   return {
    //     status: Status.InternalServerError,
    //     message: STATUS_TEXT.get(Status.InternalServerError),
    //   };
    // }
  }

  async handleResponse(request: ServerRequest, responsePayload: any) {
    const headers = new Headers();
    headers.append("content-type", ContentType.JSON);

    const { status = Status.OK, ...response } = responsePayload;
    request.respond({ status, body: JSON.stringify(response), headers });
  }

  async start() {
    console.log("api started");
    for await (const request of this.server) {
      const body = await BodyParser.parse(request);
      request.respond({ status: Status.OK });
      // const responsePayload = await this.getResponse({ request, body });
      // this.handleResponse(request, responsePayload);
    }
  }
}
