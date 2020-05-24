const env = Deno.env.toObject();

export const PORT = env.PORT || 4000;
export const HOST = env.HOST || "localhost";

export const DB_FILE_PATH = "./data/data.json";
