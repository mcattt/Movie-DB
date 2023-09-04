// Page - Single Movie

import { useEffect } from 'react';
import { appTitle } from '../globals/globals';

const PageSingle = () => {

	useEffect(() => {
		document.title = `${appTitle} - Single`;
	}, []);

	return (
		<section>
			<h2>About Single</h2>
			<p>Saepe vitae deserunt cupiditate vel reiciendis adipisci quasi. At, dolore qui, saepe similique id repellat ipsam sapiente repellendus commodi deleniti natus itaque hic temporibus nam nobis tempora enim suscipit quas!</p>
		</section>
	);
	
};

export default PageSingle;