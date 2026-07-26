# Orchestrator

This folder contains the AutomationOrchestrator module, which coordinates the multi-agent framework.

## Orchestration flow
1. Accept a webpage URL.
2. Run LocatorAgent to inspect the page and extract interactive elements.
3. Send the extracted page context to MCPServer through the MCP client.
4. Run FunctionalityAgent using the MCP context to detect page capabilities.
5. Run TestGenerationAgent using the detected features to prepare Playwright test scenarios.
6. Return one combined JSON response with the page title, URL, extracted locators, detected functionalities, and generated scenarios.

## Design notes
- Each agent remains independent and loosely coupled.
- The orchestrator does not execute Playwright tests; it only prepares the analysis and scenario data.
- The flow follows this path: URL -> LocatorAgent -> MCP -> FunctionalityAgent -> TestGenerationAgent.
