const express = require('express')
const { Client } = require('@elastic/elasticsearch')

const app = express()

app.use(express.json())

'use strict'

const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
      suggest: {
        input: 'Ned Stark'.split(' '),
        output: this.character
      }
    }
  })

  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.',
      suggest: {
        input: 'Daenerys Targaryen'.split(' '),
        output: this.character
      }
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.',
      suggest: {
        input: 'Tyrion Lannister'.split(' '),
        output: this.character
      }
    }
  })
}

const checkIndices = async () => {
  client.indices.exists({index: 'game-of-thrones'})
  .then(response => {
    if(!response.body) {
      client.indices.create( { index: 'game-of-thrones'})
      console.log('Succcessfully created new index')
    }
    console.log('Index has already been created')
  })
  .catch(error => console.log('Error is', error))
}

const putMap = async () => {

  client.indices.putMapping({
   index: 'game-of-thrones',
   body: {
     properties: {
       character: { type: "text" },
       quote: { type: "text" },
       suggest: {
           type: "completion",
           analyzer: "simple"
       }
     }
   }
 }, (err, res, status) => {
   if (err) {
     console.error('Error is' , err, status)
   }
   else {
     console.log('Successfully created mapping', status, res)
   }
 });
}

const getSuggestions = async() => {
   client.search({
    index: 'game-of-thrones',
    body: {
          _source: "suggest",
          suggest: {
            gotsuggest : {
              text: 'Ty', 
              completion : {field : 'suggest'}
            }
          }
        }
  }).then(res => console.log('Response is', res))
  .catch(err => console.log('Error is', err))
}

//run().catch(console.log)
checkIndices()
// putMap()
// getSuggestions()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))