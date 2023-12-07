import { useEffect, useRef } from 'react';

export default function Canvas({ className }) {
    const canvasElem = useRef();

    useEffect(() => {
        if (!canvasElem || !canvasElem.current) return;

        const ctx = canvasElem.current.getContext('2d', { alpha: false });

        let width = 0, height = 0;
        let currentFrame;
        let cameraX = 0, cameraY = 0, isPanning = false;

        const render = () => {
            const gridSpacing = 48 * window.devicePixelRatio;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Background
            ctx.beginPath();
            ctx.fillStyle = '#171717';
            ctx.rect(0, 0, width, height);
            ctx.fill();

            for (let x = cameraX % gridSpacing; x < width; x += gridSpacing) {
                ctx.beginPath();
                ctx.strokeStyle = '#262626';
                ctx.lineWidth = window.devicePixelRatio;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            for (let y = cameraY % gridSpacing; y < height; y += gridSpacing) {
                ctx.beginPath();
                ctx.strokeStyle = '#262626';
                ctx.lineWidth = window.devicePixelRatio;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            for (let x = cameraX % gridSpacing; x < width; x += gridSpacing) {
                for (let y = cameraY % gridSpacing; y < height; y += gridSpacing) {
                    ctx.beginPath();
                    ctx.fillStyle = '#404040';
                    ctx.strokeStyle = '#171717';
                    ctx.lineWidth = 4 * window.devicePixelRatio;
                    ctx.rect(x - 3 * window.devicePixelRatio, y - 3 * window.devicePixelRatio, 6 * window.devicePixelRatio, 6 * window.devicePixelRatio);
                    ctx.fill();
                    ctx.stroke();
                }
            }

            currentFrame = requestAnimationFrame(render);
        };

        const onResize = () => {
            const parentDimensions = canvasElem.current.parentElement.getBoundingClientRect();

            width = parentDimensions.width * window.devicePixelRatio;
            height = parentDimensions.height * window.devicePixelRatio;

            canvasElem.current.width = width;
            canvasElem.current.height = height;
        };

        const onMouseDown = () => {
            isPanning = true;
        };

        const onMouseMove = (event) => {
            if (!isPanning) return;

            console.log(event);

            cameraX += event.movementX * window.devicePixelRatio;
            cameraY += event.movementY * window.devicePixelRatio;
        };

        const onMouseUp = () => {
            isPanning = false;
        };

        onResize();
        render();

        const parentResizeObserver = new ResizeObserver(onResize);
        parentResizeObserver.observe(canvasElem.current.parentElement);

        canvasElem.current.addEventListener('mousedown', onMouseDown);
        canvasElem.current.addEventListener('mousemove', onMouseMove);
        canvasElem.current.addEventListener('mouseup', onMouseUp);

        return () => {
            parentResizeObserver.disconnect();

            cancelAnimationFrame(currentFrame);

            canvasElem.current.removeEventListener('mousedown', onMouseDown);
            canvasElem.current.removeEventListener('mousemove', onMouseMove);
            canvasElem.current.removeEventListener('mouseup', onMouseUp);
        };
    }, [canvasElem]);

    return (
        <canvas className={className} ref={canvasElem} />
    );
}