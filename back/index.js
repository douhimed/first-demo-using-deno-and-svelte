import { Application } from "https://deno.land/x/oak/mod.ts";

import { PORT, HOST } from "./config/constants.ts";
import router from "./config/router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on port http://${HOST}:${PORT}`);

await app.listen(`${HOST}:${PORT}`);
