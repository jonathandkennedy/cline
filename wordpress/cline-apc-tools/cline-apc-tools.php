<?php
/**
 * Plugin Name: CLINE APC Tools
 * Plugin URI: https://www.lemonlawlawyerscalifornia.com/
 * Description: Embed CLINE APC California Lemon Law tools and the free case-review form anywhere via shortcodes (pages, posts, Elementor, popups).
 * Version: 1.0.23
 * Author: CLINE APC
 * Author URI: https://www.lemonlawlawyerscalifornia.com/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cline-apc-tools
 *
 * @package Cline_APC_Tools
 */

if (! defined('ABSPATH')) {
	exit;
}

define('CLINE_APC_TOOLS_VERSION', '1.0.23');
define('CLINE_APC_TOOLS_UPDATE_METADATA', '/wordpress/cline-apc-tools.json');
define('CLINE_APC_TOOLS_DEFAULT_ORIGIN', 'https://tools.lemonlawlawyerscalifornia.com');

final class Cline_APC_Tools {
	private static $last_fetch_error = null;

	private const KINDS = array(
		'eligibility-checker'     => 'eligibility-checker',
		'eligibility'             => 'eligibility-checker',
		'buyback-calculator'      => 'buyback-calculator',
		'buyback'                 => 'buyback-calculator',
		'documentation-checklist' => 'documentation-checklist',
		'checklist'               => 'documentation-checklist',
		'case-review'             => 'case-review',
		'form'                    => 'case-review',
		'optin'                   => 'case-review',
		'opt-in'                  => 'case-review',
	);

	private const HEIGHTS = array(
		'eligibility-checker'     => 720,
		'buyback-calculator'      => 820,
		'documentation-checklist' => 760,
		'case-review'             => 920,
	);

	private const TITLES = array(
		'eligibility-checker'     => 'California Lemon Law Eligibility Checker',
		'buyback-calculator'      => 'California Lemon Law Buyback Calculator',
		'documentation-checklist' => 'California Lemon Law Case Checklist',
		'case-review'             => 'Free case review',
	);

	private const CHROME = array( 'full', 'no-header', 'no-bg', 'card' );

	public static function init(): void {
		add_action('admin_menu', array(__CLASS__, 'admin_menu'));
		add_action('admin_init', array(__CLASS__, 'register_settings'));
		add_action('admin_enqueue_scripts', array(__CLASS__, 'admin_assets'));
		add_action('load-plugins.php', array(__CLASS__, 'refresh_update_check'));
		add_action('load-plugins.php', array(__CLASS__, 'persist_plugin_update'), 20);
		add_action('load-update-core.php', array(__CLASS__, 'refresh_update_check'));
		add_action('load-update-core.php', array(__CLASS__, 'persist_plugin_update'), 20);
		add_action('admin_init', array(__CLASS__, 'maybe_force_update_check'));
		add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue'));
		add_filter('language_attributes', array(__CLASS__, 'language_attributes'));
		add_filter('pre_set_site_transient_update_plugins', array(__CLASS__, 'check_for_update'));
		add_filter('site_transient_update_plugins', array(__CLASS__, 'inject_update'));
		add_filter('plugins_api', array(__CLASS__, 'plugin_info'), 20, 3);
		add_shortcode('cline_tool', array(__CLASS__, 'shortcode_tool'));
		add_shortcode('cline_form', array(__CLASS__, 'shortcode_form'));
		add_shortcode('cline_case_review', array(__CLASS__, 'shortcode_form'));
		add_shortcode('cline_eligibility', array(__CLASS__, 'shortcode_eligibility'));
		add_shortcode('cline_buyback', array(__CLASS__, 'shortcode_buyback'));
		add_shortcode('cline_checklist', array(__CLASS__, 'shortcode_checklist'));
	}

	public static function refresh_update_check(): void {
		delete_transient('cline_apc_tools_update');
	}

	/** Write our release into the core update_plugins transient (Plugins + Updates screens). */
	public static function persist_plugin_update(): void {
		if (! current_user_can('update_plugins')) {
			return;
		}

		$transient = get_site_transient('update_plugins');
		$merged    = self::merge_update($transient, true);
		if (! is_object($merged)) {
			return;
		}

		set_site_transient('update_plugins', $merged);
	}

	public static function maybe_force_update_check(): void {
		if (! is_admin() || ! current_user_can('update_plugins')) {
			return;
		}
		if (isset($_GET['force-check']) && $_GET['force-check']) {
			self::refresh_update_check();
		}
	}

