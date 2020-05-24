import { DB_FILE_PATH } from "../../config/constants.ts";
import Todo from "./../../models/todo.model.ts";

export default async ({ response }: { response: any }) => {
  const decoted = new TextDecoder();
  try {
    const data = await Deno.readFile(DB_FILE_PATH);
    const todos: Array<Todo> = JSON.parse(decoted.decode(data));
    response.status = 200;
    response.body = { status: "success", todos };
  } catch (error) {
    response.status = 500;
    response.body = { status: "failed", todos: [] };
  }
};
