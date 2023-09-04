// Page - About

import { useEffect } from 'react';
import { appTitle } from '../globals/globals';

const PageFavourites = () => {

	useEffect(() => {
		document.title = `${appTitle} - Favourites`;
	}, []);

	return (
		<section>
			<h2>About Favourites</h2>
			<p>Saepe vitae deserunt cupiditate vel reiciendis adipisci quasi. At, dolore qui, saepe similique id repellat ipsam sapiente repellendus commodi deleniti natus itaque hic temporibus nam nobis tempora enim suscipit quas!</p>
		</section>
	);
	
};

export default PageFavourites;