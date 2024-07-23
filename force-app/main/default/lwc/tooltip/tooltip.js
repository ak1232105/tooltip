import { LightningElement, api, track } from 'lwc';

export default class Tooltip extends LightningElement {
    @api text; // Text to be displayed in the tooltip
    @api position = 'top'; // Default position of the tooltip: top, bottom, left, right

    @track tooltipStyle = 'display: none;';
    @track arrowStyle = 'display: none;';

    showTooltip(event) {
        const tooltip = this.template.querySelector('.tooltiptext');
        const container = this.template.host.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Set initial style
        this.tooltipStyle = 'display: block; visibility: hidden;';
        this.arrowStyle = 'display: block;';

        // Wait for rendering
        window.requestAnimationFrame(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            let tooltipPositionStyle;
            let arrowPositionStyle;
            let adjustedPosition = this.position;

            // Check and adjust for overflow
            if (adjustedPosition === 'bottom' && tooltipRect.bottom > screenHeight) {
                adjustedPosition = 'top';
            } else if (adjustedPosition === 'top' && tooltipRect.top < 0) {
                adjustedPosition = 'bottom';
            }

            if (adjustedPosition === 'right' && tooltipRect.right > screenWidth) {
                adjustedPosition = 'left';
            } else if (adjustedPosition === 'left' && tooltipRect.left < 0) {
                adjustedPosition = 'right';
            }

            switch (adjustedPosition) {
                case 'top':
                    tooltipPositionStyle = `bottom: ${container.height + 20}px; left: 50%; transform: translateX(-50%);`;
                    arrowPositionStyle = `bottom: -10px; left: 50%; transform: translateX(-50%); border-width: 10px 10px 0 10px; border-color: black transparent transparent transparent; border-style: solid;`;
                    break;
                case 'bottom':
                    tooltipPositionStyle = `top: ${container.height + 20}px; left: 50%; transform: translateX(-50%);`;
                    arrowPositionStyle = `top: -10px; left: 50%; transform: translateX(-50%); border-width: 0 10px 10px 10px; border-color: transparent transparent black transparent; border-style: solid;`;
                    break;
                case 'left':
                    tooltipPositionStyle = `top: 50%; right: ${container.width + 15}px; transform: translateY(-50%);`;
                    arrowPositionStyle = `top: 50%; right: -10px; transform: translateY(-50%); border-width: 10px 10px 10px 0; border-color: transparent black transparent transparent; border-style: solid;`;
                    break;
                case 'right':
                    tooltipPositionStyle = `top: 50%; left: ${container.width + 15}px; transform: translateY(-50%);`;
                    arrowPositionStyle = `top: 50%; left: -10px; transform: translateY(-50%); border-width: 10px 0 10px 10px; border-color: transparent transparent transparent black; border-style: solid;`;
                    break;
                default:
                    tooltipPositionStyle = `bottom: ${container.height + 15}px; left: 50%; transform: translateX(-50%);`;
                    arrowPositionStyle = `bottom: -10px; left: 50%; transform: translateX(-50%); border-width: 10px 10px 0 10px; border-color: black transparent transparent transparent; border-style: solid;`;
            }

            // Adjust styles based on new position
            this.tooltipStyle = `${tooltipPositionStyle} display: block; z-index: 1000; visibility: visible;`;
            this.arrowStyle = arrowPositionStyle;
        });
    }

    hideTooltip() {
        this.tooltipStyle = 'display: none;';
        this.arrowStyle = 'display: none;';
    }
}
