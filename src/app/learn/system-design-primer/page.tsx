"use client";

import Link from "next/link";
import { useState } from "react";

const languageTabs = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "SQL",
  "Bash",
] as const;

type Language = (typeof languageTabs)[number];

const codeMap: Record<Language, string> = {
  TypeScript: `type Request = {
  userId: string;
  key: string;
  value: string;
};

class Cache {
  private store = new Map<string, string>();

  get(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }
}

class Database {
  private store = new Map<string, string>();

  read(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  write(key: string, value: string): void {
    this.store.set(key, value);
  }
}

function readThrough(cache: Cache, db: Database, key: string): string | null {
  const cached = cache.get(key);
  if (cached !== null) return cached;

  const value = db.read(key);
  if (value !== null) cache.set(key, value);
  return value;
}`,

  JavaScript: `class Cache {
  constructor() {
    this.store = new Map();
  }

  get(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  set(key, value) {
    this.store.set(key, value);
  }
}

class Database {
  constructor() {
    this.store = new Map();
  }

  read(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  write(key, value) {
    this.store.set(key, value);
  }
}

function readThrough(cache, db, key) {
  const cached = cache.get(key);
  if (cached !== null) return cached;

  const value = db.read(key);
  if (value !== null) cache.set(key, value);
  return value;
}`,

  Python: `class Cache:
    def __init__(self):
        self.store = {}

    def get(self, key):
        return self.store.get(key)

    def set(self, key, value):
        self.store[key] = value


class Database:
    def __init__(self):
        self.store = {}

    def read(self, key):
        return self.store.get(key)

    def write(self, key, value):
        self.store[key] = value


def read_through(cache, db, key):
    cached = cache.get(key)
    if cached is not None:
        return cached

    value = db.read(key)
    if value is not None:
        cache.set(key, value)
    return value`,

  Java: `import java.util.HashMap;
import java.util.Map;

class Cache {
    private Map<String, String> store = new HashMap<>();

    public String get(String key) {
        return store.get(key);
    }

    public void set(String key, String value) {
        store.put(key, value);
    }
}

class Database {
    private Map<String, String> store = new HashMap<>();

    public String read(String key) {
        return store.get(key);
    }

    public void write(String key, String value) {
        store.put(key, value);
    }
}

class Main {
    public static String readThrough(Cache cache, Database db, String key) {
        String cached = cache.get(key);
        if (cached != null) return cached;

        String value = db.read(key);
        if (value != null) cache.set(key, value);
        return value;
    }
}`,

  Go: `package main

type Cache struct {
	store map[string]string
}

func NewCache() *Cache {
	return &Cache{store: map[string]string{}}
}

func (c *Cache) Get(key string) (string, bool) {
	v, ok := c.store[key]
	return v, ok
}

func (c *Cache) Set(key, value string) {
	c.store[key] = value
}

type Database struct {
	store map[string]string
}

func NewDatabase() *Database {
	return &Database{store: map[string]string{}}
}

func (d *Database) Read(key string) (string, bool) {
	v, ok := d.store[key]
	return v, ok
}

func (d *Database) Write(key, value string) {
	d.store[key] = value
}

func ReadThrough(cache *Cache, db *Database, key string) (string, bool) {
	if v, ok := cache.Get(key); ok {
		return v, true
	}

	v, ok := db.Read(key)
	if ok {
		cache.Set(key, v)
	}
	return v, ok
}`,

  Rust: `use std::collections::HashMap;

struct Cache {
    store: HashMap<String, String>,
}

impl Cache {
    fn new() -> Self {
        Self { store: HashMap::new() }
    }

    fn get(&self, key: &str) -> Option<String> {
        self.store.get(key).cloned()
    }

    fn set(&mut self, key: &str, value: &str) {
        self.store.insert(key.to_string(), value.to_string());
    }
}

struct Database {
    store: HashMap<String, String>,
}

impl Database {
    fn new() -> Self {
        Self { store: HashMap::new() }
    }

    fn read(&self, key: &str) -> Option<String> {
        self.store.get(key).cloned()
    }

    fn write(&mut self, key: &str, value: &str) {
        self.store.insert(key.to_string(), value.to_string());
    }
}

fn read_through(cache: &mut Cache, db: &Database, key: &str) -> Option<String> {
    if let Some(v) = cache.get(key) {
        return Some(v);
    }

    if let Some(v) = db.read(key) {
        cache.set(key, &v);
        return Some(v);
    }

    None
}`,

  SQL: `-- Example: sharded users table by region
CREATE TABLE users_us (
  user_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE users_eu (
  user_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE jobs (
  job_id BIGSERIAL PRIMARY KEY,
  status TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE feed_cache (
  user_id BIGINT PRIMARY KEY,
  feed_json JSONB NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`,

  Bash: `#!/usr/bin/env bash

KEY="$1"

if redis-cli GET "$KEY" >/dev/null 2>&1; then
  VALUE=$(redis-cli GET "$KEY")
  echo "CACHE_HIT: $VALUE"
  exit 0
fi

VALUE=$(psql -Atqc "SELECT value FROM kv_store WHERE key = '$KEY' LIMIT 1;")

if [ -n "$VALUE" ]; then
  redis-cli SET "$KEY" "$VALUE" >/dev/null
  echo "DB_HIT_AND_CACHED: $VALUE"
else
  echo "MISS"
fi`,
};

