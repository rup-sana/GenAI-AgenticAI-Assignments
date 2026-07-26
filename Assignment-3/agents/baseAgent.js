const MCPClient = require('../mcp/mcpClient');
const MCPServer = require('../mcp/mcpServer');

class BaseAgent {
  constructor(options = {}) {
    this.provider = options.provider || 'placeholder';
    this.model = options.model || 'placeholder-model';
    this.mcpClient = options.mcpClient || null;
    this.mcpServer = options.mcpServer || null;
  }

  // Shared helper for future AI provider integration.
  async invokeProvider(prompt, context = {}) {
    return {
      provider: this.provider,
      model: this.model,
      prompt,
      context,
    };
  }

  // Builds a reusable context object for downstream agents.
  buildContext(pageContext = {}) {
    return {
      url: pageContext.url || '',
      title: pageContext.title || '',
      timestamp: new Date().toISOString(),
    };
  }

  // Requests page context from the MCP server when a client is available.
  async requestMcpContext(pageContext = {}) {
    if (!this.mcpClient) {
      const server = this.mcpServer || new MCPServer();
      this.mcpServer = server;
      this.mcpClient = new MCPClient(server);
    }

    return this.mcpClient.fetchPageContext(pageContext);
  }
}

module.exports = BaseAgent;
