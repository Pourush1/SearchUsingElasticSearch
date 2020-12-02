const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })
const createMapping = require('../createMapping')

const checkIndices = async (req, res) => {
  const {text} = req.params

  client.indices.exists({index: text})
  .then(response => {
    if(!response.body) {
      client.indices.create( { index: text})
      .then(res => res.status(200).json('Successfully created new index'))
      .catch(err => res.status(400).json('Bad Request'))
    }
    else {
       res.status(409).json('Index already in the server')
    }
  })
  .catch(error => console.log('Error is', error))
}

module.exports = {checkIndices}