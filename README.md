# AWS CDK Split Horizon DNS Construct

Small construct to help manage split-horizon DNS configs in AWS Route53 

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

See [the API Doc for extended details](./API.md)

`npm install aws-cdk-split-horizon-dns`
Then in your code:
```ts
import { SplitHorizonDns, AliasTarget } from 'aws-cdk-split-horizon-dns'

const firstTarget: AliasTarget = {
  target: [googleDns],
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

### Installing

A step by step series of examples that tell you how to get a development
environment running

Say what the step will be

    Give the example

And repeat

    until finished

End with an example of getting some data out of the system or using it
for a little demo


## Built With

  - [Contributor Covenant](https://www.contributor-covenant.org/) - Used
    for the Code of Conduct
  - [Creative Commons](https://creativecommons.org/) - Used to choose
    the license
  - [projen]()
  - [CDK]()


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
[contributors](https://github.com/PurpleBooth/a-good-readme-template/contributors)
who participated in this project.

## License

Apache. See [LICENSE](./LICENSE)

## Acknowledgments

  - Hat tip to anyone whose code is used
  - Inspiration
  - etc