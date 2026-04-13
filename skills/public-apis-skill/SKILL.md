---
name: public-api-lookup
description: "Search and discover free public APIs from the public-apis catalog (1400+ APIs across 50+ categories). Use when the user asks to find a public API, needs a free API for a project, asks 'is there an API for X', wants to browse API categories, or needs APIs filtered by auth type (none, apiKey, OAuth), HTTPS support, or CORS support. Triggers on: 'find an API for', 'public API', 'free API', 'API for weather/cats/finance/etc', 'what APIs are available for', 'I need an API that', 'list API categories', 'random API', 'suggest an API'."
---

# Public API Lookup

Search the [public-apis](https://github.com/public-apis/public-apis) catalog — 1400+ free APIs across 50+ categories. Results are cached locally for 5 minutes.

## How to search

Run `scripts/search_apis.py` (Python 3, zero dependencies).

```bash
# Keyword search
python3 scripts/search_apis.py --search "weather"

# Browse a category
python3 scripts/search_apis.py --category "Finance"

# Filter by auth, HTTPS, CORS
python3 scripts/search_apis.py --auth none --https yes --cors yes

# Limit results
python3 scripts/search_apis.py --search "image" --limit 5

# Random APIs (great for "surprise me" or "suggest something")
python3 scripts/search_apis.py --random 3

# Combine everything
python3 scripts/search_apis.py --category "Weather" --auth none --limit 5

# List all categories with counts
python3 scripts/search_apis.py --categories
```

Output is JSON to stdout. Each API has: `name`, `description`, `auth`, `https`, `cors`, `url`, `category`.

## How to present results

**Always format as a markdown table** with clickable links:

| API | Description | Auth | HTTPS | CORS | Link |
|-----|-------------|------|-------|------|------|
| Open-Meteo | Open-source weather API | No | Yes | Yes | [Link](https://open-meteo.com/) |

**When the user has a specific project in mind**, don't just list APIs — recommend the best fit:
- Pick the top 1-3 APIs that match their use case
- Explain *why* each is a good fit (e.g., "No auth needed so you can start immediately", "CORS enabled so it works from the browser")
- Mention trade-offs (e.g., "Rate-limited but free", "Requires API key but has richer data")

**When the user is browsing or exploring**, show more results (5-10) grouped by category. Use `--limit` to avoid overwhelming output.

**When the user says "surprise me" or "suggest something"**, use `--random 3` to pick random APIs and describe each one with a fun one-liner about what you could build with it.

## Categories (51 total)

Animals, Anime, Anti-Malware, Art & Design, Authentication & Authorization, Blockchain, Books, Business, Calendar, Cloud Storage & File Sharing, Continuous Integration, Cryptocurrency, Currency Exchange, Data Validation, Development, Dictionaries, Documents & Productivity, Email, Entertainment, Environment, Events, Finance, Food & Drink, Games & Comics, Geocoding, Government, Health, Jobs, Machine Learning, Music, News, Open Data, Open Source Projects, Patent, Personality, Phone, Photography, Programming, Science & Math, Security, Shopping, Social, Sports & Fitness, Test Data, Text Analysis, Tracking, Transportation, URL Shorteners, Vehicle, Video, Weather
