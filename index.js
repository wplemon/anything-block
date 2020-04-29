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
	SelectControl
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
			dataSourceName: {
				type: 'string',
			},
			htmlData: {
				type: 'text',
			},
			dataSource: {
				type: 'string',
			},
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
console.log( props );
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody>
							<SelectControl
								label={ __( 'Data Source', 'anything-block' ) }
								value={ dataSource }
								options={[
									{ value: 'anything', label: __( 'Anything', 'anything-block' ) },
									{ value: 'setting', label: __( 'Setting', 'anything-block' ) },
									{ value: 'themeMod', label: __( 'Theme Mod', 'anything-block' ) },
									{ value: 'postMeta', label: __( 'Post Meta', 'anything-block' ) },
								]}
								onChange={ dataSource => setAttributes( { dataSource } ) }
							/>

							{ 'anything' !== props.attributes.dataSource &&
								<TextControl
									label={ __( 'Option Name', 'anything-block' ) }
									help={ __( 'Type the name of the option, post-meta, theme-mod etc.', 'anything-block' ) }
									value={ dataSourceName }
									onChange={ dataSourceName => setAttributes( { dataSourceName } ) }
								/>
							}
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
