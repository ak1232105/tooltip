import { LightningElement, api, track } from 'lwc';

export default class Tooltip extends LightningElement {
    @api text; // Text to be displayed in the tooltip
    @api position = 'top'; // Default position of the tooltip: top, bottom, left, right

    @track tooltipStyle = 'display: none;';

    showTooltip(event) {
        const tooltip = this.template.querySelector('.tooltiptext');
        const container = this.template.host.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Set initial style
        this.tooltipStyle = 'display: block; visibility: hidden;';

        // Wait for rendering
        window.requestAnimationFrame(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            let tooltipPositionStyle;

            switch (this.position) {
                case 'top':
                    tooltipPositionStyle = `bottom: ${container.height}px; left: 50%; transform: translateX(-50%);`;
                    break;
                case 'bottom':
                    tooltipPositionStyle = `top: ${container.height}px; left: 50%; transform: translateX(-50%);`;
                    break;
                case 'left':
                    tooltipPositionStyle = `top: 50%; right: ${container.width}px; transform: translateY(-50%);`;
                    break;
                case 'right':
                    tooltipPositionStyle = `top: 50%; left: ${container.width}px; transform: translateY(-50%);`;
                    break;
                default:
                    tooltipPositionStyle = `bottom: ${container.height}px; left: 50%; transform: translateX(-50%);`;
            }

            // Check for overflow and adjust position
            if (this.position === 'top' || this.position === 'bottom') {
                if (tooltipRect.left < 0) {
                    tooltipPositionStyle = `top: ${this.position === 'top' ? `-${container.height}px` : `${container.height}px`}; left: 0; transform: translateX(0);`;
                } else if (tooltipRect.right > screenWidth) {
                    tooltipPositionStyle = `top: ${this.position === 'top' ? `-${container.height}px` : `${container.height}px`}; right: 0; transform: translateX(0);`;
                }
                // Adjust vertical position
                if (this.position === 'top') {
                    tooltipPositionStyle = `bottom: ${container.height + 5}px; left: 50%; transform: translateX(-50%);`;
                } else if (this.position === 'bottom') {
                    tooltipPositionStyle = `top: ${container.height + 5}px; left: 50%; transform: translateX(-50%);`;
                }
            } else if (this.position === 'left' || this.position === 'right') {
                if (tooltipRect.top < 0) {
                    tooltipPositionStyle = `top: 0; ${this.position}: ${container.width}px; transform: translateY(0);`;
                } else if (tooltipRect.bottom > screenHeight) {
                    tooltipPositionStyle = `bottom: 0; ${this.position}: ${container.width}px; transform: translateY(0);`;
                }
                // Additional check for right overflow
                if (this.position === 'right' && tooltipRect.right > screenWidth) {
                    tooltipPositionStyle = `top: 50%; right: ${container.width}px; transform: translateY(-50%);`;
                } else if (this.position === 'left' && tooltipRect.left < 0) {
                    tooltipPositionStyle = `top: 50%; left: ${container.width}px; transform: translateY(-50%);`;
                }
            }

            this.tooltipStyle = `${tooltipPositionStyle} display: block; z-index: 1000; visibility: visible;`;
        });
    }

    hideTooltip() {
        this.tooltipStyle = 'display: none;';
    }
}
