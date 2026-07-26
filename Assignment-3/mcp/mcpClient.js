class MCPClient {
  constructor(server = null) {
    this.server = server;
  }

  // Connects the agent layer to the MCP server.
  connect(server) {
    this.server = server;
    return this;
  }

  // Requests page context from the MCP server.
  async fetchPageContext(pageContext = {}) {
    if (!this.server) {
      return {
        title: pageContext.title || '',
        url: pageContext.url || '',
        buttons: [],
        links: [],
        forms: [],
        inputFields: [],
      };
    }

    if (typeof this.server.updatePageContext === 'function') {
      this.server.updatePageContext(pageContext);
    }

    if (typeof this.server.getPageContext === 'function') {
      return this.server.getPageContext();
    }

    return {};
  }
}

module.exports = MCPClient;
