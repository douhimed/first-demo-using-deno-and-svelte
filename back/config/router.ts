import { Router } from "https://deno.land/x/oak/mod.ts";

import getAll from "../controllers/todos/get.ts";
import addTodo from "../controllers/todos/post.ts";
import deleteTodo from "../controllers/todos/delete.ts";
import updateTodo from "../controllers/todos/put.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Welcome Home";
});

router
  .get("/todos", getAll)
  .post("/todos", addTodo)
  .delete("/todos/:id", deleteTodo)
  .put("/todos/:id", updateTodo);

export default router;
