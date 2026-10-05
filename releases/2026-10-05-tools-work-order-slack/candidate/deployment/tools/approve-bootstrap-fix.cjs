"use strict";
const {fs,assert,file,json,sha256,writeReceipt}=require('./cloud-common.cjs');
const report=json('bootstrap-fix-report.json'),review=json('bootstrap-fix-review.json'),bootstrap=json('page-bootstrap-verification.json');
assert.equal(report.artifactSHA256,'18c703d6e4703016d5177cb9d788c49702970fc5141361f5e38be29e904c05b5');
assert.equal(report.changed,1);assert.equal(review.result,'PASS');assert.equal(review.artifactSHA256,report.artifactSHA256);assert.equal(bootstrap.result,'PASS');
assert.equal(review.reportSHA256,sha256(fs.readFileSync(file('bootstrap-fix-report.json'))));
for(const[n,h]of Object.entries(review.toolHashes))assert.equal(sha256(fs.readFileSync(file(n))),h,n);
writeReceipt('bootstrap-fix-approval.json',{approved:true,approvedAt:new Date().toISOString(),artifactSHA256:report.artifactSHA256,reviewSHA256:sha256(fs.readFileSync(file('bootstrap-fix-review.json'))),toolSHA256:sha256(fs.readFileSync(file('deploy-bootstrap-fix.cjs'))),databaseWritesAllowed:false},true);
console.log(JSON.stringify({approved:true,scope:'One encoded HTML script reference only'}));
