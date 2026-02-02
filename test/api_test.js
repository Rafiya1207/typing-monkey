import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { addCredentials, addUser } from "../src/api.js";

describe("typing-monkey", () => {
  describe("addUserCredentials", () => {
    let usersCredentials;
    beforeEach(() => usersCredentials = {});

    it("add user credentials successsfully", () => {
      const request = {
        userName: "someone",
        password: "12345",
        userId: "someone123",
      };
      assertEquals(addCredentials(usersCredentials, request), {
        success: true,
        body: {
          userId: "someone123",
          userName: "someone",
        },
        error: {},
      });
      assertEquals(usersCredentials, {
        "someone123": { userName: "someone", password: "12345" },
      });
    });
    it("user already exist", () => {
      const request = {
        userName: "someone",
        password: "12345",
        userId: "someone123",
      };
      assertEquals(addCredentials(usersCredentials, request), {
        success: true,
        body: {
          userId: "someone123",
          userName: "someone",
        },
        error: {},
      });
      assertEquals(usersCredentials, {
        "someone123": { userName: "someone", password: "12345" },
      });
      assertEquals(addCredentials(usersCredentials, request), {
        success: false,
        body: {},
        error: {
          errorCode: 10,
          errorMessage: `Error: userId ${request.userId} already exist`,
        },
      });
      assertEquals(usersCredentials, {
        "someone123": { userName: "someone", password: "12345" },
      });
    });
  });

  describe("addUser", () => {
    let users;
    beforeEach(() => users = {});

    it("create user successfully", () => {
      const data = {
        userId: "123",
        userName: "someone",
      };

      assertEquals(addUser(users, data), {
        success: true,
        body: {
          "userId": "123",
          "userName": "someone",
          "stats": {
            "grossWPM": 0,
            "rawWPM": 0,
            "accuracy": 0,
          },
        },
        error: {},
      });
    });
  });
});
