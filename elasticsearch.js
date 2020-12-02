const { Client } = require('@elastic/elasticsearch')

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

//run().catch(console.log)
// putMap()