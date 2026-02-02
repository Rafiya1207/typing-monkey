import { addCredentials, addUser, fetchPara } from "./api.js";

const decode = (data) => new TextDecoder().decode(data);
const encode = (data) => new TextEncoder().encode(data);

const readFromConnection = async (conn, buffer) => {
  const bytes = await conn.read(buffer);

  return await JSON.parse(decode(buffer.slice(0, bytes)));
};

const router = (usersCredentials, users, paragraphs, command, args) => {
  switch (command) {
    case "CREATE":
      return addCredentials(usersCredentials, args);
    case "FETCH_PARAGRAPGH":
      return fetchPara(paragraphs);
    case "CREATE_USER":
      return addUser(users, args);
  }
};

const handler = async (usersCredentials, users, paragraphs, conn) => {
  const buffer = new Uint8Array(1024);
  const request = await readFromConnection(conn, buffer);

  const response = router(
    usersCredentials,
    users,
    paragraphs,
    request.command,
    request.data,
  );

  await conn.write(encode(JSON.stringify(response)));
};

const startCentral = async () => {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 8000 });
  const usersCredentials = {};
  const data = await Deno.readFile("./paragraphs.json");
  const paragraphs = JSON.parse(decode(data));
  const users = {};

  for await (const conn of listener) {
    await handler(
      usersCredentials,
      users,
      {
        paragraphs,
        length: Object.keys(paragraphs).length,
      },
      conn,
    );
  }
};

startCentral();
