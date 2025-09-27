---
layout: page
permalink: /archive/
title: Posts Archive
---

<div class="post-list-by-year">
    {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'"  %}
    {% for year in postsByYear %}
        <h2 class="year">{{ year.name }}</h2>
        <ul class="post-list">
            {% for post in year.items %}
                <li>
                    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
                    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
                </li>
            {% endfor %}
        </ul>
    {% endfor %}
</div>
