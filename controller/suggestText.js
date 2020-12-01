const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

const suggest = async(req, res) => {
  const { text } = req.params

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

module.exports = {suggest}