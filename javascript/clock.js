//|==============================================================|
// Made by IntSPstudio
// Project Visual Street
// ID: 450005003
//
// Clock implementation inspired by a W3Schools canvas example
//|==============================================================|
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("theClockCanvas");
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // ini
        ctx.scale(dpr, dpr);
    }
    function drawClock() {
        const now = new Date();
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const r = Math.min(w, h) / 2 * 0.9;
        const cx = w / 2;
        const cy = h / 2;
        //INI
        ctx.clearRect(0, 0, w, h);
        //WATCH BACKGROUND
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#0066ff5b";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        //HOURS
        for (let i = 1; i <= 12; i++) {
            const angle = (i * Math.PI / 6) - Math.PI / 2;
            const x = cx + Math.cos(angle) * r * 0.8;
            const y = cy + Math.sin(angle) * r * 0.8;
            ctx.fillStyle = "#fff";
            ctx.font = `${r*0.15}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(i, x, y);
        }
        const sec = now.getSeconds() + now.getMilliseconds()/1000;
        const min = now.getMinutes() + sec/60;
        const hour = now.getHours()%12 + min/60;
        // HOURS
        drawHand(cx, cy, hour * Math.PI/6 - Math.PI/2, r*0.5, 6, "#fff");
        // MINUTES
        drawHand(cx, cy, min * Math.PI/30 - Math.PI/2, r*0.7, 4, "#fff");
        // SECONDS
        drawHand(cx, cy, sec * Math.PI/30 - Math.PI/2, r*0.85, 2, "#ff0000");
        requestAnimationFrame(drawClock);
    }
    function drawHand(cx, cy, angle, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle)*length, cy + Math.sin(angle)*length);
        ctx.stroke();
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawClock();
});