const { Requester, Validator } = require('@chainlink/external-adapter')

const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

const customParams = {
  id: ['SemanticScholarID'],
  endpoint: false
}

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams)

  const jobRunID = validator.validated.id
  const SemanticScholarID = validator.validated.data.id
  const url = 'https://api.semanticscholar.org/graph/v1/author/'.concat(SemanticScholarID,
    '?fields=paperCount,citationCount,hIndex,papers.year')

  const config = { url }

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then(response => {
      const papers = response.data.papers
      const paperYears = []
      for (let i = 0; i < papers.length; i++) {
        if (papers[i].year !== null) {
          paperYears.push(papers[i].year)
        }
      }
      const careerLength = Math.max(...paperYears) - Math.min(...paperYears)
      response.data.careerLength = careerLength

      delete response.data.papers

      callback(response.status, Requester.success(jobRunID, response))
    })
    .catch(error => {
      callback(500, Requester.errored(jobRunID, error))
    })
}

// This allows the function to be exported for testing
module.exports.createRequest = createRequest
