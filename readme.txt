=== Anything Block ===
Contributors: aristath
Tags: blocks, gutenberg blocks, gutenberg, editor
Requires at least: 5.0
Tested up to: 5.4
Stable tag: 1.0.1
Requires PHP: 5.6
License: MIT
License URI: https://opensource.org/licenses/MIT

Print any kind of data, any way you want it.

== Description ==

With the Anything Block you can print values stored in settings, post-meta and even theme-mods.

Start typing in the "Output HTML" field of the block and your HTML will be rendered directly. You can use `{data}` as a placeholder for your saved data.

Used in conjunction with the Gutenberg Full-Site-Editing experiment this block can be used to add various data to your templates. In WooCommerce or EDD are installed on the site, it can be even used to create custom templates for your products using the post-meta.

== Examples ==

* Print the site-name: `{data.setting.blogname}`
* Print a link to the site-home, with the site-name as text: `<a href="{data.setting.home}">{data.setting.blogname}</a>`
* Print the post-ID: `{data.post.ID}`
* Print a theme-mod: `{data.themeMod.my_theme_mod}`
* Print a post-meta: `{data.post.meta.my_post_meta}`
