'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GTM_ID, trackEvent } from '@/lib/analytics';

/** Phone links are the other conversion besides the case review form. */
function usePhoneClickTracking() {
	useEffect(() => {
		if (!GTM_ID) return;
		const onClick = (event: MouseEvent) => {
			const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
			if (link) {
				trackEvent('phone_click', {
					link_url: link.getAttribute('href'),
					page_path: window.location.pathname,
				});
			}
		};
		document.addEventListener('click', onClick, { capture: true });
		return () => document.removeEventListener('click', onClick, { capture: true });
	}, []);
}

export function Analytics() {
	usePhoneClickTracking();
	if (!GTM_ID) return null;
	return (
		<Script id="gtm" strategy="afterInteractive">
			{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`}
		</Script>
	);
}
