#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "mcp-wait-ts",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "wait_seconds",
        description: "Wait for a specified number of seconds",
        inputSchema: {
          type: "object",
          properties: {
            seconds: {
              type: "number",
              description: "Number of seconds to wait",
            }
          },
          required: ["seconds"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "wait_seconds": {
      const seconds = Number(request.params.arguments?.seconds);
      if (!seconds) {
        throw new Error("Seconds is required");
      }
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      return {
        content: [{
          type: "text",
          text: `Waited for ${seconds} seconds`
        }]
      };
    }

    default:
      throw new Error("Unknown tool");
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
