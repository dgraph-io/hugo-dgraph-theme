// Algolia vars
const appId = 'H10LQ4I695';
const publicKey = 'b57c0b5231fd34f2077cf00e76cc8f8e';
const index = 'dgraph_blog';

let showSearch = true;
let widgetContainer = {};

// Toggles search interface's visibility
const toggleVisibility = () => {
	widgetContainer.style.display = showSearch? "none" : "";
	widgetContainer.querySelector('input').focus();
	showSearch = !showSearch;
}

const parseSummary = (summary) => summary.trim().replace("<p>", "").replace("</p>", "");

// Renders tags
const renderTags = tags => `
	<div class="tag-wrapper">
	${
		tags.map(tag => `
			<span 
				class="tag"
				onclick="event.stopPropagation(); window.location.href = '/tags/${tag.toLowerCase()}'"
			>
				${tag}
			</span>
		`)
		.join('')
	}
	</div>
`;

// Helper for the render function
const renderIndexListItem = ({ indexId, hits }) => `
<li> 
	<div class="results-header">
		<div class="number-of-results">
			${hits.length} results found.
		</div>
	</div>

  	<ol>
		${hits
			.slice(0, 5)
			.map(
				hit =>
				`<li 
						class="search-listing"
						onclick="window.location.href='${hit.permalink}'"
					>
					<div class="title">
						${instantsearch.highlight({ attribute: 'title', hit })}
					</div>
					<div class="summary">
						${parseSummary(hit.summary)} 
					</div>
					<div>
						${renderTags(hit.tags || [])}
					</div>
				</li>`
			)
			.join('')}
  	</ol>
</li>
`;

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
	const { indices, currentRefinement, refine, widgetParams } = renderOptions;

	if (isFirstRender) {
		const background = document.createElement('div');
		const input = document.createElement('input');
		const ul = document.createElement('ul');
		
		background.className = "search-background";
		ul.className = "search-results";
		input.className = "search-input";

		input.placeholder = "Search...";

		background.onclick = toggleVisibility;

		input.addEventListener('input', event => {
			refine(event.currentTarget.value);
		});

		widgetContainer = widgetParams.container;

		widgetContainer.appendChild(background);
		widgetContainer.appendChild(input);
		widgetContainer.appendChild(ul);

		toggleVisibility();
	}

	widgetContainer.querySelector('input').value = currentRefinement;
	
	if (currentRefinement) {
		widgetContainer.querySelector('ul').style.display = "";
		widgetContainer.querySelector('ul').innerHTML = indices
			.map(renderIndexListItem)
			.join('');
	} else {
		widgetContainer.querySelector('ul').innerHTML = "";
		widgetContainer.querySelector('ul').style.display = "none"
	}
};

const createSearch = () => {
	// Create the custom widget
	const customAutocomplete = instantsearch.connectors.connectAutocomplete(
		renderAutocomplete
	);

	// Algolia client
	const client = algoliasearch(appId, publicKey);
	
	const search = instantsearch({
		indexName: index,
		searchClient: client,
	});
	search.addWidgets([
		customAutocomplete({
			container: document.querySelector('#searchbox'),
		})
	]);

	search.start();
};