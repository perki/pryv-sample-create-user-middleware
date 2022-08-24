const express = require('express');
const pryv = require('pryv');
const superagent = pryv.utils.superagent;
const app = express();
app.use(express.json()); // to get json parser 

app.post('/create-user', async function(request, response){
  const dataRequest = request.body;
  console.log('received', dataRequest);      // received JSON

  if (! dataRequest.mandatoryText) {
    response.status(422);
    response.send('Missing or invalid "mandatoryText" property');
    return;
  }

  const dataCreate = {
    appId: 'default',
    username: dataRequest.username,
    password: dataRequest.password,
    email: dataRequest.email,
    invitationToken: 'enjoy',
    language: 'en',
    referer: 'not-important'
  }

  try {
    const resultCreateUser = await superagent.post('https://co1.pryv.me/users', dataCreate);
    const connection = new pryv.Connection(resultCreateUser.body.apiEndpoint);
    // here create the streams & co 
    await connection.api([
      {
        "method": "streams.create",
        "params": { "id": "profile", "name": "Profile" }
      },
      {
        "method": "events.create",
        "params": { "streamIds": ["profile"], "type": "note/txt", "content": dataRequest.mandatoryText }
      },
    ]);
    response.send(resultCreateUser.body);    // echo the result back
  } catch (error) { // in case of error stop and send it

    if (error.response?.res !== null) {
      response.status(error.status);
      response.send(error.response?.res.text);
      return;
    }
    
    response.status(500);
    response.send(error.message);
    return;
  }
 
});

app.listen(3000);