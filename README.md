## sample middleware for create-user on pryv

It relies on [express](https://www.npmjs.com/package/express) and [pryv](https://www.npmjs.com/package/pryv)

It requires an extra "mandatoryText" that will be created in a predefined stream.

### Install 
`npm install`

### Run 
`node index.js`

### Test 

`curl -i -X POST -H 'Content-Type: application/json' -d '{"username":"user-123-abc","password":"ChjUzDXwaTG2qdV","email":"joseph-brenner@pryv.me", "mandatoryText": "Hello"}' "https://localhost:3000/create-user"`