function SectionTitle({
  idx,
  title,
  id,
}: {
  idx: string;
  title: string;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-2">
      <div className="text-[11px] uppercase tracking-[0.38em] text-muted-foreground">
        {idx} // section
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>
    </section>
  );
}

function TerminalCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-border bg-card/40 p-5 md:p-6 ${className}`}>
      <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-4 text-sm leading-8 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function SummaryMetric({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border border-border bg-background/60 px-5 py-5">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-3 text-4xl font-extrabold text-primary">{value}</div>
      {sub ? <div className="mt-2 text-sm text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

export default function SystemDesignPrimerPage() {
  const [activeLang, setActiveLang] = useState<Language>("TypeScript");

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container max-w-[1680px] h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/system-design-primer" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 md:px-6 py-8 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-24 h-fit border border-border bg-card/40 p-5 md:p-6">
            <div className="text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
              ./table_of_contents
            </div>

            <div className="mt-6 space-y-5 text-sm">
              {[
                "01 Root Problem",
                "02 Core Idea",
                "03 Request Flow",
                "04 Caching",
                "05 Queues & Sharding",
                "06 Consistency",
                "07 Code Implementation",
                "08 Time Complexity",
                "09 Practice Checklist",
              ].map((item) => (
                <div key={item} className="text-foreground">
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/visualize/system-design-primer"
              className="mt-8 inline-flex w-full items-center justify-center border-2 border-primary bg-primary px-4 py-3 text-sm font-bold tracking-[0.22em] text-black hover:opacity-90"
            >
              ▶ OPEN_VISUALIZER
            </Link>
          </aside>

          <section className="min-w-0 space-y-10">
            <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
              learn // system_design_primer — module 12
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-extrabold leading-[0.95]">
                System Design Primer
                <br />
                <span className="text-primary text-glow">Lesson.</span>
              </h1>

              <p className="max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
                System design is about shaping large systems so they remain fast, reliable,
                scalable, and understandable under real traffic. This primer focuses on the
                core patterns that repeatedly show up in good designs: request flow, caches,
                queues, sharding, and consistency trade-offs.
              </p>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="01" title="Root Problem" id="root-problem" />
              <TerminalCard title="Problem framing">
                <p>
                  A single server with a single database works at small scale. As traffic grows,
                  latency rises, failures hurt more, and one machine becomes a bottleneck.
                </p>
                <div className="border border-border bg-background/60 p-5">
                  <div className="font-semibold text-foreground">Main question</div>
                  <p className="mt-2">
                    How do we serve more users, keep latency low, and survive failures without
                    making the system impossible to operate?
                  </p>
                </div>
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="02" title="Core Idea" id="core-idea" />
              <div className="grid gap-4 md:grid-cols-3">
                <TerminalCard title="Scale reads">
                  Put frequently requested data closer to users with caches and replicas.
                </TerminalCard>
                <TerminalCard title="Smooth writes">
                  Use queues and background processing so traffic spikes do not crush the request path.
                </TerminalCard>
                <TerminalCard title="Split load">
                  Partition traffic and data across machines using sharding and service boundaries.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="03" title="Request Flow" id="request-flow" />
              <TerminalCard title="Canonical request path">
                <div className="border border-border bg-background/60 p-5 font-mono text-sm md:text-base leading-8 text-foreground">
                  Client
                  <br />↓
                  <br />Load Balancer
                  <br />↓
                  <br />API / App Server
                  <br />↓
                  <br />Cache → Database
                  <br />↓
                  <br />Queue / Workers (optional background tasks)
                </div>
                <p>
                  Most production systems are just layered versions of this pipeline. Once you know
                  where caching, persistence, and async work fit, system design becomes far easier to reason about.
                </p>
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="04" title="Caching" id="caching" />
              <div className="grid gap-4 md:grid-cols-2">
                <TerminalCard title="Why cache">
                  <p>Cache reduces repeated expensive reads.</p>
                  <p>It improves latency and lowers database pressure.</p>
                  <p>It works best when read frequency is high and slight staleness is acceptable.</p>
                </TerminalCard>

                <TerminalCard title="Common patterns">
                  <p>Read-through: check cache first, then DB, then fill cache.</p>
                  <p>Write-through: update cache and DB together.</p>
                  <p>Write-back: delay DB persistence for performance, but accept more complexity.</p>
                  <p>TTL expiration: useful when perfect freshness is not required.</p>
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="05" title="Queues & Sharding" id="queues-sharding" />
              <div className="grid gap-4 md:grid-cols-2">
                <TerminalCard title="Queues">
                  <p>
                    Queues absorb spikes. Instead of doing all work inline during the request,
                    we store jobs and let workers process them later.
                  </p>
                  <div className="border border-border bg-background/60 p-5">
                    <div className="font-semibold text-foreground">Examples</div>
                    <p className="mt-2">Email sending</p>
                    <p>Image processing</p>
                    <p>Analytics ingestion</p>
                    <p>Retryable background jobs</p>
                  </div>
                </TerminalCard>

                <TerminalCard title="Sharding">
                  <p>
                    Sharding splits data across machines so one database is not responsible for every row.
                  </p>
                  <div className="border border-border bg-background/60 p-5">
                    <div className="font-semibold text-foreground">Shard key examples</div>
                    <p className="mt-2">user_id range</p>
                    <p>region</p>
                    <p>tenant / organization id</p>
                    <p>hash(user_id)</p>
                  </div>
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="06" title="Consistency" id="consistency" />

              <div className="border border-border bg-card/40 p-5 md:p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <SummaryMetric
                    title="Strong consistency"
                    value="fresh reads"
                    sub="Higher coordination cost, easier correctness reasoning"
                  />
                  <SummaryMetric
                    title="Eventual consistency"
                    value="fast + scalable"
                    sub="Temporary staleness allowed, simpler global scaling"
                  />
                </div>

                <TerminalCard title="Trade-off">
                  <p>
                    Strong consistency means every read sees the latest committed write.
                    Eventual consistency allows replicas or caches to lag temporarily.
                  </p>
                  <p>
                    System design is often about choosing where exact freshness is required
                    and where slight staleness is acceptable for better scale and lower latency.
                  </p>
                </TerminalCard>

                <div className="grid gap-4 md:grid-cols-2">
                  <TerminalCard title="Use strong consistency when">
                    <p>Bank balances</p>
                    <p>Critical account state</p>
                    <p>Payments / inventory correctness</p>
                    <p>Security-sensitive updates</p>
                  </TerminalCard>

                  <TerminalCard title="Use eventual consistency when">
                    <p>Social feeds</p>
                    <p>Notifications</p>
                    <p>Analytics dashboards</p>
                    <p>Cached content / denormalized views</p>
                  </TerminalCard>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="07" title="Code Implementation" id="code-implementation" />

              <div className="overflow-x-auto">
                <div className="flex gap-3 min-w-max pb-3">
                  {languageTabs.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`border px-6 py-4 text-sm font-bold tracking-[0.14em] transition-colors ${
                        lang === activeLang
                          ? "border-primary bg-primary text-black"
                          : "border-border bg-background/50 text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card/40 p-5 md:p-6">
                <div className="text-2xl font-bold text-primary">{activeLang}</div>
                <pre className="mt-4 overflow-x-auto border border-border bg-background/60 p-5 md:p-6 text-sm leading-8 text-foreground whitespace-pre-wrap">
{codeMap[activeLang]}
                </pre>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="08" title="Time Complexity" id="time-complexity" />

              <div className="border border-border bg-card/40 p-5 md:p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <SummaryMetric
                    title="Read path"
                    value="~ O(1)"
                    sub="cache lookup is usually constant-time on average"
                  />
                  <SummaryMetric
                    title="Write / queue path"
                    value="~ O(1)"
                    sub="enqueue and key-based writes are usually constant-time on average"
                  />
                </div>

                <TerminalCard title="Why system design uses latency + throughput more than raw Big-O">
                  <p>
                    In system design, Big-O still matters, but practical performance is usually
                    discussed in terms of latency, throughput, replication lag, lock contention,
                    disk cost, and network hops.
                  </p>
                  <p>
                    Two operations can both be O(1) on paper, while one is still much slower in reality
                    because it crosses the network, hits disk, or blocks on a shared resource.
                  </p>
                </TerminalCard>

                <div className="grid gap-4 md:grid-cols-2">
                  <TerminalCard title="Cache read complexity">
                    <p>Average cache lookup by key is usually O(1).</p>
                    <p>Example: Redis GET(user:123).</p>
                    <p>Real latency still depends on:</p>
                    <p>• network round-trip</p>
                    <p>• serialization / deserialization</p>
                    <p>• cache miss rate</p>
                    <p>• eviction pressure</p>
                  </TerminalCard>

                  <TerminalCard title="Database read complexity">
                    <p>
                      A primary-key lookup is often described as near O(log n) or simply “fast”
                      depending on the indexing structure and storage engine.
                    </p>
                    <p>The more important interview question is usually:</p>
                    <p>Can the database survive the traffic volume?</p>
                    <p>Can reads be reduced using caches or replicas?</p>
                  </TerminalCard>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TerminalCard title="Queue complexity">
                    <p>Enqueue is usually O(1) on average.</p>
                    <p>Dequeue is usually O(1) on average.</p>
                    <p>The real design value of a queue is:</p>
                    <p>• smoothing spikes</p>
                    <p>• decoupling services</p>
                    <p>• enabling retries</p>
                    <p>• moving expensive work off the critical path</p>
                  </TerminalCard>

                  <TerminalCard title="Sharding complexity">
                    <p>
                      Routing to a shard is usually O(1) or O(log k), depending on whether
                      you use direct hashing, metadata lookups, or routing tables.
                    </p>
                    <p>The hard part is not the lookup itself.</p>
                    <p>
                      The hard part is resharding, hotspot mitigation, uneven key distribution,
                      and cross-shard queries.
                    </p>
                  </TerminalCard>
                </div>

                <TerminalCard title="Mental model">
                  <div className="border border-border bg-background/60 p-5">
                    <div className="space-y-2">
                      <p><span className="font-semibold text-foreground">Cache:</span> usually O(1), mainly for lower latency</p>
                      <p><span className="font-semibold text-foreground">DB indexed lookup:</span> fast, but can bottleneck under load</p>
                      <p><span className="font-semibold text-foreground">Queue:</span> usually O(1), mainly for traffic smoothing</p>
                      <p><span className="font-semibold text-foreground">Shard routing:</span> cheap lookup, but operationally complex</p>
                    </div>
                  </div>
                  <p>So in system design, think:</p>
                  <p>algorithmic cost + network cost + storage cost + concurrency cost + failure cost</p>
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="09" title="Practice Checklist" id="practice-checklist" />
              <TerminalCard title="What to ask in interviews">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Scale</div>
                    <div>How many users, QPS, reads vs writes, data size?</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Latency</div>
                    <div>What response time targets matter most?</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Availability</div>
                    <div>What happens during failure? Single region or multi-region?</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Consistency</div>
                    <div>Where must data be exact? Where can it be eventually consistent?</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Storage</div>
                    <div>SQL, NoSQL, blob storage, search index?</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Async work</div>
                    <div>Which operations belong in background workers?</div>
                  </div>
                </div>
              </TerminalCard>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
