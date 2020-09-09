---
# Content index for Tipue Search
# https://github.com/jekylltools/jekyll-tipue-search
# v1.4
layout: null
---
{%- assign index = "" | split: "" -%}
{%- assign excluded_files = site.tipue_search.exclude.files -%}
{%- assign excluded_tags = site.tipue_search.exclude.tags | uniq -%}
{%- assign excluded_categories = site.tipue_search.exclude.categories | uniq -%}
{%- assign excluded_taxonomies = excluded_tags | concat: excluded_categories | uniq -%}
{%- for post in site.posts -%}
  {%- unless post.exclude_from_search == true or excluded_files contains post.path -%}
    {%- assign has_excluded_taxonomy = false -%}
    {%- for tag in post.tags -%}
      {%- if excluded_taxonomies contains tag -%}
        {%- assign has_excluded_taxonomy = true -%}
      {%- endif -%}
    {%- endfor -%}
    {%- for category in post.categories -%}
      {%- if excluded_taxonomies contains category -%}
        {%- assign has_excluded_taxonomy = true -%}
      {%- endif -%}
    {%- endfor -%}
    {%- unless has_excluded_taxonomy == true -%}
      {%- assign index = index | push: post | uniq -%}
    {%- endunless -%}
  {%- endunless -%}
{%- endfor -%}
{%- if site.tipue_search.include.pages == true -%}
  {%- for page in site.html_pages -%}
    {%- unless page.exclude_from_search == true or excluded_files contains page.path -%}
      {%- assign has_excluded_taxonomy = false -%}
      {%- for tag in page.tags -%}
        {%- if excluded_taxonomies contains tag -%}
          {%- assign has_excluded_taxonomy = true -%}
        {%- endif -%}
      {%- endfor -%}
      {%- for category in page.categories -%}
        {%- if excluded_taxonomies contains category -%}
          {%- assign has_excluded_taxonomy = true -%}
        {%- endif -%}
      {%- endfor -%}
      {%- unless has_excluded_taxonomy == true -%}
        {%- assign index = index | push: page | uniq -%}
      {%- endunless -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endif -%}
{%- for collection in site.tipue_search.include.collections -%}
  {%- assign files = site.files | where:"collection",collection -%}
  {%- for file in files -%}
    {%- unless file.exclude_from_search == true or excluded_files contains file.path -%}
      {%- assign has_excluded_taxonomy = false -%}
      {%- for tag in file.tags -%}
        {%- if excluded_taxonomies contains tag -%}
          {%- assign has_excluded_taxonomy = true -%}
        {%- endif -%}
      {%- endfor -%}
      {%- for category in file.categories -%}
        {%- if excluded_taxonomies contains category -%}
          {%- assign has_excluded_taxonomy = true -%}
        {%- endif -%}
      {%- endfor -%}
      {%- unless has_excluded_taxonomy == true -%}
        {%- assign index = index | push: file | uniq -%}
      {%- endunless -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor -%}
var tipuesearch = {"pages": [
{%- for page in index -%}
  {%- assign tags = file.tags | uniq -%}
  {%- assign categories = file.categories | uniq -%}
  {%- assign taxonomies = tags | concat: categories | uniq -%}
  {
    "title": {{ file.title | smartify | strip_html | normalize_whitespace | jsonify }},
    "text": {{ file.content | strip_html | normalize_whitespace | jsonify }},
    "tags": {{ taxonomies | join: " " | normalize_whitespace | jsonify }},
    "url": {{ file.url | relative_url | jsonify }}
  }{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}
]};
