const path=require('node:path');const {OAuth2Client}=require('google-auth-library');
const cli=path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib');
const account=require(path.join(cli,'auth.js')).getProjectDefaultAccount(process.cwd());
const api=require(path.join(cli,'api.js'));const client=new OAuth2Client(api.clientId(),api.clientSecret());
client.setCredentials({refresh_token:account.tokens.refresh_token});
const request=async(url,method='GET',data,params)=>(await client.request({url,method,data,params,timeout:30000,retry:false})).data;
module.exports={client,request};
