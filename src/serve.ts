import { JsonApi } from "./json_api/mod.ts";
import { NotFoundHandler } from "./not_found_handler.ts";
import { SlackHandler } from "./slack_handler.ts";
console.log("test");
const api = new JsonApi({ port: 3000 });
api.addHandler(new SlackHandler());
api.addHandler(new NotFoundHandler());
await api.start();
