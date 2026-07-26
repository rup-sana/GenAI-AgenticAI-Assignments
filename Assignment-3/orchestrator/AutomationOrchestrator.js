const MCPServer = require('../mcp/mcpServer');
const MCPClient = require('../mcp/mcpClient');
const LocatorAgent = require('../agents/locatorAgent');
const FunctionalityAgent = require('../agents/functionalityAgent');
const TestGenerationAgent = require('../agents/testGenerationAgent');

class AutomationOrchestrator {
  constructor(options = {}) {
    // Build the shared MCP infrastructure once and inject it into the agents.
    this.mcpServer = options.mcpServer || new MCPServer();
    this.mcpClient = options.mcpClient || new MCPClient(this.mcpServer);

    this.locatorAgent = options.locatorAgent || new LocatorAgent({ mcpClient: this.mcpClient, mcpServer: this.mcpServer });
    this.functionalityAgent = options.functionalityAgent || new FunctionalityAgent({ mcpClient: this.mcpClient, mcpServer: this.mcpServer });
    this.testGenerationAgent = options.testGenerationAgent || new TestGenerationAgent({ mcpClient: this.mcpClient, mcpServer: this.mcpServer });
  }

  // Main orchestration flow:
  // URL -> LocatorAgent -> MCP -> FunctionalityAgent -> TestGenerationAgent
  async run(url) {
    if (!url) {
      throw new Error('A webpage URL is required.');
    }

    // Step 1: Accept the webpage URL from the caller.
    const targetUrl = url;

    // Step 2: Execute LocatorAgent to scrape the target webpage.
    const locatorResult = await this.locatorAgent.discoverLocators(targetUrl);

    // Step 3: Store the extracted data in MCPServer through the existing MCP client.
    const mcpContext = locatorResult.mcpContext || {};

    // Step 4: Execute FunctionalityAgent using the MCP context.
    const functionalityResult = await this.functionalityAgent.identifyFeatures(mcpContext); 


    // Step 5: Execute TestGenerationAgent using the detected functionalities.
    const testScenarioResult = await this.testGenerationAgent.generateScenarios({
      pageTitle: mcpContext.title,
      pageUrl: mcpContext.url,
      detectedFeatures: functionalityResult.summary?.features || [],
      locators: locatorResult.locators || [],
    });

    // Step 6: Return a single JSON response containing all findings.
    return {
      pageTitle: mcpContext.title || '',
      url: mcpContext.url || targetUrl,
      extractedLocators: locatorResult.locators || [],
      detectedFunctionalities: functionalityResult.summary?.features || [],
      generatedPlaywrightScenarios: testScenarioResult.scenarios || [],
    };
  }
}

module.exports = AutomationOrchestrator;
