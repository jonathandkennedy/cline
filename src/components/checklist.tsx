import { Check } from 'lucide-react';

export function TrustCheck({ children }: { children: string }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			<Check size={13} className="text-recovery" /> {children}
		</span>
	);
}
