document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let rectX = 50, rectY = 150; // Startposities voor rechthoek
    let circleRadius = 30; // Startgrootte voor cirkel
    let triangleRotation = 0; // Rotatiehoek voor driehoek

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Lijn die van kleur verandert met de tijd
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.strokeStyle = `hsl(${Date.now() % 360}, 100%, 50%)`; // HSL voor kleurrotatie
        ctx.stroke();

        // Driehoek die roteert op basis van muislocatie
        ctx.save();
        ctx.translate(150, 75); // Verplaatst rotatiepunt naar midden van driehoek
        ctx.rotate(triangleRotation);
        ctx.beginPath();
        ctx.moveTo(-50, 50);
        ctx.lineTo(0, -50);
        ctx.lineTo(50, 50);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.restore();

        // Rechthoek die verticaal en horizontaal beweegt
        ctx.fillStyle = 'green';
        ctx.fillRect(rectX, rectY, 100, 50);

        // Automatische horizontale beweging
        rectX += 1;
        if (rectX > canvas.width) rectX = -100; // Herstel positie naar links als het canvas verlaten wordt

        // Cirkel die in grootte verandert
        ctx.beginPath();
        ctx.arc(400, 300, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'purple';
        ctx.fill();
        circleRadius += 0.5;
        if (circleRadius > 50) circleRadius = 10;

        requestAnimationFrame(draw);
    }

    function handleInput(event) {
        switch (event.key) {
            case 'ArrowRight':
                rectX += 10;
                break;
            case 'ArrowLeft':
                rectX -= 10;
                break;
            case 'ArrowUp':
                rectY -= 10;
                break;
            case 'ArrowDown':
                rectY += 10;
                break;
        }
    }

    function handleMouse(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const centerX = 150;
        const centerY = 75;
        triangleRotation = Math.atan2(mouseY - centerY, mouseX - centerX);
    }

    // Voeg toetsenbordinvoer toe
    window.addEventListener('keydown', handleInput);

    // Voeg muisbeweging toe voor rotatie van de driehoek
    canvas.addEventListener('mousemove', handleMouse);

    // Start de animatie
    draw();
});
