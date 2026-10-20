# Research Lab Website Framework

This is a dependency-free, responsive website framework for a research lab. The site lives in `dist/` and is intended as a first working prototype for content and visual direction.

## Included Sections

- Lab positioning and introduction
- Research directions and guiding questions
- Faculty, students, and alumni
- Filterable papers, projects, and open-source output
- News and academic events
- Data, code, facilities, courses, and collaboration network
- Recruitment and open positions
- Contact information and external academic profiles

## Local Preview

Run this command from the project directory:

```bash
python3 -m http.server 4173 --directory dist
```

Then visit `http://localhost:4173`.

## Recommended Content Checklist

1. Official lab name, logo, school or department brand colors, and address
2. A short introduction, a 300–500 word full description, and 3–5 research keywords
3. Names, titles, photos, research interests, profiles, and email addresses for each member
4. Six to ten representative outputs and a source for the complete publication list
5. Three to six recent news items and upcoming events
6. Recruitment targets, application materials, timing, and contact email
7. GitHub, Google Scholar, social media, and other external links

## Suggested Next Steps

The current version uses static HTML, CSS, and JavaScript to make the information architecture easy to review. Once the content is stable, member profiles, publications, and news can move to JSON, Markdown, or a CMS. The site can then add publication search, detail pages, bilingual content, and automated publication syncing.
