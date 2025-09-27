---
layout: page
permalink: /categories/
title: Categories
---

<ul class="category-list">
  {% for category in site.categories %}
    <li>
      <a href="#{{ category | first | slugify }}">
        {{ category | first }} ({{ category | last | size }})
      </a>
    </li>
  {% endfor %}
</ul>

{% for category in site.categories %}
  <h2 id="{{ category | first | slugify }}">{{ category | first }}</h2>
  <ul class="post-list">
    {% for post in category.last %}
      <li>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
