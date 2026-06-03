#!/usr/bin/env node
/**
 * Regenerates words.js with >= 500 unique words per category.
 * Run: node build-words.js
 */
const fs = require('fs');
const path = require('path');

const MIN = 500;
const MIN_LEN = 3;
const MAX_LEN = 22;

function clean(words) {
  const seen = new Set();
  const out = [];
  for (const raw of words) {
    const w = String(raw).toLowerCase().trim().replace(/\s+/g, '');
    if (!/^[a-z]+$/.test(w) || w.length < MIN_LEN || w.length > MAX_LEN) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }
  return out;
}

function pad(pool, extras) {
  const set = new Set(pool);
  for (const w of extras) {
    if (set.size >= MIN) break;
    const word = String(w).toLowerCase().replace(/\s+/g, '');
    if (/^[a-z]+$/.test(word) && word.length >= MIN_LEN && word.length <= MAX_LEN) {
      set.add(word);
    }
  }
  return [...set];
}

const src = fs.readFileSync(path.join(__dirname, 'words.js'), 'utf8');
const window = {};
eval(src);

let nouns = clean(window.HOSTNAME_WORDS.nouns);
let animals = clean(window.HOSTNAME_WORDS.animals);
let mythology = clean(window.HOSTNAME_WORDS.mythology);
let tech = clean(window.HOSTNAME_WORDS.tech);

const nounExtras = fs.readFileSync(path.join(__dirname, 'data/nouns-extra.txt'), 'utf8').split(/\s+/);
const animalExtras = fs.readFileSync(path.join(__dirname, 'data/animals-extra.txt'), 'utf8').split(/\s+/);
const mythExtras = fs.readFileSync(path.join(__dirname, 'data/mythology-extra.txt'), 'utf8').split(/\s+/);
const techExtras = fs.readFileSync(path.join(__dirname, 'data/tech-extra.txt'), 'utf8').split(/\s+/);

