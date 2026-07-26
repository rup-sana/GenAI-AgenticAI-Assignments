class MCPServer {
  constructor(initialContext = {}) {
    this.pageContext = {
      title: initialContext.title || '',
      url: initialContext.url || '',
      buttons: initialContext.buttons || [],
      links: initialContext.links || [],
      forms: initialContext.forms || [],
      inputFields: initialContext.inputFields || [],
      dropdowns: initialContext.dropdowns || [],
      textareas: initialContext.textareas || [],
      tables: initialContext.tables || [],
    };
  }

  // Placeholder MCP endpoint: stores and exposes page context.
  updatePageContext(pageContext = {}) {
    this.pageContext = {
      title: pageContext.title || this.pageContext.title,
      url: pageContext.url || this.pageContext.url,
      buttons: Array.isArray(pageContext.buttons) ? pageContext.buttons : this.pageContext.buttons,
      links: Array.isArray(pageContext.links) ? pageContext.links : this.pageContext.links,
      forms: Array.isArray(pageContext.forms) ? pageContext.forms : this.pageContext.forms,
      inputFields: Array.isArray(pageContext.inputFields) ? pageContext.inputFields : this.pageContext.inputFields,
      dropdowns: Array.isArray(pageContext.dropdowns) ? pageContext.dropdowns : this.pageContext.dropdowns,
      textareas: Array.isArray(pageContext.textareas) ? pageContext.textareas : this.pageContext.textareas,
      tables: Array.isArray(pageContext.tables) ? pageContext.tables : this.pageContext.tables,
    };

    return this.pageContext;
  }

  // Exposes webpage context to MCP clients.
  getPageContext() {
    return {
      title: this.pageContext.title,
      url: this.pageContext.url,
      buttons: this.pageContext.buttons,
      links: this.pageContext.links,
      forms: this.pageContext.forms,
      inputFields: this.pageContext.inputFields,
      dropdowns: this.pageContext.dropdowns,
      textareas: this.pageContext.textareas,
      tables: this.pageContext.tables,
    };
  }

  // Provides a concise summary for agent consumption.
  getContextSummary() {
    return {
      title: this.pageContext.title,
      url: this.pageContext.url,
      elementCounts: {
        buttons: this.pageContext.buttons.length,
        links: this.pageContext.links.length,
        forms: this.pageContext.forms.length,
        inputFields: this.pageContext.inputFields.length,
        dropdowns: this.pageContext.dropdowns.length,
        textareas: this.pageContext.textareas.length,
        tables: this.pageContext.tables.length,
      },
    };
  }
}

module.exports = MCPServer;
