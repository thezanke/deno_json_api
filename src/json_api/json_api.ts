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
    const api = this;

    try {
      for (const instance of this.handlers) {
        const response = await instance.handler({ request, body, api });
        return response;
      }
    } catch (e) {
      console.trace(e);
      return {
        status: Status.InternalServerError,
        message: STATUS_TEXT.get(Status.InternalServerError),
      };
    }
  }

  async handleResponse(request: ServerRequest, responsePayload: any) {
    const headers = new Headers();
    headers.append("content-type", ContentType.JSON);

    const { status = Status.OK, ...response } = responsePayload;
    request.respond({ status, body: JSON.stringify(response), headers });
  }

  async start() {
    for await (const request of this.server) {
      const body = await BodyParser.parse(request);
      const responsePayload = await this.getResponse({ request, body });
      await this.handleResponse(request, responsePayload);
    }
  }
}