// Generated tech compounds (single tokens)
const techPrefixes = [
  'auto', 'micro', 'meta', 'cyber', 'net', 'web', 'cloud', 'data', 'code', 'dev', 'ops', 'api', 'app', 'sys',
  'edge', 'core', 'open', 'hyper', 'multi', 'nano', 'proto', 'infra', 'virtual', 'secure', 'async', 'sync',
  'stream', 'batch', 'event', 'metric', 'logic', 'signal', 'binary', 'neural', 'robot', 'smart', 'deep',
  'fast', 'safe', 'raw', 'flat', 'mono', 'poly', 'cross', 'inter', 'intra', 'extra', 'ultra', 'mega', 'giga'
];
const techSuffixes = [
  'hub', 'box', 'kit', 'lab', 'core', 'sync', 'flow', 'path', 'port', 'link', 'node', 'stack', 'base', 'cast',
  'mesh', 'grid', 'lane', 'zone', 'vault', 'scout', 'watch', 'ping', 'scan', 'probe', 'trace', 'guard', 'shield',
  'pipe', 'bus', 'gate', 'lock', 'loop', 'pool', 'heap', 'cache', 'queue', 'shard', 'relay', 'broker', 'agent',
  'daemon', 'worker', 'runner', 'builder', 'loader', 'parser', 'mapper', 'filter', 'router', 'switch', 'bridge',
  'tunnel', 'proxy', 'socket', 'packet', 'frame', 'block', 'chunk', 'blob', 'object', 'record', 'stream',
  'channel', 'topic', 'alert', 'span', 'label', 'tag', 'token', 'key', 'cert', 'auth', 'session', 'tenant',
  'policy', 'rule', 'scope', 'claim', 'audit', 'log', 'debug', 'profile', 'config', 'flag', 'toggle', 'panel',
  'view', 'page', 'form', 'field', 'input', 'output', 'source', 'sink', 'target', 'task', 'job', 'cron', 'timer',
  'schedule', 'plan', 'stage', 'phase', 'step', 'state', 'status', 'health', 'check', 'test', 'mock', 'stub',
  'sandbox', 'fixture', 'sample', 'seed', 'model', 'schema', 'table', 'index', 'query', 'cursor', 'txn',
  'commit', 'rollback', 'migrate', 'deploy', 'release', 'build', 'compile', 'bundle', 'pack', 'image', 'layer',
  'volume', 'mount', 'disk', 'drive', 'file', 'folder', 'hash', 'sign', 'verify', 'encrypt', 'decrypt', 'encode',
  'decode', 'compress', 'archive', 'backup', 'restore', 'replica', 'mirror', 'clone', 'fork', 'branch', 'merge',
  'diff', 'patch', 'version', 'tag', 'repo', 'remote', 'client', 'server', 'host', 'peer', 'cluster', 'fleet',
  'swarm', 'farm', 'rack', 'cell', 'pod', 'unit', 'module', 'plugin', 'addon', 'widget', 'tool', 'util',
  'helper', 'service', 'rpc', 'rest', 'grpc', 'http', 'tcp', 'udp', 'dns', 'tls', 'ssl', 'vpn', 'nat', 'vlan',
  'subnet', 'nic', 'bond', 'route', 'chain', 'set', 'map', 'list', 'tree', 'graph', 'edge', 'vertex', 'point',
  'vector', 'matrix', 'tensor', 'array', 'slice', 'buffer', 'byte', 'bit', 'word', 'char', 'string', 'text',
  'json', 'yaml', 'xml', 'csv', 'html', 'css', 'sql', 'dsl', 'lang', 'runtime', 'engine', 'vm', 'jit', 'gc',
  'alloc', 'stack', 'frame', 'register', 'opcode', 'thread', 'proc', 'fiber', 'coro', 'await', 'future',
  'promise', 'callback', 'handler', 'listener', 'observer', 'publisher', 'subscriber', 'producer', 'consumer',
  'reader', 'writer', 'encoder', 'decoder', 'codec', 'format', 'lexer', 'linker', 'binder', 'resolver',
  'injector', 'factory', 'provider', 'registry', 'catalog', 'store', 'memo', 'search', 'find', 'match', 'rank',
  'score', 'sort', 'group', 'reduce', 'fold', 'scan', 'zip', 'join', 'split', 'union', 'limit', 'offset',
  'page', 'order', 'having', 'where', 'select', 'insert', 'update', 'delete', 'upsert', 'replace', 'truncate',
  'vacuum', 'analyze', 'explain', 'plan', 'cost', 'stats', 'histogram', 'counter', 'gauge', 'meter', 'logger',
  'tracer', 'profiler', 'debugger', 'monitor', 'watcher', 'sensor', 'collector', 'exporter', 'importer',
  'forwarder', 'aggregator', 'normalizer', 'enricher', 'dispatcher', 'scheduler', 'executor', 'orchestrator',
  'controller', 'operator', 'manager', 'supervisor', 'coordinator', 'leader', 'follower', 'candidate', 'voter',
  'master', 'slave', 'primary', 'secondary', 'standby', 'active', 'passive', 'archive', 'tier', 'class', 'type',
  'kind', 'rank', 'level', 'grade', 'mile', 'epoch', 'era', 'window', 'slot', 'tick', 'beat', 'pulse', 'wave',
  'cycle', 'period', 'interval', 'duration', 'timeout', 'delay', 'latency', 'jitter', 'throughput', 'bandwidth',
  'capacity', 'quota', 'limit', 'budget', 'cap', 'floor', 'ceil', 'min', 'max', 'avg', 'sum', 'count', 'rate',
  'ratio', 'percent', 'share', 'part', 'whole', 'total', 'net', 'gross', 'delta', 'diff', 'gain', 'loss',
  'error', 'fault', 'bug', 'issue', 'ticket', 'case', 'incident', 'alarm', 'warn', 'info', 'trace', 'fatal',
  'panic', 'abort', 'exit', 'kill', 'stop', 'start', 'run', 'pause', 'resume', 'suspend', 'wake', 'sleep',
  'idle', 'busy', 'load', 'stress', 'spike', 'burst', 'flood', 'storm', 'chaos', 'bench', 'mark', 'dump',
  'snap', 'shot', 'copy', 'push', 'pull', 'poll', 'sub', 'pub', 'ack', 'nack', 'retry', 'backoff', 'circuit',
  'breaker', 'bulkhead', 'deadline', 'shed', 'throttle', 'bucket', 'leaky', 'sliding', 'rolling', 'exponential',
  'linear', 'random', 'ring', 'jump', 'consistent', 'partition', 'rebalance', 'failover', 'failback', 'recover',
  'heal', 'repair', 'fix', 'hotfix', 'rollout', 'canary', 'feature', 'gate', 'perm', 'acl', 'rbac', 'abac',
  'oauth', 'oidc', 'saml', 'jwt', 'jwe', 'jws', 'hmac', 'rsa', 'ecdsa', 'eddsa', 'aes', 'sha', 'md5', 'bcrypt',
  'argon', 'scrypt', 'pbkdf', 'hkdf', 'kdf', 'rng', 'entropy', 'salt', 'nonce', 'iv', 'mac', 'sig', 'ca', 'csr',
  'crl', 'ocsp', 'pin', 'trust', 'chain', 'root', 'leaf', 'mtls', 'https', 'http2', 'http3', 'quic', 'soap',
  'graphql', 'odata', 'jsonrpc', 'xmlrpc', 'sse', 'ws', 'mqtt', 'amqp', 'kafka', 'pulsar', 'nats', 'redis',
  'memcached', 'etcd', 'consul', 'zookeeper', 'eureka', 'discovery', 'metadata', 'secret', 'kms', 'hsm', 'tee',
  'enclave', 'isolate', 'namespace', 'cgroup', 'container', 'docker', 'podman', 'cri', 'oci', 'buildkit', 'kaniko',
  'helm', 'chart', 'values', 'template', 'kustomize', 'crd', 'webhook', 'admission', 'kubelet', 'coredns',
  'ingress', 'backend', 'sidecar', 'init', 'main', 'cronjob', 'daemonset', 'statefulset', 'deployment',
  'replicaset', 'autoscaler', 'hpa', 'vpa', 'pdb', 'cni', 'csi', 'apiserver', 'scheduler', 'provisioner',
  'attacher', 'resizer', 'snapshotter', 'liveness', 'readiness', 'startup', 'exporter', 'adapter', 'converter',
  'translator', 'reducer', 'ingest', 'elastic', 'solr', 'lucene', 'influx', 'prometheus', 'grafana', 'tempo',
  'loki', 'jaeger', 'zipkin', 'otel', 'baggage', 'context', 'propagation', 'sampler', 'receiver', 'processor',
  'extension', 'pipeline', 'connector', 'fanout', 'fanin', 'transform', 'enrich', 'redact', 'mask', 'tokenize',
  'detokenize', 'sanitize', 'normalize', 'canonicalize', 'escape', 'unescape', 'serialize', 'deserialize',
  'marshal', 'unmarshal', 'append', 'truncate', 'seek', 'flush', 'chmod', 'chown', 'stat', 'notify', 'epoll',
  'kqueue', 'uring', 'mmap', 'shm', 'sem', 'mutex', 'rwlock', 'spinlock', 'cond', 'barrier', 'latch', 'semaphore',
  'deque', 'arena', 'slab', 'buddy', 'malloc', 'free', 'sweep', 'compact', 'ref', 'arc', 'pin', 'cell', 'atomic',
  'fence', 'seq', 'cst', 'acq', 'rel', 'unlock', 'wait', 'park', 'unpark', 'yield', 'spin', 'cas', 'faa', 'tla',
  'hazard', 'epoch', 'rcu', 'percpu', 'numa', 'cacheline', 'prefetch', 'align', 'pack', 'struct', 'union', 'enum',
  'trait', 'impl', 'macro', 'proc', 'derive', 'lint', 'fmt', 'clippy', 'cargo', 'crate', 'workspace', 'monorepo',
  'polyrepo', 'semver', 'vendor', 'fork', 'star', 'watch', 'issue', 'workflow', 'action', 'runner', 'artifact',
  'matrix', 'parallel', 'serial', 'dispatch', 'approve', 'envvar', 'param', 'summary', 'badge', 'suite', 'unit',
  'integration', 'e2e', 'smoke', 'soak', 'fuzz', 'property', 'mutation', 'coverage', 'sast', 'dast', 'sca', 'sbom',
  'attest', 'provenance', 'slsa', 'supplychain', 'trustroot', 'keyrotate', 'keyrevoke', 'keyrenew', 'keyissue',
  'certbundle', 'certpolicy', 'opa', 'rego', 'wasm', 'wasmedge', 'wasmer', 'wasmtime', 'wasi', 'component',
  'instance', 'memory', 'global', 'func', 'import', 'export', 'start', 'init', 'hook', 'trap', 'guest', 'capability',
  'permission', 'grant', 'deny', 'disasm', 'legalize', 'select', 'rewrite', 'pattern', 'rule', 'pass', 'backendend'
];
const techGenerated = [];
for (const p of techPrefixes) {
  for (const s of techSuffixes) {
    const w = p + s;
    if (w.length <= MAX_LEN) techGenerated.push(w);
  }
}

