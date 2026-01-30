import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { createUser } from "../src/api.js";

describe("typing-monkey", () => {
  describe("createUser", () => {
    let users;
    beforeEach(() => users = {});

    it("create user successsfully", () => {
      const request = {
        userName: "someone",
        password: "12345",
        userId: "someone123",
      };
      assertEquals(createUser(users, request), {
        success: true,
        body: {
          userId: "someone123",
          userName: "someone",
        },
        error: {},
      });
      assertEquals(users, {
        "someone123": { userName: "someone", password: "12345" },
      });
    });
    it("user already exist", () => {
      const request = {
        userName: "someone",
        password: "12345",
        userId: "someone123",
      };
      assertEquals(createUser(users, request), {
        success: true,
        body: {
          userId: "someone123",
          userName: "someone",
        },
        error: {},
      });
      assertEquals(users, {
        "someone123": { userName: "someone", password: "12345" },
      });
      assertEquals(createUser(users, request), {
        success: false,
        body: {},
        error: {
          errorCode: 10,
          errorMessage: `Error: userId ${request.userId} already exist`,
        },
      });
      assertEquals(users, {
        "someone123": { userName: "someone", password: "12345" },
      });
    });
  });
});
