# Semantic Scholar External Adapter

This is a Chainlink external designed to aggregate statistics from the [Semantic Scholar API](https://www.semanticscholar.org/). It returns four statistics: h-index, career length, publication count, citation count.

# Testing

To test with mocha, install mocha:
`sudo apt install mocha`

Then in the main directory, in bash shell: `$ mocha`

This will run two tests and give you the aggregated statistics for two researchers. You can change the SemanticScholarIDs passed in [the unit tests](/SemanticScholarChainlinkAdapter/test/index_test.js).