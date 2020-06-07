import { JsonApi } from "./json_api/mod.ts";
import { ExceptionHandler } from "./exception_handler.ts";
import { SlackHandler } from "./slack_handler.ts";

const api = new JsonApi({ port: 8000 });

api.addHandler(new SlackHandler());
api.addHandler(new ExceptionHandler());

await api.start();
