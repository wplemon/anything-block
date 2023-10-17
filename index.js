const { __ } = wp.i18n;
const { Component } = wp.element;
const { Spinner, withAPIData } = wp.components;
const { InspectorControls } = wp.editor;
const ServerSideRender = wp.serverSideRender;
const { Fragment } = wp.element;
const {
	registerBlockType,
} = wp.blocks;

const {
	PanelBody,
	TextControl,
	TextareaControl,
} = wp.components;

registerBlockType(
	'wplemon/anything',
	{
		title: __( 'Anything', 'anything-block' ),
		description: __( 'Print any kind of data, any way you want it.', 'anything-block' ),
		category: 'widgets',
		keywords: [
			__( 'Options', 'anything-block' ),
			__( 'Settings', 'anything-block' ),
			__( 'Post Meta', 'anything-block' ),
			__( 'Theme Mod', 'anything-block' ),
		],
		attributes: {
			htmlData: {
				type: 'text',
			},
			dataSourceName: { type: 'string' }, // Backwards-compatibility.
			dataSource: { type: 'string' }, // Backwards-compatibility.
		},
		edit: props => {
			const { setAttributes } = props;
			const {
				attributes: {
					dataSourceName,
					htmlData,
					dataSource
				}
			} = props;

			// Backwards-compatibility.
			if ( dataSource && '' !== dataSource ) {
				if ( dataSourceName && '' !== dataSourceName ) {
					props.attributes.htmlData = props.attributes.htmlData.replace( '{data}', '{data.' + dataSource + '.' + props.attributes.dataSourceName + '}' )
				} else {
					props.attributes.htmlData = props.attributes.htmlData.replace( '{data.', '{data.' + dataSource + '.' );
				}
			}

			return (
				<Fragment>
					<InspectorControls>
						<PanelBody>
							<TextareaControl
								label={ __( 'Output HTML', 'anything-block' ) }
								help={ __( 'HTML used to format the output. Use brackets {} to wrap the data. Example: {data}. If the value is an array, use a dot to get sub-item. Example: {data.item1}, {data.item2}', 'anything-block' ) }
								value={ htmlData }
								onChange={ htmlData => setAttributes( { htmlData } ) }
							/>
						</PanelBody>
					</InspectorControls>

					<ServerSideRender
						block="wplemon/anything"
						attributes={{
							dataSource,
							dataSourceName,
							htmlData
						}}
					/>
				</Fragment>
			);
		},
		save() {
			return null; // Rendering in PHP.
		}
	},
);
