import type { SiteBreadcrumbItem } from '@/kit/layout/types/breadcrumb';
import { components } from '@/kit/theme/interface/components';
import Link from '@/kit/ui/components/link';
import { cn } from '@/kit/ui/functions/cn';

export function SiteBreadcrumbs({
	items,
	inBanner = false,
}: {
	items: SiteBreadcrumbItem[];
	inBanner?: boolean;
}) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn(!inBanner && components.shell, !inBanner && components['trail.crumbPy'])}
		>
			<ol className={components['trail.list']}>
				{items.map((item, index) => (
					<li key={item.href} className={components['trail.item']}>
						{index > 0 ? (
							<span aria-hidden className={components['trail.separator']}>
								/
							</span>
						) : null}
						{index === items.length - 1 ? (
							<span className={components['trail.current']}>{item.label}</span>
						) : (
							<Link href={item.href} className={components['trail.link']}>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