	public static function origin(): string {
		$origin = get_option('cline_apc_tools_origin', CLINE_APC_TOOLS_DEFAULT_ORIGIN);
		if (! is_string($origin) || $origin === '') {
			$origin = CLINE_APC_TOOLS_DEFAULT_ORIGIN;
		}
		return untrailingslashit(esc_url_raw($origin));
	}

	/**
	 * @return array{
	 *   ok: bool,
	 *   url: string,
	 *   remote_version: string|null,
	 *   error: string|null,
	 *   update_available: bool
	 * }
	 */
	public static function update_probe(bool $force = true): array {
		$url = self::origin() . CLINE_APC_TOOLS_UPDATE_METADATA;
		$remote = self::remote_metadata($force);
		if ($remote === null) {
			return array(
				'ok'               => false,
				'url'              => $url,
				'remote_version'   => null,
				'error'            => self::last_update_error(),
				'update_available' => false,
			);
		}

		return array(
			'ok'               => true,
			'url'              => $url,
			'remote_version'   => isset($remote->version) ? (string) $remote->version : null,
			'error'            => null,
			'update_available' => isset($remote->version)
				&& version_compare((string) $remote->version, CLINE_APC_TOOLS_VERSION, '>'),
		);
	}

	private static function last_update_error(): string {
		if (is_string(self::$last_fetch_error) && self::$last_fetch_error !== '') {
			return self::$last_fetch_error;
		}
		$cached = get_transient('cline_apc_tools_update');
		if (is_string($cached) && $cached === 'none') {
			return 'Could not read update metadata from the tools host (HTTP error or invalid JSON).';
		}
		return 'Update metadata is unavailable.';
	}

	/**
	 * @return object|null
	 */
	private static function remote_metadata(bool $force = false) {
		if (! $force) {
			$cached = get_transient('cline_apc_tools_update');
			if ($cached !== false) {
				return is_object($cached) ? $cached : null;
			}
		}

		self::$last_fetch_error = null;
		$url = self::origin() . CLINE_APC_TOOLS_UPDATE_METADATA;
		if ($force) {
			$url = add_query_arg('v', (string) time(), $url);
		}
		$resp = wp_remote_get(
			$url,
			array(
				'timeout'  => 15,
				'headers'  => array(
					'Accept' => 'application/json',
				),
				'user-agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url('/'),
			)
		);
		if (is_wp_error($resp)) {
			self::$last_fetch_error = $resp->get_error_message();
			set_transient('cline_apc_tools_update', 'none', 15 * MINUTE_IN_SECONDS);
			return null;
		}
		if (wp_remote_retrieve_response_code($resp) !== 200) {
			self::$last_fetch_error = 'HTTP ' . wp_remote_retrieve_response_code($resp);
			set_transient('cline_apc_tools_update', 'none', 15 * MINUTE_IN_SECONDS);
			return null;
		}

		$body = wp_remote_retrieve_body($resp);
		$data = json_decode($body);
		if (! is_object($data) || empty($data->version) || empty($data->download_url)) {
			set_transient('cline_apc_tools_update', 'none', 15 * MINUTE_IN_SECONDS);
			return null;
		}

		set_transient('cline_apc_tools_update', $data, HOUR_IN_SECONDS);
		return $data;
	}

	private static function plugin_basename(): string {
		return plugin_basename(__FILE__);
	}

	/**
	 * @param object|null $remote
	 * @return object|null
	 */
	private static function build_update_item($remote) {
		if ($remote === null || empty($remote->version) || empty($remote->download_url)) {
			return null;
		}
		if (! version_compare((string) $remote->version, CLINE_APC_TOOLS_VERSION, '>')) {
			return null;
		}

		$plugin = self::plugin_basename();
		return (object) array(
			'id'            => $plugin,
			'slug'          => 'cline-apc-tools',
			'plugin'        => $plugin,
			'new_version'   => (string) $remote->version,
			'url'           => isset($remote->homepage) ? (string) $remote->homepage : self::origin(),
			'package'       => (string) $remote->download_url,
			'tested'        => isset($remote->tested) ? (string) $remote->tested : '',
			'requires'      => isset($remote->requires) ? (string) $remote->requires : '',
			'requires_php'  => isset($remote->requires_php) ? (string) $remote->requires_php : '',
		);
	}

