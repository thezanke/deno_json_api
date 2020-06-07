import { JsonApi } from "./json_api/mod.ts";
import { NotFoundHandler } from "./not_found_handler.ts";
import { SlackHandler } from "./slack_handler.ts";

const api = new JsonApi({ port: 8000 });

api.addHandler(new SlackHandler());
api.addHandler(new NotFoundHandler());

await api.start();
