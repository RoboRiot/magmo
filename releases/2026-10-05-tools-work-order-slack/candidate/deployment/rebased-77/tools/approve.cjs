"use strict";
const {fs,assert,file,json,sha256,writeReceipt}=require('./cloud.cjs');
const report=json('package-report.json'),review=json('review.json');
assert.equal(report.artifactSHA256,'52f027af37b5fee19035ff4e387e5a4eb19e22f5a668d8e2df366b0ddfb5303e');
assert.equal(report.changed,1);assert.equal(review.result,'PASS');assert.equal(review.artifactSHA256,report.artifactSHA256);assert.equal(review.reportSHA256,sha256(fs.readFileSync(file('package-report.json'))));
for(const[n,h]of Object.entries(review.toolHashes))assert.equal(sha256(fs.readFileSync(file(n))),h,n);
writeReceipt('approval.json',{approved:true,approvedAt:new Date().toISOString(),artifactSHA256:report.artifactSHA256,reviewSHA256:sha256(fs.readFileSync(file('review.json'))),toolSHA256:sha256(fs.readFileSync(file('deploy.cjs'))),databaseWritesAllowed:false},true);
console.log(JSON.stringify({approved:true,scope:'One Tool HTML reference on top of preserved Ops revision77'}));
