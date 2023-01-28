import { writeFile } from 'fs/promises';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
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
});
