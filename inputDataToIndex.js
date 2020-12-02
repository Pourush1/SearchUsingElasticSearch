const { Client } = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})

const run =  async() => {
  const dataSet = [
    {
      character: 'Pourush Shrestha',
      quote: 'A mind needs books like a sword needs a whetstone.',
      suggest: {
          input: ['Pourush', 'Shrestha']
      }
    },
    {  
      character: 'Ramesh Ghimire',
      quote: 'I am the blood of the dragon.',
      suggest: {
          input: ['Ramesh', 'Ghimire' ]
      }
    }
  ]

  const body = dataSet.flatMap(doc => [{ index: { _index: 'game-of-thrones' } }, doc])

  const { body: bulkResponse } = await client.bulk({ refresh: true, body })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const { body: count } = await client.count({ index: 'game-of-thrones' })
  console.log('Count is', count)
}

// run().catch(console.log)

module.exports = {run}