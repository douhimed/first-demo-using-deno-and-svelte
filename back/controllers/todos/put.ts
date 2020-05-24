import { DB_FILE_PATH } from "../../config/constants.ts";
import Todo from "./../../models/todo.model.ts";

export default async (
  { response, request, params }: {
    response: any;
    request: any;
    params: { id: string };
  },
) => {
  const decoted = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const data = await Deno.readFile(DB_FILE_PATH);
    const todos: Array<Todo> = JSON.parse(decoted.decode(data));

    const { value: {title, completed} } = await request.body();

    let updatedIndex = -1;
    const updatedTodo = todos.map((todo, index) => {
      if (todo.id === Number(params.id)) {
        updatedIndex = index;
        return {
          ...todo,
          title: title != null ? title : todo.title,
          completed: completed != null ? completed : todo.completed,
        };
      }
      return todo;
    });
    if (updatedIndex >= 0 && updatedIndex < todos.length) {
      await Deno.writeFile(
        DB_FILE_PATH,
        encoder.encode(JSON.stringify(updatedTodo)),
      );

      response.status = 200;
      response.body = { status: "success", todo: updatedTodo[updatedIndex] };
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
