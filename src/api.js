export const createUser = (users, request) => {
  users[request.userId] = {
    userName: request.userName,
    password: request.password,
  };
};