	/**
	 * @param mixed $transient
	 * @return mixed
	 */
	private static function merge_update($transient, bool $force) {
		if (! is_object($transient)) {
			$transient = new stdClass();
		}

		if (! isset($transient->response) || ! is_array($transient->response)) {
			$transient->response = array();
		}

		if (! isset($transient->no_update) || ! is_array($transient->no_update)) {
			$transient->no_update = array();
		}

		$item = self::build_update_item(self::remote_metadata($force));
		if ($item === null) {
			return $transient;
		}

		unset($transient->no_update[ $item->plugin ]);
		$transient->response[ $item->plugin ] = $item;
		return $transient;
	}

	/**
	 * WordPress reads this transient on Plugins + Updates screens.
	 *
	 * @param mixed $transient
	 * @return mixed
	 */
	public static function inject_update($transient) {
		return self::merge_update($transient, false);
	}

	/**
	 * @param mixed $transient
	 * @return mixed
	 */
	public static function check_for_update($transient) {
		return self::merge_update($transient, true);
	}

	/**
	 * @param false|object|array<string, mixed> $result
	 * @param string                            $action
	 * @param object                            $args
	 * @return false|object|array<string, mixed>
	 */
	public static function plugin_info($result, $action, $args) {
		if ($action !== 'plugin_information' || ! isset($args->slug) || $args->slug !== 'cline-apc-tools') {
			return $result;
		}

		$remote = self::remote_metadata();
		if ($remote === null) {
			return $result;
		}

		$info = (object) array(
			'name'          => isset($remote->name) ? $remote->name : 'CLINE APC Tools',
			'slug'          => 'cline-apc-tools',
			'version'       => $remote->version,
			'author'        => isset($remote->author) ? $remote->author : 'CLINE APC',
			'homepage'      => isset($remote->homepage) ? $remote->homepage : self::origin(),
			'download_link' => $remote->download_url,
			'tested'        => isset($remote->tested) ? $remote->tested : '',
			'requires'      => isset($remote->requires) ? $remote->requires : '',
			'requires_php'  => isset($remote->requires_php) ? $remote->requires_php : '',
			'sections'      => isset($remote->sections) && is_object($remote->sections) ? (array) $remote->sections : array(),
		);

		return $info;
	}

	public static function language_attributes(string $output): string {
		$origin = self::origin();
		$home   = untrailingslashit(home_url('/'));
		return $output
			. ' data-cline-tools-origin="' . esc_url($origin) . '"'
			. ' data-cline-site-home="' . esc_url($home) . '"';
	}

	public static function enqueue(): void {
		$origin = self::origin();
		wp_enqueue_script(
			'cline-apc-tools',
			$origin . '/embed/cline-tools.js',
			array(),
			CLINE_APC_TOOLS_VERSION,
			true
		);
	}

	public static function admin_menu(): void {
		add_menu_page(
			'CLINE APC Tools',
			'CLINE',
			'manage_options',
			'cline-apc-tools',
			array(__CLASS__, 'render_admin'),
			'dashicons-hammer',
			58
		);
		add_submenu_page(
			'cline-apc-tools',
			'Embed Builder',
			'Embed Builder',
			'manage_options',
			'cline-apc-tools',
			array(__CLASS__, 'render_admin')
		);
		add_submenu_page(
			'cline-apc-tools',
			'CLINE Settings',
			'Settings',
			'manage_options',
			'cline-apc-tools-settings',
			array(__CLASS__, 'render_settings')
		);
		add_options_page(
			'CLINE APC Tools',
			'CLINE APC Tools',
			'manage_options',
			'cline-apc-tools',
			array(__CLASS__, 'render_admin')
		);
	}

	/**
	 * @param string $hook
	 */
	public static function admin_assets($hook): void {
		if (
			$hook !== 'toplevel_page_cline-apc-tools' &&
			$hook !== 'settings_page_cline-apc-tools' &&
			$hook !== 'cline_page_cline-apc-tools-settings'
		) {
			return;
		}

		wp_enqueue_style(
			'cline-apc-admin-builder',
			plugins_url('admin-builder.css', __FILE__),
			array(),
			CLINE_APC_TOOLS_VERSION
		);
		wp_enqueue_script(
			'cline-apc-admin-builder',
			plugins_url('admin-builder.js', __FILE__),
			array(),
			CLINE_APC_TOOLS_VERSION,
			true
		);
	}

