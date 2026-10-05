"use strict";
const shared=require('../cloud-common.cjs');
const file=name=>shared.path.join(__dirname,name);
const json=name=>JSON.parse(shared.fs.readFileSync(file(name),'utf8'));
const writeReceipt=(name,value,create=false)=>shared.fs.writeFileSync(file(name),JSON.stringify(value,null,2)+'\n',create?{flag:'wx'}:undefined);
module.exports={...shared,file,json,writeReceipt};
