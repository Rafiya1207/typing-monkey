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
      createUser(users, request);
      assertEquals(users, {
        "someone123": { userName: "someone", password: "12345" },
      });
    });
  });
});
