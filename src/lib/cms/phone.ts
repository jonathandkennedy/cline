import type { HeaderPhoneChrome } from '@/kit/shared';
import { APP_SHELL } from '@/lib/cms/frame';
import { callBrandAriaLabel } from '@/lib/cms/brandtemplate';
import { BRAND } from '@/lib/cms/tables/config';

export function siteHeaderPhoneChrome(): HeaderPhoneChrome {
	return {
		phoneHref: BRAND.phoneHref,
		phoneDisplay: BRAND.phoneDisplay,
		phoneAriaLabel: callBrandAriaLabel(APP_SHELL.aria.callPrefix, APP_SHELL.aria.atPhone),
	};
}