nouns = pad(nouns, nounExtras);
animals = pad(animals, animalExtras);
mythology = pad(mythology, mythExtras);
tech = pad(tech, [...techExtras, ...techGenerated]);

const counts = { nouns: nouns.length, animals: animals.length, mythology: mythology.length, tech: tech.length };
for (const [k, n] of Object.entries(counts)) {
  if (n < MIN) {
    console.error(`Category "${k}" has only ${n} words (need ${MIN})`);
    process.exit(1);
  }
}

const formatPool = (arr) => {
  const lines = [];
  for (let i = 0; i < arr.length; i += 10) {
    lines.push('    ' + arr.slice(i, i + 10).map(w => `'${w}'`).join(', '));
  }
  return '[\n' + lines.join(',\n') + '\n  ]';
};

const out = `// Hostname word pools (loaded by index.html) — ${MIN}+ unique words per category
// Regenerate: node build-words.js
window.HOSTNAME_WORDS = {
  nouns: ${formatPool(nouns)},
  animals: ${formatPool(animals)},
  mythology: ${formatPool(mythology)},
  tech: ${formatPool(tech)}
};
`;

fs.writeFileSync(path.join(__dirname, 'words.js'), out);
const mixed = new Set([...nouns, ...animals, ...mythology, ...tech]);
console.log('words.js written:', { ...counts, mixed: mixed.size });
