import {
  serve,
  Status,
  Server,
  ServerRequest,
} from "https://deno.land/std/http/mod.ts";
import { BodyParser } from "./body_parser.ts";
import { ContentType } from "./content_type.ts";

interface ApiOptions {
  port: number;
}

export interface ApiResponse {
  status?: number;
  [key: string]: any;
}

export interface ApiContext {
  request: ServerRequest;
  body?: any;
  response?: ApiResponse;
  error?: Error;
}

export interface Handler {
  handler(ctx: ApiContext): Promise<ApiResponse | undefined>;
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

  async getResponse({ request, body }: ApiContext) {
    let response: ApiResponse = {};
    response.headers = new Headers();

    try {
      for (const instance of this.handlers) {
        let newResponse = await instance.handler({ request, body, response });
        if (newResponse !== response) {
          Object.assign(response, newResponse);
        }
      }
    } catch (e) {
      response.error = e;
    } finally {
      return response;
    }
  }

  async handleResponse({ request, response }: ApiContext) {
    if (response && response.status) {
      const { status, headers } = response;

      let { body } = response;
      try {
        body = JSON.stringify(body);
        response.headers.append("content-type", ContentType.JSON);
      } catch (e) {
        console.warn("couldn't stringify response");
      }

      request.respond({ status, headers, body });
    } else {
      request.respond({ status: Status.InternalServerError });
    }
  }

  async start() {
    for await (const request of this.server) {
      const body = await BodyParser.parse(request);
      const response = await this.getResponse({ request, body });
      await this.handleResponse({ request, body, response });
    }
  }
}
