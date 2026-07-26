# MCP support

This folder contains a placeholder Model Context Protocol (MCP) implementation for the Playwright automation framework.

## How it works
- mcpServer.js exposes webpage context such as the page title, URL, buttons, links, forms, and input fields.
- mcpClient.js provides a simple interface for agents to request and consume that context.
- The LocatorAgent and FunctionalityAgent call the client to retrieve page context before generating their analysis.

This architecture can later be upgraded to connect to a real MCP server, GitHub Copilot, or Azure AI without changing the agent interfaces.
