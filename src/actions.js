module.exports = {
	initActions: function () {
		let self = this;
		let actions = {};
		
		actions.power = {
			name: 'Power',
			options: [
				{
					type: 'dropdown',
					label: 'state',
					id: 'powerAction',
					default: 'POWERT',
					choices: [
						{ id: 'POWERT', label: 'Power On/Off' }
					]
				}
			],
			callback: async function (action) {
				if (action.options.powerAction == 'POWERT') {
					self.sendCommand('KEY=01');
				}
			}
		};
		
		actions.source = {
			name: 'Source Select',
			options: [
				{
					type: 'dropdown',
					label: 'source',
					id: 'sourceId',
					default: 'F2',
					choices: [
						{ id: 'F2', label: 'HDMI' },
						{ id: 'F2', label: 'HDBaseT' },
						{ id: 'F1', label: 'DVI-D' },
						{ id: 'F2', label: 'SDI' },
						{ id: 'F1', label: 'VGA' },
						{ id: 'F1', label: 'BNC' }
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('SOURCE=' + action.options.sourceId);
			}
		};
		
		actions.audioVideoMute = {
			name: 'Audio/Video Mute (Shutter)',
			options: [
				{
					type: 'dropdown',
					label: 'av mute',
					id: 'avMuteAction',
					default: '3E',
					choices: [
						{ id: '3E', label: 'Toggle A/V Mute' }
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('KEY=' + action.options.avMuteAction);
			}
		};
		
		actions.freeze = {
			name: 'Freeze',
			options: [
				{
					type: 'dropdown',
					label: 'freeze',
					id: 'freezeAction',
					default: '47',
					choices: [
						{ id: '47', label: 'Toggle Freeze' }
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('KEY=' + action.options.freezeAction);
			}
		};
		
		actions.brightness = {
			name: 'Brightness',
			options: [
				{
					type: 'number',
					label: 'brightness (30-100)',
					id: 'brightness',
					min: 30,
					max: 100,
					required: true
				}
			],
			callback: async function (action) {
				self.sendCommand('_OSD_IMLUMLEVEL=' + action.options.brightness);
			}
		};
		
		actions.fadeTime = {
			name: 'Fade Time for A/V Mute',
			options: [
				{
					type: 'number',
					label: 'fade in time (0-10s)',
					id: 'fadeIn',
					min: 0,
					max: 10,
					required: false
				},
				{
					type: 'number',
					label: 'fade out time (0-10s)',
					id: 'fadeOut',
					min: 0,
					max: 10,
					required: false
				}
			],
			callback: async function (action) {
				const fadeInTime = action.options.fadeIn * 20
				const fadeOutTime = action.options.fadeOut * 20

				if (fadeInTime) {
					self.sendCommand('FADEIN=' + fadeInTime + (fadeOutTime ? ('&FADEOUT=' + fadeOutTime) : ''));
				}
				else if (fadeOutTime) {
					self.sendCommand('FADEOUT=' + fadeOutTime);
				}
			}
		};
		
		actions.testPattern = {
			name: 'Show Test Pattern',
			options: [
				{
					type: 'dropdown',
					label: 'test pattern',
					id: 'patternId',
					default: '2002',
					choices: [
						{ id: '2002', label: 'Standard' },
						{ id: '2003', label: 'Cross-hatching' },
						{ id: '200D', label: 'Cross-hatching R' },
						{ id: '200E', label: 'Cross-hatching G' },
						{ id: '200F', label: 'Cross-hatching B' },
						{ id: '2004', label: 'Color Bars V' },
						{ id: '2010', label: 'Color Bars H' },
						{ id: '2005', label: 'Grayscale' },
						{ id: '2012', label: 'Gray Bars V' },
						{ id: '2013', label: 'Gray Bars H' },
						{ id: '200B', label: 'Checkerboard 1' },
						{ id: '200C', label: 'Checkerboard 2' },
						{ id: '2006', label: 'White' },
						{ id: '2011', label: 'Black' },
						{ id: '2014', label: 'Aspect Frame' },
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('TESTPATTERN=01%' + action.options.patternId);
			}
		};
		
		actions.hideTestPattern = {
			name: 'Hide Test Pattern',
			options: [],
			callback: async function (action) {
				self.sendCommand('TESTPATTERN=00');
			}
		};
		
		actions.loadLensPosition = {
			name: 'Load Lens Position',
			options: [
				{
					type: 'dropdown',
					label: 'slot',
					id: 'loadSlot',
					default: '01',
					choices: [
						{ id: '01', label: '1' },
						{ id: '02', label: '2' },
						{ id: '03', label: '3' },
						{ id: '04', label: '4' },
						{ id: '05', label: '5' },
						{ id: '06', label: '6' },
						{ id: '07', label: '7' },
						{ id: '08', label: '8' },
						{ id: '09', label: '9' },
						{ id: '0A', label: '10' }
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('POPLP=' + action.options.loadSlot);
			}
		};
		
		actions.saveLensPosition = {
			name: 'Save Lens Position',
			options: [
				{
					type: 'dropdown',
					label: 'slot',
					id: 'loadSlot',
					default: '01',
					choices: [
						{ id: '01', label: '1' },
						{ id: '02', label: '2' },
						{ id: '03', label: '3' },
						{ id: '04', label: '4' },
						{ id: '05', label: '5' },
						{ id: '06', label: '6' },
						{ id: '07', label: '7' },
						{ id: '08', label: '8' },
						{ id: '09', label: '9' },
						{ id: '0A', label: '10' }
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('PUSHLP=' + action.options.loadSlot);
			}
		};
		
		actions.focusAction = {
			name: 'Focus the Lens',
			options: [
				{
					type: 'dropdown',
					label: 'focus',
					id: 'focusAction',
					default: 'DEC',
					choices: [
						{ id: 'DEC', label: 'Near - Minus' },
						{ id: 'INC', label: 'Far - Plus' },
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('FOCUS=' + action.options.focusAction);
			}
		};
		
		actions.zoomAction = {
			name: 'Zoom the Lens',
			options: [
				{
					type: 'dropdown',
					label: 'zoom',
					id: 'zoomAction',
					default: 'INC',
					choices: [
						{ id: 'INC', label: 'Zoom in' },
						{ id: 'DEC', label: 'Zoom out' },
					]
				}
			],
			callback: async function (action) {
				self.sendCommand('ZOOM=' + action.options.zoomAction);
			}
		};
		
		actions.shiftAction = {
			name: 'Shift the Lens',
			options: [
				{
					type: 'dropdown',
					label: 'shift',
					id: 'shiftAction',
					default: '0',
					choices: [
						{ id: '0', label: 'Up' },
						{ id: '1', label: 'Down' },
						{ id: '2', label: 'Left' },
						{ id: '3', label: 'Right' },
					]
				}
			],
			callback: async function (action) {
				let shiftAction = action.options.shiftAction;
				if (shiftAction == '0') {
					self.sendCommand('LENS=INC');
				}
				else if (shiftAction == '1') {
					self.sendCommand('LENS=DEC');
				}
				else if (shiftAction == '2') {
					self.sendCommand('HLENS=DEC');
				}
				else if (shiftAction == '3') {
					self.sendCommand('HLENS=INC');
				}
			}
		};

		self.setActionDefinitions(actions);
	}
}
