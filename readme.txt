=== Anything Block ===
Contributors: aristath
Tags: blocks, gutenberg blocks, gutenberg, editor
Requires at least: 5.0
Tested up to: 5.4
Stable tag: 1.0.0
Requires PHP: 5.6
License: MIT
License URI: https://opensource.org/licenses/MIT

Print any kind of data, any way you want it.

== Description ==

With the Anything Block you can print values stored in settings, post-meta and even theme-mods.

The block contains 3 options:

* Data Source
* Option Name
* Output HTML

In the "Data Source" option you can choose between settings, post-meta or theme-mods.

Depending on what you selected as a data-source, you can use the "Option Name" field to make the data you want to print more specific. For example if you chose `Setting` as a data-source, entering `blogname` will retrieve the name of your site. You can use anything as long as it exists in your database. If you leave this field empty, then all data become available.

In the "Output HTML" field you can enter your custom HTML and use `{data}` as a placeholder for your data. If the value is an array then you can use `{data.foo}` to get the data you need.

Used in conjunction with the Gutenberg Full-Site-Editing experiment this block can be used to add various data to your templates. In WooCommerce or EDD are installed on the site, it can be even used to create custom templates for your products using the post-meta.

== Examples ==

Print the site-name:

* Data Source: `setting`
* Option Name: `blogname`
* Output HTML: `{data}`

Print a link to the site-home, with the site-name as text:

* Data Source: `setting`
* Option Name: `''` (empty)
* Output HTML: `<a href="{data.home}">{data.blogname}</a>`
