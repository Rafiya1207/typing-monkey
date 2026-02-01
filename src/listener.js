import { createUser, fetchPara } from "./api.js";

const decode = (data) => new TextDecoder().decode(data);
const encode = (data) => new TextEncoder().encode(data);

const readFromConnection = async (conn, buffer) => {
  const bytes = await conn.read(buffer);

  return await JSON.parse(decode(buffer.slice(0, bytes)));
};

const router = (users, paragrapghs, command, args) => {
  switch (command) {
    case "CREATE":
      return createUser(users, args);
    case "FETCH_PARAGRAPGH":
      return fetchPara(paragrapghs);
  }
};

const handler = async (users, paragrapghs, conn) => {
  const buffer = new Uint8Array(1024);
  const request = await readFromConnection(conn, buffer);

  const response = router(users, paragrapghs, request.command, request.data);

  await conn.write(encode(JSON.stringify(response)));
};

const startCentral = async () => {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 8000 });
  const users = {};
  const data = await Deno.readFile("./paragraphs.json");
  const paragrapghs = JSON.parse(decode(data));

  for await (const conn of listener) {
    await handler(users, {
      paragrapghs,
      length: Object.keys(paragrapghs).length,
    }, conn);
  }
};

startCentral();
