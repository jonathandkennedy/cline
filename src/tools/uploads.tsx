'use client';

import { Paperclip, X } from 'lucide-react';
import { useCallback, useId, useRef } from 'react';
import { CASE_ATTACHMENT_ACCEPT, formatAttachmentSize } from '@/lib/attachments';
import { CHECKLIST_UI } from '@/lib/cms';
import { TOOL_SECTION_LABEL_GOLD_CLASS } from '@/tools/tokens';

export function DocumentationUpload({
	files,
	onAdd,
	onRemove,
}: {
	files: readonly File[];
	onAdd: (files: FileList | File[]) => void;
	onRemove: (index: number) => void;
}) {
	const inputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	const openPicker = useCallback(() => {
		inputRef.current?.click();
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files?.length) onAdd(e.target.files);
			e.target.value = '';
		},
		[onAdd],
	);

	const handleRemove = useCallback((index: number) => () => onRemove(index), [onRemove]);

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-2 gap-y-1">
				<span className={TOOL_SECTION_LABEL_GOLD_CLASS}>{CHECKLIST_UI.uploadEyebrow}</span>
				<button
					type="button"
					onClick={openPicker}
					className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-cta transition hover:text-gold"
				>
					<Paperclip size={14} aria-hidden />
					{CHECKLIST_UI.uploadButton}
				</button>
			</div>
			<input
				ref={inputRef}
				id={inputId}
				type="file"
				className="sr-only"
				multiple
				accept={CASE_ATTACHMENT_ACCEPT}
				onChange={handleChange}
			/>
			{files.length > 0 ? (
				<ul className="mt-3 space-y-1.5">
					{files.map((file, index) => (
						<li
							key={`${file.name}-${file.size}-${index}`}
							className="flex items-center justify-between gap-3 rounded-lg border border-line/80 bg-surface/30 px-3 py-2"
						>
							<div className="min-w-0">
								<div className="truncate text-[13px] font-medium text-fg">{file.name}</div>
								<div className="text-[11.5px] text-subtle tabular">
									{formatAttachmentSize(file.size)}
								</div>
							</div>
							<button
								type="button"
								onClick={handleRemove(index)}
								className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-subtle transition hover:text-danger"
								aria-label={`${CHECKLIST_UI.uploadRemoveAria}: ${file.name}`}
							>
								<X size={14} />
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
