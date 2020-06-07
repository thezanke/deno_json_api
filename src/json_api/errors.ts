import { Status, STATUS_TEXT } from "https://deno.land/std/http/mod.ts";

export class ApiException extends Error {
  public name = "ApiException";
}

export class NotFoundException extends ApiException {
  public name = "NotFoundException";
  constructor(message = STATUS_TEXT.get(Status.NotFound)) {
    super(message);
  }
}
