const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

main();

async function main(){
  try {
    var code;
    code = await exec.exec('npm install')
    console.log(`exit code: ${code}!`);
    
    code = await exec.exec('npm run gulp vscode-darwin-arm64-min')
    console.log(`exit code: ${code}!`);
  
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}