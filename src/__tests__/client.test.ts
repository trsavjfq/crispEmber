import { describe, it, expect, vi } from "vitest";
import { Client } from "../index";

describe("Client", () => {
  it("constructs with required options", () => {
    const client = new Client({ apiKey: "test-key" });
    expect(client).toBeDefined();
  });
});