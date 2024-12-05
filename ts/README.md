# mcp-wait-ts MCP Server

A Model Context Protocol server

This is a TypeScript-based MCP server that implements waiting for a specified number of seconds.

## Features

### Tools
- `wait_seconds` - Wait for a specified number of seconds

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-wait-ts": {
      "command": "node",
      "args": [
        "/path/to/mcp-wait/ts/build/index.js"
      ]
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
