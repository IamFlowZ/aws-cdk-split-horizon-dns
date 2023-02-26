import { writeFile } from 'fs/promises';
import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SplitHorizonDns, AliasTarget } from '../src/index';

// @ts-ignore helper function
const prettyPrint = (value: any) => console.log(JSON.stringify(value, null, 2));

// @ts-ignore helper function
const outputTemplate = async (value: any) => writeFile('./test/template.json', JSON.stringify(value, null, 2));

const exampleDomain = 'example.com';
const googleDns = '8.8.8.8';

describe('split horizon', () => {

  it('builds zones', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');
    new SplitHorizonDns(stack, 'MostBasicTestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::HostedZone', {
      Name: Match.anyValue(),
      VPCs: Match.arrayWith([
        Match.objectLike({
          VPCId: Match.anyValue(),
        }),
      ]),
    });

    template.hasResourceProperties('AWS::Route53::HostedZone', {
      Name: Match.anyValue(),
    });
  });

  it('creates a public A record', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: [googleDns],
      public: true,
    };

    new SplitHorizonDns(stack, 'PublicATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PublicZone'),
      }),
      TTL: '1800', // the default if no ttl is supplied
    });
  });

  it('creates a private A record', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: [googleDns],
      private: true,
    };

    new SplitHorizonDns(stack, 'PrivateATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PrivateZone'),
      }),
    });
  });

  it('creates both a public and private A record', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: [googleDns],
      private: true,
      public: true,
    };

    new SplitHorizonDns(stack, 'PrivateAndPublicATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PrivateZone'),
      }),
    });

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PublicZone'),
      }),
    });
  });

  it('creates no records if neither flag is set', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: ['4.4.4.4'],
    };

    const splitHorizonDns = new SplitHorizonDns(stack, 'NeitherATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    // an empty array is always created
    expect(splitHorizonDns.records.length).toBe(0);
  });

  // need to mock .fromValues and assert it's called
  it.skip('uses from values if string is passed', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: ['4.4.4.4'],
      public: true,
    };

    const splitHorizonDns = new SplitHorizonDns(stack, 'NeitherATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    // an empty array is always created
    expect(splitHorizonDns.records.length).toBe(1);
  });

  it('can create a public A record for constructs', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: '11111111',
        region: 'us-east-1',
      },
    });
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const bucketWebsite = new s3.Bucket(stack, 'BucketWebsite', {
      bucketName: exampleDomain, // www.example.com
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const constructTarget = {
      target: new targets.BucketWebsiteTarget(bucketWebsite),
      public: true,
    };

    new SplitHorizonDns(stack, 'NeitherATestConstruct', {
      zoneName: exampleDomain,
      privateZoneVpcs: [vpc],
      targets: [constructTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.anyValue(),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PublicZone'),
      }),
      AliasTarget: Match.objectLike({
        DNSName: Match.anyValue(),
        HostedZoneId: Match.anyValue(),
      }),
    });
  });

  it('can create a private A record for constructs', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: '11111111',
        region: 'us-east-1',
      },
    });
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const bucketWebsite = new s3.Bucket(stack, 'BucketWebsite', {
      bucketName: exampleDomain, // www.example.com
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const constructTarget = {
      target: new targets.BucketWebsiteTarget(bucketWebsite),
      private: true,
    };

    new SplitHorizonDns(stack, 'NeitherATestConstruct', {
      zoneName: exampleDomain,
      privateZoneVpcs: [vpc],
      targets: [constructTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.anyValue(),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PrivateZone'),
      }),
      AliasTarget: Match.objectLike({
        DNSName: Match.anyValue(),
        HostedZoneId: Match.anyValue(),
      }),
    });
  });

  it('can create a private and a public A record for constructs', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: '11111111',
        region: 'us-east-1',
      },
    });
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const bucketWebsite = new s3.Bucket(stack, 'BucketWebsite', {
      bucketName: exampleDomain, // www.example.com
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const constructTarget = {
      target: new targets.BucketWebsiteTarget(bucketWebsite),
      private: true,
      public: true,
    };

    new SplitHorizonDns(stack, 'NeitherATestConstruct', {
      zoneName: exampleDomain,
      privateZoneVpcs: [vpc],
      targets: [constructTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.anyValue(),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PrivateZone'),
      }),
      AliasTarget: Match.objectLike({
        DNSName: Match.anyValue(),
        HostedZoneId: Match.anyValue(),
      }),
    });
    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.anyValue(),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PublicZone'),
      }),
      AliasTarget: Match.objectLike({
        DNSName: Match.anyValue(),
        HostedZoneId: Match.anyValue(),
      }),
    });
  });

  it('sets the TTL of records if provided', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');

    const firstTarget: AliasTarget = {
      target: [googleDns],
      public: true,
      ttl: Duration.seconds(3600),
    };

    new SplitHorizonDns(stack, 'PublicATestConstruct', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('PublicZone'),
      }),
      TTL: '3600',
    });
  });

  it('omits the private zone if disallowed', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    new SplitHorizonDns(stack, 'MostBasicTestConstruct', {
      zoneName: 'example.com',
      disallowPrivateZone: true,
      targets: [],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::HostedZone', Match.not({
      Name: Match.anyValue(),
      VPCs: Match.arrayWith([
        Match.objectLike({
          VPCId: Match.anyValue(),
        }),
      ]),
    }));

    template.hasResourceProperties('AWS::Route53::HostedZone', {
      Name: Match.anyValue(),
    });
  });

  // this test is tricky. as there is no observable property of the record
  it.skip('doesnt create private records if disallowed', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');

    const firstTarget: AliasTarget = {
      target: [googleDns],
      private: true,
      public: true,
    };

    new SplitHorizonDns(stack, 'MostBasicTestConstruct', {
      zoneName: 'example.com',
      disallowPrivateZone: true,
      targets: [firstTarget],
    });

    // thing.records.forEach((record) => {
    //   console.log(record);
    // });
  });

  it('can receive an existing public zone', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const existingZone = new route53.PublicHostedZone(stack, 'ExistingPublicZone', {
      zoneName: 'example.com',
    });

    const firstTarget: AliasTarget = {
      target: [googleDns],
      public: true,
    };

    new SplitHorizonDns(stack, 'MostBasicTestConstruct', {
      zoneName: 'example.com',
      existingPublicZone: existingZone,
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('ExistingPublicZone'),
      }),
    });
  });

  it('can receive an existing private zone', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new ec2.Vpc(stack, 'myvpc');
    const existingZone = new route53.PrivateHostedZone(stack, 'ExistingPrivateZone', {
      zoneName: 'example.com',
      vpc,
    });

    const firstTarget: AliasTarget = {
      target: [googleDns],
      private: true,
    };

    new SplitHorizonDns(stack, 'MostBasicTestConstruct', {
      zoneName: 'example.com',
      existingPrivateZone: existingZone,
      targets: [firstTarget],
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: Match.stringLikeRegexp(`${exampleDomain}\.`),
      Type: 'A',
      HostedZoneId: Match.objectLike({
        Ref: Match.stringLikeRegexp('ExistingPrivateZone'),
      }),
    });
  });
});
