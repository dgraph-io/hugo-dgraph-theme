# Dgraph

Dgraph blog theme is an ideal responsive theme for your blog. It has a list view with a image for each post and a beautiful page for individual posts. You can see it live in action on the [Dgraph Blog](https://blog.dgraph.io).

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

Sample files `author_image.html`,`author_name.html` and ``author_detail.html`` for author's and editor's name, image and details are added in `layout/partials/`.

## Pagination

Theme also provides pagination, for changing the number of blogs listed add `paginate = <number of blogs per page>` to `config.toml` (by default it displays 10 blogs).

## Contributing

Pull requests, bug fixes and new features are welcome!

We follow [Git flow](http://nvie.com/posts/a-successful-git-branching-model/). So please create feature branches from develop and submit a PR for any change.

## License

Licensed under the MIT License. See the [LICENSE](https://github.com/dgraph-io/hugo-dgraph-theme/blob/master/LICENSE.md) file for more details.


## Credits

* [Steve Francia](//github.com/spf13) for creating Hugo and the awesome community around the project.
* [Danijel Grabez](https://twitter.com/danijel_grabez) for designing and coding up the theme.
