/** Home manufacturers block; eyebrow from pages/home HOME_SECTIONS.manufacturers. */
import { memo } from 'react';
import { Manufacturers } from '@/components';
import Link from '@/components/link';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { HOME_RESOURCE_CTAS, HOME_SECTIONS } from '@/lib/cms';
import { components } from '@/kit/theme';

function BrandsComponent() {
	return (
		<section className={components.homeBrandsRoot}>
			<div className={components.homeBrandsIntro}>
				<p className={components.homeBrandsEyebrow}>{HOME_SECTIONS.manufacturers.eyebrow}</p>
				<div className={components.homeBrandsCtaRow}>
					<Link
						href={HOME_RESOURCE_CTAS.manufacturers.href}
						className={components.homeBrandsSecondaryCta}
					>
						{HOME_RESOURCE_CTAS.manufacturers.label}
					</Link>
					<PrimaryCallCta
						leadContextId="manufacturers-hub"
						className={components.homeBrandsPrimaryCta}
						arrowSize={16}
					/>
				</div>
			</div>
			<Manufacturers />
		</section>
	);
}

export const Brands = memo(BrandsComponent);
