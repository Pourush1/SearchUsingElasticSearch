## Installation Instruction

---

1. Run **npm install** after you download the project.
2. Run **npm run dev** which would fire the server.
3. You also have to download the elasticsearch and run the instance of the service. The installtion instructions can be found at: https://www.elastic.co/guide/en/elasticsearch/reference/current/zip-windows.html
   Run the elasticsearch service as instructed from the command line. You can verify if the service is runnig by sending an HTTP request to port 9200 on localhost: http://localhost:9200/

## Discussion of Technolgies used

---

1. **ElasticSearch** - as a fast-search database to store the data and do the necessary searching as you type the text.
2. **Node.js** - a back-end, Javascript runtime environment that executes Javascript code outside of a web browser.
3. **Express** - a lightweight web application framework which helps you to make robust API qucik and easy.
4. **Cors** - to handle a secure cross-origin requests and data transfers between browsers and servers.
5. **Nodemon** - automatically fires the server or node application when file changes in the directory are detected.
6. **ElasticSearch Node.js client** - official node.js client for ElasticSearch. https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html

## Met the search-as-you-type requirement

---

**Implemented Completion Suggester**
I used Completetion Suggester feature to implement seach-as-you-type functionality. You can look at the use cases of this analyzer here.
https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-suggesters.html#completion-suggester

**Indexed the data**
For this project, I have only indexed 11 data of particular mapping in the 'game-of-thrones' index. I can index millions or more than millions of data using an API call which provides me a data of particular type or use bulk feature of inserting a json file with more than million data. For bulk helper, we can use this. https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/client-helpers.html

In this project, I have inserted the data in the index using bulk feature as well, but had inserted the data using mapping and iterating over the array of json objects.

**Mapping the data**
To use completion suggester feature, we have to map the data as well and provide the document properties as well as provide suggest filed as a property. You can look into the details in the document provided above.

**Querying the database**
To query the database, you can use api.http file inside the requests folder, to get the suggestions on the basis of the text you entered, you can use this request in different ways, some examples :
http://localhost:5000/suggest/Ram => returns arrray of 4 objects with name 'Ramesh Ghimire'
http://localhost:5000/suggest/Ty => returns arrray of 1 object with name 'Tyrion Lannister'
http://localhost:5000/suggest/Po => returns arrray of 4 objects with name 'Pourush Shrestha'
http://localhost:5000/suggest/Shr => returns arrray of 4 objects with name 'Pourush Shrestha'

**Note:** => You need to install HTTP Rest client extension in the VScode to make the API call inside VScode and see the response inside there as well. By the way, I have console logged the response here, instead of sending it back to client, because there is no UI involved.
