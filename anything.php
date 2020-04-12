<?php
/**
 * Plugin Name: Anything Block
 * Plugin URI:  https://wplemon.com
 * Author:      Ari Stathopoulos
 * Author URI:  http://aristath.github.io
 * Version:     1.0.0
 * Description: Print any kind of data, any way you want it.
 * Text Domain: anything-block
 *
 * @package   anything-block
 * @category  Core
 * @author    Ari Stathopoulos
 * @copyright Copyright (c) 2020, Ari Stathopoulos
 * @license   https://opensource.org/licenses/MIT
 * @since     1.0.0
 */

/**
 * Register the block.
 *
 * @since 1.0.0
 * @return void
 */
function wplemon_anything_block_init() {
	wp_register_script(
		'anything-block',
		plugins_url( 'block.js', __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-server-side-render', 'wp-data' ],
		filemtime( __DIR__ . '/block.js' ),
		false
	);

	register_block_type(
		'wplemon/anything',
		[
			'attributes'      => [
				'dataSourceName' => [
					'type'    => 'text',
					'default' => '',
				],
				'htmlData'       => [
					'type'    => 'text',
					'default' => '{data}',
				],
				'dataSource'     => [
					'type'    => 'text',
					'default' => 'setting',
				],
			],
			'editor_script'   => 'anything-block',
			'render_callback' => 'wplemon_anything_block_render_callback',
		]
	);
}

/**
 * Render callback for dynamic block.
 *
 * @since 1.0.0
 * @param array  $atts The block attributes.
 * @param string $content The block content.
 * @return string
 */
function wplemon_anything_block_render_callback( $atts, $content ) {
	if ( ! isset( $atts['dataSource'] ) || ! isset( $atts['htmlData'] ) ) {
		return '';
	}

	$value = '';
	$html  = $atts['htmlData'];
	switch ( $atts['dataSource'] ) {
		case 'setting':
		case 'option':
			$value = wp_load_alloptions();
			if ( isset( $atts['dataSourceName'] ) && ! empty( $atts['dataSourceName'] ) ) {
				$value = get_option( $atts['dataSourceName'] );
			}
			break;

		case 'themeMod':
			$value = get_theme_mods();
			if ( isset( $atts['dataSourceName'] ) && ! empty( $atts['dataSourceName'] ) ) {
				$value = get_option( $atts['dataSourceName'] );
			}
			break;

		case 'postMeta':
			$value = get_post_meta( get_the_ID() );
			if ( isset( $atts['dataSourceName'] ) && ! empty( $atts['dataSourceName'] ) ) {
				$value = get_post_meta( get_the_ID(), $atts['dataSourceName'] );
			}
			break;
	}

	if ( is_array( $value ) ) {
		foreach ( $value as $key => $val ) {
			$val = maybe_unserialize( $val );
			if ( is_string( $val ) || is_numeric( $val ) ) {
				$html = str_replace( "{data.{$key}}", $val, $html );
			} else {
				foreach ( $val as $sub_key => $sub_val ) {
					$sub_val = maybe_unserialize( $sub_val );
					if ( is_string( $sub_val ) || is_numeric( $sub_val ) ) {
						$html = str_replace( "{data.{$key}.{$sub_key}", $sub_val, $html );
					}
				}
			}
		}
	} else {
		$html = str_replace( '{data}', $value, $html );
	}
	return $html;
}

add_action( 'init', 'wplemon_anything_block_init' );
