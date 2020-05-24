import { DB_FILE_PATH } from "../../config/constants.ts";
import Todo from "./../../models/todo.model.ts";

export default async (
  { response, request }: { response: any; request: any },
) => {
  const decoted = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const { value : {title} } = await request.body();

    const data = await Deno.readFile(DB_FILE_PATH);
    const todos: Array<Todo> = JSON.parse(decoted.decode(data));

    let maxId = getMaxId(todos);

    const newTodo: Todo = { id: ++maxId, title, completed: false };
    todos.push(newTodo);

    await Deno.writeFile(DB_FILE_PATH, encoder.encode(JSON.stringify(todos)));

    response.status = 200;
    response.body = { status: "success", newTodo };
  } catch (error) {
    response.status = 502;
    response.body = { status: "failed", error };
  }
};

function getMaxId(todos: Array<Todo>) {
  let maxId = 0;
  if (todos.length > 0) {
    maxId = todos[0].id;
    for (let i = 1; i < todos.length; i++) {
      if (todos[i].id > maxId) {
        maxId = todos[i].id;
      }
    }
  }
  return maxId;
}
