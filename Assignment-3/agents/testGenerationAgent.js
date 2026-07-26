const BaseAgent = require('./baseAgent');

class TestGenerationAgent extends BaseAgent {
  constructor(options = {}) {
    super(options);
  }

  // Responsibility: turn collected insights into Playwright test scenarios.
  async generateScenarios(analysis = {}) {
    const providerResult = await this.invokeProvider('Generate Playwright test scenarios', analysis);

    return {
      agent: 'TestGenerationAgent',
      providerMetadata: providerResult,
      scenarios: [
        {
          name: 'homepageLoads',
          purpose: 'Validate that the page renders correctly',
          steps: ['Open the page', 'Verify the main heading exists'],
        },
        {
          name: 'searchInteraction',
          purpose: 'Validate search behavior when a search bar is present',
          steps: ['Locate the search input', 'Type a query', 'Submit the search'],
        },
      ],
    };
  }

  // Responsibility: create a reusable template for a single Playwright scenario.
  async buildScenarioTemplate(scenario = {}) {
    return {
      title: scenario.name || 'placeholderScenario',
      steps: scenario.steps || [],
      notes: 'This template can later be converted into a real Playwright spec.',
    };
  }
}

module.exports = TestGenerationAgent;
