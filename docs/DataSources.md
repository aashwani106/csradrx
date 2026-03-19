# CSRadrX

## DataSources.md (Detailed Specification)

---

## 1. Overview

CSRadrX ingests data from multiple high-quality sources to detect meaningful signals in the computer science ecosystem.

This document defines:

* exact platforms
* access methods (API / RSS / crawler)
* endpoints / feeds
* polling strategy
* extracted data schema

This is the source-of-truth for the ingestion layer.

---

## 2. Source Categories

1. Research Papers
2. Open Source (GitHub)
3. Package Ecosystems
4. Engineering Blogs
5. Framework / Language Updates
6. Developer Communities
7. Security Feeds
8. Conferences
9. Tech News (low priority)

---

## 3. Research Papers

### 3.1 arXiv (Primary Source)

Access: API

Endpoint:

`http://export.arxiv.org/api/query?search_query=cat:cs.*&sortBy=submittedDate&sortOrder=descending`

Extract:

* id
* title
* authors
* abstract
* published_date
* categories
* pdf_url

Poll:

* every 60 minutes

---

### 3.2 Semantic Scholar

Access: API

Endpoint:

`https://api.semanticscholar.org/graph/v1/paper/search`

Extract:

* title
* authors
* year
* citation_count
* fields_of_study
* url

### 3.3 OpenAlex

Access: API

Endpoint:

`https://api.openalex.org/works?filter=concepts.id:computer-science`

Extract:

* title
* authors
* concepts
* publication_year
* citations

---

## 4. Open Source (Core Signal)

### 4.1 GitHub (Most Important)

Access: API

Endpoints:

Trending repositories (custom logic)

`https://api.github.com/search/repositories?q=created:>YYYY-MM-DD&sort=stars`

Releases

`https://api.github.com/repos/{owner}/{repo}/releases`

Repo metadata

`https://api.github.com/repos/{owner}/{repo}`

Extract:

* repo_name
* owner
* description
* stars
* forks
* language
* release_version
* release_notes
* created_at
* updated_at

Poll:

* every 10 minutes

---

## 5. Package Ecosystems

### 5.1 npm

Access: API

`https://registry.npmjs.org/-/v1/search?text=react&size=20`

Extract:

* package_name
* version
* downloads
* description
* keywords

### 5.2 PyPI

`https://pypi.org/rss/packages.xml`

### 5.3 crates.io (Rust)

`https://crates.io/api/v1/crates`

### 5.4 Maven Central

`https://search.maven.org/solrsearch/select?q=*`

Poll:

* every 30 minutes

## 6. Engineering Blogs (HIGH SIGNAL)

Use RSS + scraper.

Sources:

* `https://blog.cloudflare.com/rss/`
* `https://stripe.com/blog/feed.xml`
* `https://netflixtechblog.com/feed`
* `https://eng.uber.com/feed/`
* `https://engineering.fb.com/feed/`
* `https://developers.googleblog.com/rss/`
* `https://devblogs.microsoft.com/feed/`
* `https://aws.amazon.com/blogs/architecture/feed/`

Extract:

* title
* author
* published_date
* content
* tags
* source

Poll:

* every 15 minutes

---

## 7. Framework & Language Updates

Sources:

* `https://react.dev/blog/rss.xml`
* `https://nextjs.org/feed.xml`
* `https://nodejs.org/en/feed/blog.xml`
* `https://blog.rust-lang.org/feed.xml`
* `https://blog.python.org/feeds/posts/default`
* `https://go.dev/blog/feed.atom`
* `https://blog.angular.io/feed`
* `https://blog.vuejs.org/feed.xml`

Extract:

* framework_name
* version
* release_notes
* breaking_changes
* features

---

## 8. Developer Communities

### 8.1 Hacker News

API:

`https://hacker-news.firebaseio.com/v0/topstories.json`

### 8.2 Reddit

* `https://www.reddit.com/r/programming/top.json`
* `https://www.reddit.com/r/webdev/top.json`

### 8.3 Dev.to

`https://dev.to/api/articles`

### 8.4 Stack Overflow

`https://api.stackexchange.com/2.3/questions`

Extract:

* title
* score
* comments
* tags
* url

Poll:

* every 20 minutes

---

## 9. Security Feeds

### 9.1 NVD (National Vulnerability Database)

`https://services.nvd.nist.gov/rest/json/cves/2.0`

### 9.2 MITRE CVE

`https://cveawg.mitre.org/api/cve`

Extract:

* cve_id
* severity
* description
* affected_packages
* published_date

Poll:

* every 60 minutes

---

## 10. Conferences (Crawler)

Examples:

