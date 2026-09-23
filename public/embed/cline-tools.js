/**
 * CLINE APC tool embed loader for WordPress / lemonlawlawyerscalifornia.com
 *
 * Usage:
 * <div data-cline-tool="eligibility-checker" data-cline-title="Eligibility Checker"></div>
 * <div data-cline-tool="case-review" data-cline-source="header-popup"></div>
 * <script src="https://tools.lemonlawlawyerscalifornia.com/embed/cline-tools.js" defer></script>
 *
 * Public API: window.ClineApcTools.mountAll()
 */
(function (root) {
	'use strict';

	var SOURCE = 'cline-apc-tools';
	var DEFAULT_ORIGIN = 'https://tools.lemonlawlawyerscalifornia.com';
	var MIN_HEIGHT = 480;
	var MOUNTED = 'data-cline-mounted';
	var ROUTES = {
		'eligibility-checker': '/tool/eligibility-checker',
		'buyback-calculator': '/tool/buyback-calculator',
		'documentation-checklist': '/tool/documentation-checklist',
		'case-review': '/embed/case-review',
		form: '/embed/case-review',
		optin: '/embed/case-review',
		'opt-in': '/embed/case-review',
	};
	var DEFAULT_HEIGHTS = {
		'eligibility-checker': 720,
		'buyback-calculator': 820,
		'documentation-checklist': 760,
		'case-review': 920,
		form: 920,
		optin: 920,
		'opt-in': 920,
	};

	function scriptOrigin() {
		var current = document.currentScript;
		if (current && current.src) {
			try {
				return new URL(current.src).origin;
			} catch (_) {}
		}
		return DEFAULT_ORIGIN;
	}

	var LOADED_ORIGIN = scriptOrigin();
	var DEFAULT_SITE_HOME = 'https://www.lemonlawlawyerscalifornia.com';

	function parseOrigin(raw) {
		if (!raw) return LOADED_ORIGIN;
		try {
			return new URL(raw).origin;
		} catch (_) {
			return LOADED_ORIGIN;
		}
	}

	function resolvedOrigin() {
		return parseOrigin(
			document.documentElement.getAttribute('data-cline-tools-origin'),
		);
	}

	function isToolsOrigin(origin) {
		try {
			var parsed = new URL(origin).origin;
			if (parsed === DEFAULT_ORIGIN) return true;
			if (parsed === LOADED_ORIGIN) return true;
			return false;
		} catch (_) {
			return false;
		}
	}

	function siteHome(container) {
		var fromNode = container
			? (container.getAttribute('data-cline-home') || '').trim()
			: '';
		var fromHtml = (
			document.documentElement.getAttribute('data-cline-site-home') || ''
		).trim();
		var candidates = [fromNode, fromHtml, window.location.origin];
		for (var i = 0; i < candidates.length; i++) {
			var raw = candidates[i];
			if (!raw) continue;
			try {
				var origin = new URL(raw, window.location.href).origin;
				if (!isToolsOrigin(origin)) return origin;
			} catch (_) {}
		}
		return DEFAULT_SITE_HOME;
	}

	function viewportFillHeight() {
		return Math.max(MIN_HEIGHT, Math.round(window.innerHeight * 0.92));
	}

	function slotHeight(container, tool) {
		var raw = (container.getAttribute('data-cline-height') || '').trim();
		if (raw === 'full' || raw === 'viewport') {
			return viewportFillHeight();
		}
		return Number(raw) || DEFAULT_HEIGHTS[tool] || 720;
	}

	function resolveHeight(container, tool, fillViewport) {
		if (fillViewport) {
			return viewportFillHeight();
		}
		return slotHeight(container, tool);
	}

	function initContainer(container, origin) {
		if (container.getAttribute(MOUNTED) === '1') return;
		var tool = (container.getAttribute('data-cline-tool') || '').trim();
		var path = ROUTES[tool];
		if (!path) return;

		container.setAttribute(MOUNTED, '1');

		var title =
			container.getAttribute('data-cline-title') ||
			container.getAttribute('aria-label') ||
			tool.replace(/-/g, ' ');
		var startAttr = container.getAttribute('data-cline-start');
		var chrome = (container.getAttribute('data-cline-chrome') || '').trim();
		var cardChrome = chrome === 'card';
		var start =
			startAttr === '0'
				? ''
				: startAttr === '1' ||
					  cardChrome ||
					  (startAttr === null && tool === 'eligibility-checker')
					? '&start=1'
					: '';
		var source = (container.getAttribute('data-cline-source') || '').trim();
		var fillViewport = container.getAttribute('data-cline-fill') === '1';
		var height = resolveHeight(container, tool, fillViewport);
		var floor = fillViewport ? viewportFillHeight() : slotHeight(container, tool);
		var iframeBg = cardChrome ? 'transparent' : '#010f27';
		var iframeRadius = cardChrome ? '0' : '12px';

		container.style.minHeight = floor + 'px';
		container.style.width = '100%';
		container.style.height = 'auto';

		var iframe = document.createElement('iframe');
		iframe.title = title;
		iframe.loading = 'lazy';
		iframe.setAttribute(
			'allow',
			'clipboard-write; fullscreen; encrypted-media',
		);
		iframe.style.cssText =
			'display:block;width:100%;height:' +
			height +
			'px;border:0;border-radius:' +
			iframeRadius +
			';background:' +
			iframeBg +
			';overflow:hidden;';

		window.addEventListener('message', function (event) {
			if (event.source !== iframe.contentWindow) return;
			var data = event.data;
			if (!data || data.source !== SOURCE) return;

			if (data.type === 'RESIZE' && typeof data.height === 'number') {
				var next = Math.max(floor, Math.ceil(data.height));
				if (fillViewport) {
					next = Math.max(next, viewportFillHeight());
				}
				iframe.style.height = next + 'px';
			}

			if (data.type === 'LEAD_SUBMITTED') {
				container.dispatchEvent(
					new CustomEvent('cline:lead-submitted', {
						detail: data.payload,
						bubbles: true,
					}),
				);
				if (typeof root.clineOnLeadSubmitted === 'function') {
					root.clineOnLeadSubmitted(data.payload, tool);
				}
			}

			if (data.type === 'READY') {
				container.dispatchEvent(
					new CustomEvent('cline:tool-ready', {
						detail: { tool: tool, mode: data.mode },
						bubbles: true,
					}),
				);
			}
		});

		var src =
			origin + path + '?standalone' + start;
		if (source) {
			src += '&source=' + encodeURIComponent(source);
		}
		if (
			chrome === 'no-header' ||
			chrome === 'no-bg' ||
			chrome === 'card'
		) {
			src += '&chrome=' + encodeURIComponent(chrome);
		}
		var home = siteHome(container);
		if (home) {
			src += '&home=' + encodeURIComponent(home);
		}
		iframe.src = src;

		container.innerHTML = '';
		container.appendChild(iframe);

		if (fillViewport) {
			var onViewportResize = function () {
				iframe.style.height = viewportFillHeight() + 'px';
			};
			window.addEventListener('resize', onViewportResize);
		}
	}

	function mountAll() {
		var origin = resolvedOrigin();
		var nodes = document.querySelectorAll('[data-cline-tool]');
		for (var i = 0; i < nodes.length; i++) {
			initContainer(nodes[i], origin);
		}
	}

	function observe() {
		if (typeof MutationObserver === 'undefined' || !document.body) return;
		var mo = new MutationObserver(function (mutations) {
			for (var i = 0; i < mutations.length; i++) {
				var added = mutations[i].addedNodes;
				for (var j = 0; j < added.length; j++) {
					var node = added[j];
					if (!node || node.nodeType !== 1) continue;
					var el = node;
					if (el.matches && el.matches('[data-cline-tool]')) {
						initContainer(el, resolvedOrigin());
					}
					if (el.querySelectorAll) {
						var nested = el.querySelectorAll('[data-cline-tool]');
						for (var k = 0; k < nested.length; k++) {
							initContainer(nested[k], resolvedOrigin());
						}
					}
				}
			}
		});
		mo.observe(document.body, { childList: true, subtree: true });
	}

	function boot() {
		mountAll();
		observe();
		document.addEventListener('elementor/popup/show', mountAll);
	}

	root.ClineApcTools = {
		mountAll: mountAll,
		origin: resolvedOrigin,
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})(typeof window !== 'undefined' ? window : this);
