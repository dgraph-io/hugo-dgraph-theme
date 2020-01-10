const parseSummary = (summary) => summary.trim().replace("<p>", "").replace("</p>", "");

// Helper for the render function
const renderIndexListItem = ({ indexId, hits }) => `
<li> 
	<div class="results-header">
		<div class="number-of-results">
			${hits.length} results found.
		</div>
		<div class="close-button">
			XXXX
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
					<div class="title">${instantsearch.highlight({ attribute: 'title', hit })}</div>
					<div class="summary">${parseSummary(hit.summary)} </div>
					<div>${hit.tags}</div>
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
		const input = document.createElement('input');
		const ul = document.createElement('ul');
		
		ul.className = "search-results";
		input.className = "search-input";
		input.placeholder = "Search...";

		input.addEventListener('input', event => {
			refine(event.currentTarget.value);
		});

		widgetParams.container.appendChild(input);
		widgetParams.container.appendChild(ul);
	}

	widgetParams.container.querySelector('input').value = currentRefinement;

	const showSearchResults = widgetParams.container.querySelector('input') === document.activeElement;
	
	if (currentRefinement && showSearchResults) {
		widgetParams.container.querySelector('ul').style.display = "";
		widgetParams.container.querySelector('ul').innerHTML = indices
		.map(renderIndexListItem)
		.join('');
	} else {
		widgetParams.container.querySelector('ul').innerHTML = "";
		widgetParams.container.querySelector('ul').style.display = "none"
	}
};

const createSearch = () => {
	// Create the custom widget
	const customAutocomplete = instantsearch.connectors.connectAutocomplete(
		renderAutocomplete
	);



	const client = algoliasearch('ACO13Q5JXW', '140be40b311ca64b71564f19bb2f0995');
	// const index = client.initIndex('/');
	const search = instantsearch({
		indexName: 'dgraph_blog',
		searchClient: client,
	});
	search.addWidgets([
		customAutocomplete({
			container: document.querySelector('#searchbox'),
		})
	]);

	search.start();
};