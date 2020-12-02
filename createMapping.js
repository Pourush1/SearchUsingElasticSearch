const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

const putMap = async index => {
  client.indices
    .putMapping({
      index: index,
      body: {
        properties: {
          character: { type: 'text' },
          quote: { type: 'text' },
          suggest: {
            type: 'completion',
            analyzer: 'simple'
          }
        }
      }
    })
    .then(res => console.log('Response is', res))
    .catch(err => console.log('Error is', err))
}

module.exports = { putMap }
