# Dgraph

Dgraph blog theme is an ideal responsive theme for your blog. It has a list view with a image for each post and a beautiful page for individual posts. You can see it live in action on the [Dgraph Blog](https://open.dgraph.io).

![Dgraph screenshot](https://raw.githubusercontent.com/dgraph-io/hugo-dgraph-theme/master/images/screenshot.png)

## Features

* Responsive
* Suited for personal or company blog
* Support for [discourse](https://www.discourse.org) for commenting
* Syntax highlighting for code samples

## Installation

Inside the folder of your Hugo site run:

```
$ cd themes
$ git clone https://github.com/dgraph-io/hugo-dgraph-theme
```

For more information read the official [setup guide](//gohugo.io/overview/installing/) of Hugo.

## Site variables

Please see the sample [`config.toml`](https://github.com/dgraph-io/hugo-dgraph-theme/blob/master/exampleSite/config.toml) under the `exampleSite` directory.

## Show Author And Editor Details in Blogs

* To add `author` name, create a file `author_name.html` in `layouts/partials/` and add name in format:

```
{{if eq .Params.author "<author_name>" }} <display_name>
```

* To add `author profile` to blog, create a file `author_profile.html` in `layouts/partials/` and add name in format:

```
{{if eq .Params.author "<author_name>" }}
<div class="article-author">
	<figure class="article-author__figure"><img src="/images/<author_img_src>" alt="<display_name>" class="article-author__image"></figure>
	<div class="article-author__bio">
		<h4 class="article-author__name"><display_name>
			<span class="article-author__title">Author</span>
		</h4>
		<nav class="social__nav article-author__social">
			<ul class="social__list social__list--inline">
				<li class="social__item social__item--inline"><a href="<author_linkedin_link>" class="social__link">
						<svg class="icon social__icon social__icon--linkedin">
							<use xlink:href="#icon-linkedin" xmlns:xlink="https://www.w3.org/1999/xlink"></use>
						</svg></a></li>
						<li class="social__item social__item--inline"><a href="<author_twitter_link>" class="social__link">
								<svg class="icon social__icon social__icon--twitter">
									<use xlink:href="#icon-twitter" xmlns:xlink="https://www.w3.org/1999/xlink"></use>
								</svg></a></li>
			</ul>
		</nav>
		Author Bio
	</div>
</div>

```

* To add `editor profile` to blog, create a file `editor_profile.html` in `layouts/partials/` and add name in format:

```
{{if eq .Params.author "<author_name>" }}
<div class="article-author">
	<figure class="article-author__figure"><img src="/images/<author_img_src>" alt="<display_name>" class="article-author__image"></figure>
	<div class="article-author__bio">
		<h4 class="article-author__name"><display_name>
			<span class="article-author__title">Editor</span>
		</h4>
		<nav class="social__nav article-author__social">
			<ul class="social__list social__list--inline">
				<li class="social__item social__item--inline"><a href="<author_linkedin_link>" class="social__link">
						<svg class="icon social__icon social__icon--linkedin">
							<use xlink:href="#icon-linkedin" xmlns:xlink="https://www.w3.org/1999/xlink"></use>
						</svg></a></li>
						<li class="social__item social__item--inline"><a href="<author_twitter_link>" class="social__link">
								<svg class="icon social__icon social__icon--twitter">
									<use xlink:href="#icon-twitter" xmlns:xlink="https://www.w3.org/1999/xlink"></use>
								</svg></a></li>
			</ul>
		</nav>
		Author Bio
	</div>
</div>

```
Note: Sample files for author and editors name are added in `layout/partials/`

## Contributing

Pull requests, bug fixes and new features are welcome!

We follow [Git flow](http://nvie.com/posts/a-successful-git-branching-model/). So please create feature branches from develop and submit a PR for any change.

## License

Licensed under the MIT License. See the [LICENSE](https://github.com/dgraph-io/hugo-dgraph-theme/blob/master/LICENSE.md) file for more details.


## Credits

* [Steve Francia](//github.com/spf13) for creating Hugo and the awesome community around the project.
* [Danijel Grabez](https://twitter.com/danijel_grabez) for designing and coding up the theme.