* `https://neurips.cc/`
* `https://icml.cc/`
* `https://www.usenix.org/`
* `https://kccncna2024.sched.com/`

Extract:

* paper_titles
* topics
* authors
* sessions

---

## 11. Tech News (Low Priority)

* `https://techcrunch.com/feed/`
* `https://arstechnica.com/feed/`
* `https://www.theverge.com/rss/index.xml`
* `https://www.wired.com/feed/rss`

---

## 12. Polling Strategy

| Source Type | Frequency |
| --- | --- |
| GitHub | 10 min |
| RSS Blogs | 15 min |
| Communities | 20 min |
| Packages | 30 min |
| Research | 60 min |
| Security | 60 min |

---

## 13. Data Normalization

All sources must be normalized into a common schema:

* id
* title
* content
* source
* category
* published_at
* tags
* url
* raw_data

---

## 14. Deduplication Strategy

Avoid duplicate content using:

* url hashing
* title similarity
* content similarity
* source-based filtering

---

## 15. Priority Scoring Input

Each source contributes to scoring:

* GitHub -> stars, releases
* Research -> citations
* Blogs -> source authority
* Security -> severity
* Communities -> engagement

---

## 16. MVP Source Set (Recommended)

Start with:

* GitHub
* arXiv
* 10 engineering blogs
* React / Node / Rust blogs
* Hacker News
* NVD

`~25 sources total.`

---

## 17. Future Enhancements

* GitHub dependency graph analysis
* StackOverflow tag trends
* YouTube tech channels
* Podcast transcripts
* Documentation changes tracking

---

## 18. Summary

CSRadrX's strength comes from:

* high-quality sources
* frequent updates
* multi-source aggregation
* strong filtering

This document defines the complete ingestion layer and will directly guide:

* Fetcher service implementation
* Queue design
* Database schema
* AI processing pipeline

---

## 19. AI / LLM Ecosystem (CRITICAL ADDITION)

Modern computer science is heavily driven by AI systems. CSRadrX must track AI labs, model releases, and tooling ecosystems.

Sources:

* `https://openai.com/blog/rss.xml`
* `https://www.anthropic.com/news/rss.xml`
* `https://huggingface.co/blog/feed.xml`
* `https://deepmind.google/blog/rss.xml`

Additional Signals (Hugging Face)

API:

`https://huggingface.co/api/models`

Extract:

* model_name
* task (LLM, vision, etc.)
* downloads
* likes
* created_at
* tags

Why Important:

* AI is currently the fastest evolving field in CS.
* Model releases = new capabilities.

---

## 20. Developer Tooling / Infrastructure (CRITICAL)

These sources represent real-world production systems used by developers.

Sources:

* `https://vercel.com/changelog/rss.xml`
* `https://blog.cloudflare.com/tag/workers/rss/`
* `https://www.docker.com/blog/feed/`
* `https://kubernetes.io/feed.xml`
* `https://aws.amazon.com/blogs/architecture/feed/`
* `https://azure.microsoft.com/en-us/blog/feed/`
* `https://cloud.google.com/blog/products/rss/`

Extract:

* tool_name
* feature_update
* release_notes
* performance_changes
* breaking_changes

Why Important:

* These tools define how modern systems are built.
* Changes here impact millions of developers instantly.

---

## 22. Documentation Change Tracking (HIDDEN GOLDMINE)

Most platforms ignore this. CSRadrX should not.

Sources (via GitHub repos):

* `https://github.com/facebook/react`
* `https://github.com/nodejs/node`
* `https://github.com/kubernetes/kubernetes`
* `https://github.com/tensorflow/tensorflow`

Track:

* `/docs` folder changes
* release notes updates
* API docs updates

Extract:

* doc_change
* feature_reference
* new APIs
* deprecated APIs

Why Important:

* Docs change = feature shipped
* Often earlier than blogs or announcements

---

## 23. Infra + AI Intersection (ADVANCED SIGNAL)

Track tools combining:

* AI + infrastructure
* AI + dev tools
* AI + deployment

Examples:

* LangChain updates
* LlamaIndex updates
* Vercel AI SDK
* OpenAI SDK releases

---

## 24. Updated Source Priority

Tier 1 (High Signal)

* Research papers
* Engineering blogs
* AI ecosystem (NEW)
* Infra tools (NEW)
* Security feeds
* Framework updates

Tier 2 (Medium Signal)

* GitHub activity
* Package ecosystems
* Documentation changes (NEW)

Tier 3 (Lower Signal)

* Developer communities
* Tech news

---

## 25. Summary

CSRadrX now additionally covers:

* AI ecosystem (OpenAI, Anthropic, HF)
* Developer infra (Vercel, Docker, K8s)
* GitHub trend signals
* Documentation-level updates
