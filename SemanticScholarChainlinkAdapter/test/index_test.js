const assert = require('chai').assert
const createRequest = require('../index.js').createRequest

describe('createRequest', () => {
  const jobID = '1'

  context('successful calls', () => {
    const requests = [
      { name: 'Deborah', testData: { id: jobID, data: { SemanticScholarID: '1679913' } } },
      { name: 'Oshani', testData: { id: jobID, data: { SemanticScholarID: '1693195' } } }
    ]

    requests.forEach(req => {
      it(`${req.name}`, (done) => {
        createRequest(req.testData, (statusCode, data) => {
          console.log(data)
          assert.equal(statusCode, 200)
          assert.equal(data.jobRunID, jobID)
          assert.isNotEmpty(data.data)
          done()
        })
      })
    })
  })

})
