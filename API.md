# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SplitHorizonDns <a name="SplitHorizonDns" id="aws-cdk-split-horizon-dns.SplitHorizonDns"></a>

#### Initializers <a name="Initializers" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer"></a>

```typescript
import { SplitHorizonDns } from 'aws-cdk-split-horizon-dns'

new SplitHorizonDns(scope: Construct, id: string, props: SplitHorizonDnsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.props">props</a></code> | <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps">SplitHorizonDnsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-cdk-split-horizon-dns.SplitHorizonDns.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps">SplitHorizonDnsProps</a>

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
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.privateZone">privateZone</a></code> | <code>aws-cdk-lib.aws_route53.HostedZone</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDns.property.publicZone">publicZone</a></code> | <code>aws-cdk-lib.aws_route53.HostedZone</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `privateZone`<sup>Required</sup> <a name="privateZone" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.privateZone"></a>

```typescript
public readonly privateZone: HostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.HostedZone

---

##### `publicZone`<sup>Required</sup> <a name="publicZone" id="aws-cdk-split-horizon-dns.SplitHorizonDns.property.publicZone"></a>

```typescript
public readonly publicZone: HostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.HostedZone

---


## Structs <a name="Structs" id="Structs"></a>

### SplitHorizonDnsProps <a name="SplitHorizonDnsProps" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps"></a>

#### Initializer <a name="Initializer" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps.Initializer"></a>

```typescript
import { SplitHorizonDnsProps } from 'aws-cdk-split-horizon-dns'

const splitHorizonDnsProps: SplitHorizonDnsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.privateZoneVpcs">privateZoneVpcs</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc[]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.zoneName">zoneName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.certAlternateNames">certAlternateNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.includeCertificate">includeCertificate</a></code> | <code>boolean</code> | *No description.* |

---

##### `privateZoneVpcs`<sup>Required</sup> <a name="privateZoneVpcs" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.privateZoneVpcs"></a>

```typescript
public readonly privateZoneVpcs: Vpc[];
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc[]

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

---

##### `certAlternateNames`<sup>Optional</sup> <a name="certAlternateNames" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.certAlternateNames"></a>

```typescript
public readonly certAlternateNames: string[];
```

- *Type:* string[]

---

##### `includeCertificate`<sup>Optional</sup> <a name="includeCertificate" id="aws-cdk-split-horizon-dns.SplitHorizonDnsProps.property.includeCertificate"></a>

```typescript
public readonly includeCertificate: boolean;
```

- *Type:* boolean

---



