const BaseAgent = require('./baseAgent');

class FunctionalityAgent extends BaseAgent {
  constructor(options = {}) {
    super(options);
  }

  // Responsibility: read MCP context and identify important webpage capabilities.
  async identifyFeatures(pageContext = {}) {
    const context = this.buildContext(pageContext);
    const mcpContext = await this.requestMcpContext(pageContext);
    const providerResult = await this.invokeProvider('Identify important webpage features', { ...context, mcpContext });

    const features = [];
    const combinedElements = [
      ...(mcpContext.buttons || []),
      ...(mcpContext.links || []),
      ...(mcpContext.forms || []),
      ...(mcpContext.inputFields || []),
      ...(mcpContext.dropdowns || []),
      ...(mcpContext.textareas || []),
      ...(mcpContext.tables || []),
    ];

    const textHints = combinedElements.map((item) => `${item.text || ''} ${item.placeholder || ''} ${item.name || ''}`.toLowerCase());

    if (mcpContext.forms?.length > 0) {
      const hasLoginSignals = textHints.some((hint) => hint.includes('login') || hint.includes('sign in') || hint.includes('email') || hint.includes('password'));
      if (hasLoginSignals) {
        features.push({ name: 'Login form', type: 'form', confidence: 0.8 });
      } else {
        features.push({ name: 'Contact form', type: 'form', confidence: 0.6 });
      }
    }

    if (textHints.some((hint) => hint.includes('search')) || (mcpContext.inputFields || []).some((item) => item.placeholder?.toLowerCase().includes('search'))) {
      features.push({ name: 'Search bar', type: 'input', confidence: 0.8 });
    }

    if ((mcpContext.links || []).length > 0) {
      features.push({ name: 'Navigation menu', type: 'navigation', confidence: 0.7 });
    }

    if ((mcpContext.buttons || []).length > 0) {
      features.push({ name: 'Buttons', type: 'button', confidence: 0.7 });
    }

    if ((mcpContext.forms || []).length > 0 || (mcpContext.textareas || []).length > 0 || (mcpContext.dropdowns || []).length > 0) {
      features.push({ name: 'Forms', type: 'form', confidence: 0.6 });
    }

    if ((mcpContext.tables || []).length > 0) {
      features.push({ name: 'Tables', type: 'table', confidence: 0.4 });
    }

    return {
      agent: 'FunctionalityAgent',
      context,
      mcpContext,
      summary: {
        url: mcpContext.url || '',
        title: mcpContext.title || '',
        features,
      },
      providerMetadata: providerResult,
    };
  }
}

module.exports = FunctionalityAgent;
