const createSuccessResponse = (body) => ({
  success: true,
  body,
  error: {},
});

const createFailureResponse = (error) => ({
  success: false,
  body: {},
  error,
});

export const createUser = (users, request) => {
  if (request.userId in users) {
    return createFailureResponse({
      errorCode: 10,
      errorMessage: `Error: userId ${request.userId} already exist`,
    });
  }

  users[request.userId] = {
    userName: request.userName,
    password: request.password,
  };

  return createSuccessResponse({
    userId: request.userId,
    userName: users[request.userId].userName,
  });
};
