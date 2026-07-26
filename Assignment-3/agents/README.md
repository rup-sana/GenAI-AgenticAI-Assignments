# Agents folder

This folder now contains a modular, reusable multi-agent architecture for Playwright automation.

## Agent responsibilities
- LocatorAgent: discovers and extracts webpage locators.
- FunctionalityAgent: identifies important webpage features such as login forms, navigation menus, search bars, buttons, tables, and forms.
- TestGenerationAgent: creates Playwright test scenarios from the information collected by the other agents.

## Shared support
- baseAgent.js: common foundation for future provider integration with GitHub Copilot, MCP, or Azure AI.

## MCP communication flow
- LocatorAgent and FunctionalityAgent receive an MCP client through the shared base agent.
- Each agent calls the MCP client to request webpage context from the MCP server before generating analysis.
- The MCP server returns structured page data such as title, URL, buttons, links, forms, and input fields.

These modules currently use placeholder implementations so the architecture can be connected to an external AI provider later without changing the public interfaces.
