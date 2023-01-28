const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'IamFlowZ',
  authorAddress: 'hello@dakotalewallen.me',
  cdkVersion: '2.62.2',
  defaultReleaseBranch: 'main',
  name: 'aws-cdk-split-horizon-dns',
  repositoryUrl: 'https://github.com/iamflowz/aws-cdk-split-horizon-dns.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['@types/jest'],
  packageName: 'aws-cdk-split-horizon-dns',
});
project.synth();