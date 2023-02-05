import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

const isAliasRecordTarget = (value: route53.IAliasRecordTarget | Array<string>): value is route53.IAliasRecordTarget => {
  return !('length' in value);
};

type ARecordArray = Array<route53.ARecord>;

export interface AliasTarget {
  readonly target: route53.IAliasRecordTarget | Array<string>;
  readonly private?: boolean;
  readonly public?: boolean;
  readonly ttl?: cdk.Duration;
}

export interface ISplitHorizonDnsProps {
  readonly zoneName: string;
  readonly certAlternateNames?: Array<string>;
  readonly privateZoneVpcs: Array<ec2.Vpc>;
  readonly targets: Array<AliasTarget>;
  readonly includeCertificate?: boolean;
}

export class SplitHorizonDns extends Construct {
  public publicZone: route53.HostedZone;

  public privateZone: route53.HostedZone;

  public records: Array<ARecordArray>;

  constructor(scope: Construct, id: string, props: ISplitHorizonDnsProps) {
    super(scope, id);

    const {
      zoneName,
      includeCertificate,
      certAlternateNames,
      privateZoneVpcs,
      targets,
    } = props;

    this.publicZone = new route53.HostedZone(this, 'PublicZone', {
      zoneName: zoneName,
    });

    if (includeCertificate) {
      new acm.Certificate(this, 'Certificate', {
        domainName: zoneName,
        subjectAlternativeNames: certAlternateNames,
      });
    }

    this.privateZone = new route53.HostedZone(this, 'PrivateZone', {
      zoneName: zoneName,
      vpcs: privateZoneVpcs,
    });

    this.records = targets.reduce((accu: Array<ARecordArray>, curr: AliasTarget) => {
      let target;

      if (isAliasRecordTarget(curr.target)) {
        target = route53.RecordTarget.fromAlias(curr.target);
      } else {
        target = route53.RecordTarget.fromValues(...curr.target);
      }

      if (!curr.private && !curr.public) {
        console.error(`Neither public nor private was specified for ${JSON.stringify(curr)}. Omitting...`);
        return accu;
      }

      const records = [] as ARecordArray;
      if (curr.public) {
        const publicARecord = new route53.ARecord(this, `${curr.target.toString()}PublicARecord`, {
          zone: this.publicZone,
          target: target,
          ttl: curr.ttl,
        });
        records.push(publicARecord);
      }

      if (curr.private) {
        const privateARecord = new route53.ARecord(this, `${curr.target.toString()}PrivateARecord`, {
          zone: this.privateZone,
          target: target,
        });
        records.push(privateARecord);
      }
      accu.push(records);
      return accu;
    }, [] as Array<ARecordArray>);
  }
}
