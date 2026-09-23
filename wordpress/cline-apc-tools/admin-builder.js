(function () {
	'use strict';

	var TOOLS = {
		'eligibility-checker': {
			label: 'Eligibility Checker',
			shortcode: 'cline_eligibility',
			defaultStart: '1',
		},
		'buyback-calculator': {
			label: 'Buyback Calculator',
			shortcode: 'cline_buyback',
			defaultStart: '',
		},
		'documentation-checklist': {
			label: 'Documentation Checklist',
			shortcode: 'cline_checklist',
			defaultStart: '',
		},
		'case-review': {
			label: 'Case-review form',
			shortcode: 'cline_form',
			defaultStart: '',
		},
	};

	function $(id) {
		return document.getElementById(id);
	}

	function selectedChrome() {
		var checked = document.querySelector(
			'input[name="cline_apc_chrome"]:checked',
		);
		return checked ? checked.value : 'full';
	}

	function buildShortcode() {
		var toolKey = $('cline_apc_tool').value;
		var tool = TOOLS[toolKey];
		if (!tool) return '';
		var attrs = [];

		if (tool.shortcode === 'cline_tool') {
			attrs.push('tool="' + toolKey + '"');
		}

		var source = $('cline_apc_source').value.trim();
		if (source) attrs.push('source="' + source + '"');

		var start = $('cline_apc_start').checked ? '1' : '';
		if (start) attrs.push('start="1"');

		var chrome = selectedChrome();
		if (chrome && chrome !== 'full') attrs.push('chrome="' + chrome + '"');

		var fill = $('cline_apc_fill') && $('cline_apc_fill').checked;
		if (fill) {
			attrs.push('fill="1"');
		} else {
			var height = $('cline_apc_height').value.trim();
			if (height) attrs.push('height="' + height + '"');
		}

		var title = $('cline_apc_title').value.trim();
		if (title) attrs.push('title="' + title.replace(/"/g, '\\"') + '"');

		var cssClass = $('cline_apc_class').value.trim();
		if (cssClass) attrs.push('class="' + cssClass.replace(/"/g, '\\"') + '"');

		var id = $('cline_apc_dom_id').value.trim();
		if (id) attrs.push('id="' + id.replace(/"/g, '\\"') + '"');

		var body = attrs.length ? ' ' + attrs.join(' ') : '';
		return '[' + tool.shortcode + body + ']';
	}

	function syncPreview() {
		var frame = $('cline_apc_preview_frame');
		if (!frame) return;
		frame.setAttribute('data-chrome', selectedChrome());
	}

	function syncOutput() {
		var code = $('cline_apc_shortcode_output');
		if (code) code.textContent = buildShortcode();
		syncPreview();
	}

	function onToolChange() {
		var toolKey = $('cline_apc_tool').value;
		var tool = TOOLS[toolKey];
		if (!tool) return;
		$('cline_apc_start').checked = tool.defaultStart === '1';
		syncOutput();
	}

	function copyShortcode() {
		var text = buildShortcode();
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(function () {
				var btn = $('cline_apc_copy');
				if (!btn) return;
				var prev = btn.textContent;
				btn.textContent = 'Copied';
				setTimeout(function () {
					btn.textContent = prev;
				}, 1400);
			});
			return;
		}
		window.prompt('Copy shortcode:', text);
	}

	function initTabs() {
		var tabs = document.querySelectorAll('[data-cline-tab]');
		var panels = document.querySelectorAll('[data-cline-tab-panel]');
		tabs.forEach(function (tab) {
			tab.addEventListener('click', function () {
				var target = tab.getAttribute('data-cline-tab');
				tabs.forEach(function (t) {
					t.classList.toggle('is-active', t === tab);
				});
				panels.forEach(function (panel) {
					var match = panel.getAttribute('data-cline-tab-panel') === target;
					panel.hidden = !match;
				});
			});
		});
	}

	function initChromeCards() {
		document.querySelectorAll('.cline-apc-chrome-option').forEach(function (el) {
			el.addEventListener('click', function () {
				var input = el.querySelector('input[type="radio"]');
				if (input) input.checked = true;
				document.querySelectorAll('.cline-apc-chrome-option').forEach(function (opt) {
					opt.classList.toggle('is-selected', opt === el);
				});
				syncOutput();
			});
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		var root = document.querySelector('.cline-apc-admin');
		if (!root) return;

		[
			'cline_apc_tool',
			'cline_apc_source',
			'cline_apc_start',
			'cline_apc_fill',
			'cline_apc_height',
			'cline_apc_title',
			'cline_apc_class',
			'cline_apc_dom_id',
		].forEach(function (id) {
			var el = $(id);
			if (!el) return;
			el.addEventListener('change', syncOutput);
			el.addEventListener('input', syncOutput);
		});

		document.querySelectorAll('input[name="cline_apc_chrome"]').forEach(function (input) {
			input.addEventListener('change', syncOutput);
		});

		var copyBtn = $('cline_apc_copy');
		if (copyBtn) copyBtn.addEventListener('click', copyShortcode);

		$('cline_apc_tool').addEventListener('change', onToolChange);
		initTabs();
		initChromeCards();
		onToolChange();
	});
})();