	public static function register_settings(): void {
		register_setting(
			'cline_apc_tools',
			'cline_apc_tools_origin',
			array(
				'type'              => 'string',
				'sanitize_callback' => 'esc_url_raw',
				'default'           => CLINE_APC_TOOLS_DEFAULT_ORIGIN,
			)
		);
	}

	public static function render_admin(): void {
		if (! current_user_can('manage_options')) {
			return;
		}
		?>
		<div class="wrap cline-apc-admin">
			<h1>CLINE APC Embed Builder</h1>
			<p>Pick a tool, choose how much chrome to show, then paste the shortcode on any page, post, Elementor widget, or popup.</p>

			<div class="cline-apc-tabs" role="tablist">
				<button type="button" class="cline-apc-tab is-active" data-cline-tab="builder">Embed Builder</button>
				<button type="button" class="cline-apc-tab" data-cline-tab="updates">Updates</button>
			</div>

			<div class="cline-apc-tab-panel" data-cline-tab-panel="builder">
				<div class="cline-apc-admin__grid">
					<div class="cline-apc-panel">
						<h2>Tool &amp; options</h2>

						<div class="cline-apc-field">
							<label for="cline_apc_tool">Tool</label>
							<select id="cline_apc_tool">
								<option value="eligibility-checker">Eligibility Checker</option>
								<option value="buyback-calculator">Buyback Calculator</option>
								<option value="documentation-checklist">Documentation Checklist</option>
								<option value="case-review">Case-review form</option>
							</select>
						</div>

						<div class="cline-apc-field">
							<span class="label">Embed chrome</span>
							<div class="cline-apc-chrome-options" role="radiogroup" aria-label="Embed chrome">
								<label class="cline-apc-chrome-option is-selected">
									<input type="radio" name="cline_apc_chrome" value="full" checked />
									<span>
										<span class="cline-apc-chrome-option__title">Full standalone</span>
										<span class="cline-apc-chrome-option__desc">Compact header + tool background (default).</span>
									</span>
								</label>
								<label class="cline-apc-chrome-option">
									<input type="radio" name="cline_apc_chrome" value="no-header" />
									<span>
										<span class="cline-apc-chrome-option__title">No header</span>
										<span class="cline-apc-chrome-option__desc">Hide the compact CLINE header bar inside the iframe.</span>
									</span>
								</label>
								<label class="cline-apc-chrome-option">
									<input type="radio" name="cline_apc_chrome" value="no-bg" />
									<span>
										<span class="cline-apc-chrome-option__title">No background</span>
										<span class="cline-apc-chrome-option__desc">Keep the header but remove the hero/backdrop image.</span>
									</span>
								</label>
								<label class="cline-apc-chrome-option">
									<input type="radio" name="cline_apc_chrome" value="card" />
									<span>
										<span class="cline-apc-chrome-option__title">Card only</span>
										<span class="cline-apc-chrome-option__desc">Workbench card only — no header and no background.</span>
									</span>
								</label>
							</div>
						</div>

						<div class="cline-apc-field cline-apc-checks">
							<label>
								<input type="checkbox" id="cline_apc_start" value="1" checked />
								Open at workbench (<code>start="1"</code>)
							</label>
							<p class="description">Recommended for eligibility. Skips the Tap to Start intro card.</p>
						</div>

						<div class="cline-apc-field">
							<label for="cline_apc_source">Source / campaign label</label>
							<input id="cline_apc_source" type="text" placeholder="header-popup" />
							<p class="description">Optional. Appears on attorney lead emails.</p>
						</div>

						<div class="cline-apc-field cline-apc-checks">
							<label>
								<input type="checkbox" id="cline_apc_fill" value="1" />
								Fill browser height (<code>fill="1"</code>)
							</label>
							<p class="description">Sizes the iframe to ~92% of the visitor viewport. Best match for full-page tool height on WordPress.</p>
						</div>

						<div class="cline-apc-field">
							<label for="cline_apc_height">Initial height (px)</label>
							<input id="cline_apc_height" type="number" min="480" step="1" placeholder="720" />
							<p class="description">Optional when not using fill. Tools default to 720px and grow via postMessage. Avoid 480 unless the column is narrow.</p>
						</div>

						<div class="cline-apc-field">
							<label for="cline_apc_title">iframe title</label>
							<input id="cline_apc_title" type="text" placeholder="Accessibility title" />
						</div>

						<div class="cline-apc-field">
							<label for="cline_apc_class">CSS class</label>
							<input id="cline_apc_class" type="text" />
						</div>

						<div class="cline-apc-field">
							<label for="cline_apc_dom_id">HTML id</label>
							<input id="cline_apc_dom_id" type="text" />
						</div>
					</div>

					<div class="cline-apc-panel">
						<h2>Shortcode</h2>
						<div class="cline-apc-preview">
							<div id="cline_apc_preview_frame" class="cline-apc-preview__frame" data-chrome="full">
								<div class="cline-apc-preview__card" aria-hidden="true"></div>
							</div>
						</div>
						<div class="cline-apc-output">
							<code id="cline_apc_shortcode_output">[cline_eligibility start="1"]</code>
							<button type="button" class="button button-primary" id="cline_apc_copy">Copy shortcode</button>
						</div>
						<p class="description">Existing aliases still work: <code>[cline_form]</code>, <code>[cline_buyback]</code>, <code>[cline_checklist]</code>, <code>[cline_tool tool="…"]</code>.</p>
					</div>
				</div>
			</div>

			<div class="cline-apc-tab-panel" data-cline-tab-panel="updates" hidden>
				<?php $update_probe = self::update_probe(true); ?>
				<div class="cline-apc-panel">
					<h2>Plugin updates</h2>
					<p>Updates download automatically from <code><?php echo esc_html(self::origin()); ?>/wordpress/cline-apc-tools.json</code>. No manual zip upload after each release.</p>
					<p><strong>Installed version:</strong> <?php echo esc_html(CLINE_APC_TOOLS_VERSION); ?></p>
					<table class="widefat striped" style="max-width:42rem;margin:1rem 0">
						<tbody>
							<tr>
								<th scope="row">Tools host version</th>
								<td>
									<?php if ($update_probe['ok'] && $update_probe['remote_version'] !== null) : ?>
										<code><?php echo esc_html($update_probe['remote_version']); ?></code>
									<?php else : ?>
										<span style="color:#b32d2e">Unavailable</span>
									<?php endif; ?>
								</td>
							</tr>
							<tr>
								<th scope="row">Update available</th>
								<td><?php echo $update_probe['update_available'] ? 'Yes' : 'No'; ?></td>
							</tr>
							<?php if (! $update_probe['ok'] && $update_probe['error'] !== null) : ?>
								<tr>
									<th scope="row">Last check error</th>
									<td><?php echo esc_html($update_probe['error']); ?></td>
								</tr>
							<?php endif; ?>
						</tbody>
					</table>
					<p>
						<a class="button button-primary" href="<?php echo esc_url(admin_url('update-core.php?force-check=1')); ?>">Check for updates now</a>
					</p>
					<?php if ($update_probe['ok'] && $update_probe['update_available']) : ?>
						<div class="cline-apc-notice" style="border-left-color:#dba617;background:#fcf9e8;">
							<p><strong>Update ready:</strong> open <em>Dashboard → Updates</em> and click <em>Update now</em> for CLINE APC Tools <?php echo esc_html((string) $update_probe['remote_version']); ?>.</p>
						</div>
					<?php endif; ?>
					<div class="cline-apc-notice" style="border-left-color:#dba617;background:#fcf9e8;">
						<p><strong>Still on 1.0.0?</strong> That release has no update checker. Install once from <a href="<?php echo esc_url(self::origin() . '/wordpress/cline-apc-tools.zip'); ?>">the published tools-host zip</a> (Plugins → Add New → Upload Plugin, or replace the plugin folder). After 1.0.1+, <em>Dashboard → Updates</em> handles later versions.</p>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	public static function render_settings(): void {
		if (! current_user_can('manage_options')) {
			return;
		}
		?>
		<div class="wrap cline-apc-admin">
			<h1>CLINE APC Tools — Settings</h1>
			<form action="options.php" method="post">
				<?php settings_fields('cline_apc_tools'); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="cline_apc_tools_origin">Tools origin</label></th>
						<td>
							<input
								id="cline_apc_tools_origin"
								name="cline_apc_tools_origin"
								type="url"
								class="regular-text"
								value="<?php echo esc_attr(self::origin()); ?>"
								placeholder="<?php echo esc_attr(CLINE_APC_TOOLS_DEFAULT_ORIGIN); ?>"
							/>
							<p class="description">Vercel app that hosts the iframes (no trailing slash).</p>
						</td>
					</tr>
				</table>
				<?php submit_button(); ?>
			</form>
			<p><a href="<?php echo esc_url(admin_url('admin.php?page=cline-apc-tools')); ?>">← Back to Embed Builder</a></p>
		</div>
		<?php
	}

	/**
	 * @param array<string, string>|string $atts
	 */
	public static function shortcode_tool($atts): string {
		$atts = shortcode_atts(
			array(
				'tool'   => 'case-review',
				'height' => '',
				'title'  => '',
				'source' => '',
				'start'  => '',
				'chrome' => '',
				'fill'   => '',
				'class'  => '',
				'id'     => '',
			),
			is_array($atts) ? $atts : array(),
			'cline_tool'
		);
		return self::mount($atts['tool'], $atts);
	}

	/**
	 * @param array<string, string>|string $atts
	 */
	public static function shortcode_form($atts): string {
		return self::mount('case-review', is_array($atts) ? $atts : array());
	}

	/**
	 * @param array<string, string>|string $atts
	 */
	public static function shortcode_eligibility($atts): string {
		$atts = is_array($atts) ? $atts : array();
		if (! array_key_exists('start', $atts)) {
			$atts['start'] = '1';
		}
		return self::mount('eligibility-checker', $atts);
	}

	/**
	 * @param array<string, string>|string $atts
	 */
	public static function shortcode_buyback($atts): string {
		return self::mount('buyback-calculator', is_array($atts) ? $atts : array());
	}

	/**
	 * @param array<string, string>|string $atts
	 */
	public static function shortcode_checklist($atts): string {
		return self::mount('documentation-checklist', is_array($atts) ? $atts : array());
	}

	/**
	 * @param array<string, string> $atts
	 */
	private static function mount(string $kind, array $atts): string {
		$atts = shortcode_atts(
			array(
				'height' => '',
				'title'  => '',
				'source' => '',
				'start'  => '',
				'chrome' => '',
				'fill'   => '',
				'class'  => '',
				'id'     => '',
			),
			$atts
		);

		$key = sanitize_key($kind);
		if (! isset(self::KINDS[ $key ])) {
			return '<!-- CLINE APC: unknown embed "' . esc_html($kind) . '" -->';
		}
		$tool = self::KINDS[ $key ];

		$height = absint($atts['height']);
		if ($height <= 0) {
			$height = self::HEIGHTS[ $tool ];
		}

		$title = is_string($atts['title']) ? trim($atts['title']) : '';
		if ($title === '') {
			$title = self::TITLES[ $tool ];
		}

		$source = sanitize_text_field($atts['source']);
		$fill   = in_array($atts['fill'], array( '1', 'true', 'full', 'viewport' ), true);
		$chrome = sanitize_key($atts['chrome']);
		if (! in_array($chrome, self::CHROME, true) || $chrome === 'full') {
			$chrome = '';
		}
		$startOff = $atts['start'] === '0' || $atts['start'] === 'false';
		$start    = $atts['start'] === '1' || $atts['start'] === 'true' ? '1' : '';
		if ($chrome === 'card' && ! $startOff) {
			$start = '1';
		}
		$id     = sanitize_html_class($atts['id']);
		$class  = trim('cline-apc-embed ' . sanitize_html_class($atts['class']));

		$html  = '<div';
		$html .= ' class="' . esc_attr($class) . '"';
		if ($id !== '') {
			$html .= ' id="' . esc_attr($id) . '"';
		}
		$html .= ' data-cline-tool="' . esc_attr($tool) . '"';
		$html .= ' data-cline-title="' . esc_attr($title) . '"';
		if ($fill) {
			$html .= ' data-cline-fill="1"';
		} else {
			$html .= ' data-cline-height="' . esc_attr((string) $height) . '"';
		}
		if ($source !== '') {
			$html .= ' data-cline-source="' . esc_attr($source) . '"';
		}
		if ($start !== '') {
			$html .= ' data-cline-start="1"';
		}
		if ($chrome !== '') {
			$html .= ' data-cline-chrome="' . esc_attr($chrome) . '"';
		}
		if ($fill) {
			$html .= ' style="min-height:min(720px,92vh)"';
		} else {
			$html .= ' style="min-height:' . esc_attr((string) $height) . 'px;width:100%"';
		}
		$html .= '></div>';

		return $html;
	}
}

Cline_APC_Tools::init();
