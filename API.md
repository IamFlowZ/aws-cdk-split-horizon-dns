# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SplitHorizonDns <a name="SplitHorizonDns" id="aws-cdk-split-horizon-dns.SplitHorizonDns"></a>

Creates a public and private zone for a given domain name, and creates A records for the given targets.

#### Initializers <a name="Initializers" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer"></a>

```typescript
import { SplitHorizonDns } from 'aws-cdk-split-horizon-dns'

new SplitHorizonDns(scope: Construct, id: string, props: ISplitHorizonDnsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.props">props</a></code> | <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps">ISplitHorizonDnsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps">ISplitHorizonDnsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="aws-cdk-split-horizon-dns.SplitHorizonDns.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="aws-cdk-split-horizon-dns.SplitHorizonDns.isConstruct"></a>

```typescript
import { SplitHorizonDns } from 'aws-cdk-split-horizon-dns'

SplitHorizonDns.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="aws-cdk-split-horizon-dns.SplitHorizonDns.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.publicZone">publicZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.records">records</a></code> | <code>aws-cdk-lib.aws_route53.ARecord[][]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.privateZone">privateZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `publicZone`<sup>Required</sup> <a name="publicZone" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.publicZone"></a>

```typescript
public readonly publicZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `records`<sup>Required</sup> <a name="records" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.records"></a>

```typescript
public readonly records: ARecord[][];
```

- *Type:* aws-cdk-lib.aws_route53.ARecord[][]

---

##### `privateZone`<sup>Optional</sup> <a name="privateZone" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.privateZone"></a>

```typescript
public readonly privateZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---


## Structs <a name="Structs" id="Structs"></a>

### AliasTarget <a name="AliasTarget" id="aws-cdk-split-horizon-dns.AliasTarget"></a>

#### Initializer <a name="Initializer" id="aws-cdk-split-horizon-dns.AliasTarget.Initializer"></a>

```typescript
import { AliasTarget } from 'aws-cdk-split-horizon-dns'

const aliasTarget: AliasTarget = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.AliasTarget.property.target">target</a></code> | <code>aws-cdk-lib.aws_route53.IAliasRecordTarget \| string[]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.AliasTarget.property.private">private</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.AliasTarget.property.public">public</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.AliasTarget.property.ttl">ttl</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `target`<sup>Required</sup> <a name="target" id="aws-cdk-split-horizon-dns.AliasTarget.property.target"></a>

```typescript
public readonly target: IAliasRecordTarget | string[];
```

- *Type:* aws-cdk-lib.aws_route53.IAliasRecordTarget | string[]

---

##### `private`<sup>Optional</sup> <a name="private" id="aws-cdk-split-horizon-dns.AliasTarget.property.private"></a>

```typescript
public readonly private: boolean;
```

- *Type:* boolean

---

##### `public`<sup>Optional</sup> <a name="public" id="aws-cdk-split-horizon-dns.AliasTarget.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

##### `ttl`<sup>Optional</sup> <a name="ttl" id="aws-cdk-split-horizon-dns.AliasTarget.property.ttl"></a>

```typescript
public readonly ttl: Duration;
```

- *Type:* aws-cdk-lib.Duration

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ISplitHorizonDnsProps <a name="ISplitHorizonDnsProps" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps"></a>

- *Implemented By:* <a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps">ISplitHorizonDnsProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.targets">targets</a></code> | <code><a href="#aws-cdk-split-horizon-dns.AliasTarget">AliasTarget</a>[]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.zoneName">zoneName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.certAlternateNames">certAlternateNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.disallowPrivateZone">disallowPrivateZone</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.existingPrivateZone">existingPrivateZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.existingPublicZone">existingPublicZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.includeCertificate">includeCertificate</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.privateZoneVpcs">privateZoneVpcs</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc[]</code> | *No description.* |

---

##### `targets`<sup>Required</sup> <a name="targets" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.targets"></a>

```typescript
public readonly targets: AliasTarget[];
```

- *Type:* <a href="#aws-cdk-split-horizon-dns.AliasTarget">AliasTarget</a>[]

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

---

##### `certAlternateNames`<sup>Optional</sup> <a name="certAlternateNames" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.certAlternateNames"></a>

```typescript
public readonly certAlternateNames: string[];
```

- *Type:* string[]

---

##### `disallowPrivateZone`<sup>Optional</sup> <a name="disallowPrivateZone" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.disallowPrivateZone"></a>

```typescript
public readonly disallowPrivateZone: boolean;
```

- *Type:* boolean

---

##### `existingPrivateZone`<sup>Optional</sup> <a name="existingPrivateZone" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.existingPrivateZone"></a>

```typescript
public readonly existingPrivateZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `existingPublicZone`<sup>Optional</sup> <a name="existingPublicZone" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.existingPublicZone"></a>

```typescript
public readonly existingPublicZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `includeCertificate`<sup>Optional</sup> <a name="includeCertificate" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.includeCertificate"></a>

```typescript
public readonly includeCertificate: boolean;
```

- *Type:* boolean

---

##### `privateZoneVpcs`<sup>Optional</sup> <a name="privateZoneVpcs" id="aws-cdk-split-horizon-dns.ISplitHorizonDnsProps.property.privateZoneVpcs"></a>

```typescript
public readonly privateZoneVpcs: Vpc[];
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc[]

---

