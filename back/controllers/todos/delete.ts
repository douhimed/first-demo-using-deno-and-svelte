import { DB_FILE_PATH } from "../../config/constants.ts";
import Todo from "./../../models/todo.model.ts";

export default async (
  { response, params }: { response: any; params: { id: string } },
) => {
  const decoted = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    const data = await Deno.readFile(DB_FILE_PATH);
    const todos: Todo[] = JSON.parse(decoted.decode(data));

    let index = -1;
    let deletedTodo = null;

    todos.forEach((todo, i) => {
      if (todo.id === Number(params.id)) {
        deletedTodo = todo;
        index = i;
      }
    });

    if (index >= 0 && index < todos.length && deletedTodo != null) {
      todos.splice(index, 1);

      await Deno.writeFile(
        DB_FILE_PATH,
        encoder.encode(JSON.stringify(todos)),
      );

      response.status = 200;
      response.body = {
        status: "success",
        todo: deletedTodo,
      };
    } else {
      response.status = 400;
      response.body = {
        status: "success",
        message: "ID not exists",
      };
    }
  } catch (error) {
    response.status = 502;
    response.body = { status: "failed", error };
  }
};
