import { Check } from 'lucide-react';

export type CheckRowProps = {
	item: string;
	checked: boolean;
	onToggle: () => void;
};

export function CheckRow({ item, checked, onToggle }: CheckRowProps) {
	return (
		<div className="check-row flex items-center gap-3 py-3">
			<CheckBox checked={checked} onChange={onToggle} />
			<button
				type="button"
				onClick={onToggle}
				className={`flex-1 cursor-pointer py-0 text-left text-[14.5px] leading-5 ${checked ? 'text-subtle line-through' : 'text-fg/90'}`}
			>
				{item}
			</button>
		</div>
	);
}

function CheckBox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
	return (
		<button
			type="button"
			role="checkbox"
			aria-checked={checked}
			onClick={onChange}
			className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition after:absolute after:inset-[-12px] after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 ${
				checked ? 'border-cta bg-cta text-black' : 'border-line bg-ink'
			}`}
		>
			{checked && <Check size={13} strokeWidth={3} />}
		</button>
	);
}
