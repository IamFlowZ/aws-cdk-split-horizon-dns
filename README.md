# AWS CDK Split Horizon DNS Construct

Small construct to help manage split-horizon DNS configs in AWS Route53 

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

See [the API Doc for extended details](./API.md)
Also see unit tests for extended usage details.

`npm install aws-cdk-split-horizon-dns`
Then in your code:
```ts
import { SplitHorizonDns, AliasTarget } from 'aws-cdk-split-horizon-dns'

const firstTarget: AliasTarget = {
  target: ['8.8.8.8'],
  private: true,
};

const bucketWebsite = new s3.Bucket(stack, 'BucketWebsite', {
  bucketName: exampleDomain, // www.example.com
  publicReadAccess: true,
  websiteIndexDocument: 'index.html',
});

const constructTarget: AliasTarget = {
  target: new targets.BucketWebsiteTarget(bucketWebsite),
  public: true,
};

new SplitHorizonDns(scope, 'MyDNS', {
  zoneName: 'example.com',
  privateZoneVpcs: [vpc],
  targets: [constructTarget, firstTarget],
})
```

### Prerequisites

Requirements for the software and other tools to build, test and push 
- [aws-cdk](https://www.example.com)

## Built With

  - [Contributor Covenant](https://www.contributor-covenant.org/) - Used
    for the Code of Conduct
  - [Creative Commons](https://creativecommons.org/) - Used to choose
    the license
  - [projen](https://github.com/projen/projen)
  - [CDK](https://aws.amazon.com/cdk/)


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this
repository](https://github.com/PurpleBooth/a-good-readme-template/tags).

## Authors

  - **Billie Thompson** - *Provided README Template* -
    [PurpleBooth](https://github.com/PurpleBooth)
  - **Dakota Lewallen** - *Initial development*  -
    [IamFlowz](https://github.com/IamFlowz)

See also the list of
[contributors](https://github.com/iamflowz/aws-cdk-dns-split-horizon/contributors)
who participated in this project.

## License

Apache. See [LICENSE](./LICENSE)

## Acknowledgments
