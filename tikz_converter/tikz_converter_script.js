const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rectangleIcon = document.getElementById('rectangle-icon');
// const lineIcon = document.getElementById('line-icon');
const polygonIcon = document.getElementById('polygon-icon');
const circleIcon = document.getElementById('circle-icon');
const pointIcon = document.getElementById('point-icon');
const exportButton = document.getElementById('export-button');
const resetButton = document.getElementById('reset-button');
const undoButton = document.getElementById('undo-button');
const a3Button = document.getElementById('a3-button');
const a4Button = document.getElementById('a4-button');
const a5Button = document.getElementById('a5-button');

const usLetterButton = document.getElementById('usletter-button');
const usLegalButton = document.getElementById('uslegal-button');
const usTabButton = document.getElementById('ustab-button');
const tikzCodeTextarea = document.getElementById('tikz-code');
let drawing = false;
let startX, startY;
let currentTool = null;
let isDrawingPolygon = false;
let currentPolygon = [];
let polygons = [];
let rectangles = [];
// let lines = [];
let circles = [];
let points = [];
let tikzCommands = [];
let paperSize = 'a4paper';
let gridSize = 20;

// Augmenter légèrement la largeur du canvas
canvas.width = 600;

rectangleIcon.addEventListener('click', () => {
    currentTool = 'rectangle';
});

// lineIcon.addEventListener('click', () => {
//     currentTool = 'line';
// });

polygonIcon.addEventListener('click', () => {
    currentTool = 'polygon';
    currentPolygon = [];
    isDrawingPolygon = false;
});

circleIcon.addEventListener('click', () => {
    currentTool = 'circle';
});

pointIcon.addEventListener('click', () => {
    currentTool = 'point';
});

canvas.addEventListener('mousedown', (e) => {
    if (currentTool) {
        drawing = true;
        startX = snapToGrid(e.offsetX);
        startY = snapToGrid(e.offsetY);
    }
    if (currentTool === 'polygon') {
        const x = snapToGrid(e.offsetX);
        const y = snapToGrid(e.offsetY);
        if (!isDrawingPolygon) {
            isDrawingPolygon = true;
            currentPolygon.push({ x, y });
        } else {
            currentPolygon.push({ x, y });
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawShapes();
            drawCurrentPolygon();
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (currentTool === 'polygon' && isDrawingPolygon) {
        const x = snapToGrid(e.offsetX);
        const y = snapToGrid(e.offsetY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawShapes();
        drawCurrentPolygon();
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(currentPolygon[currentPolygon.length - 1].x, currentPolygon[currentPolygon.length - 1].y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});


canvas.addEventListener('mousemove', (e) => {
    if (drawing && currentTool) {
        const endX = snapToGrid(e.offsetX);
        const endY = snapToGrid(e.offsetY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawShapes(); // Redessiner toutes les formes
        ctx.strokeStyle = 'black';
        if (currentTool === 'rectangle') {
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        // } else if (currentTool === 'polygon') {
        //     drawCurrentPolygon();
        //     ctx.beginPath();
        //     ctx.moveTo(currentPolygon[currentPolygon.length - 1].x, currentPolygon[currentPolygon.length - 1].y);
        //     ctx.lineTo(endX, endY);
        //     ctx.stroke();
        } else if (currentTool === 'polygon' && isDrawingPolygon) { ///modifff
            const x = snapToGrid(e.offsetX);
            const y = snapToGrid(e.offsetY);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawShapes();
            drawCurrentPolygon();
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(currentPolygon[currentPolygon.length - 1].x, currentPolygon[currentPolygon.length - 1].y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
         else if (currentTool === 'circle') {
            const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        } else if (currentTool === 'point') {
            ctx.beginPath();
            ctx.arc(startX, startY, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (drawing && currentTool) { //Le rectangle plat est une ligne
        drawing = false;
        const endX = snapToGrid(e.offsetX);
        const endY = snapToGrid(e.offsetY);
        let tikzCommand = '';
        if (currentTool === 'rectangle') {
            if (startX === endX && startY === endY) {
                tikzCommand = `\\fill (${startX / gridSize},${startY / gridSize}) circle (2pt);\n`;
            } else if (startX === endX || startY === endY) {
                tikzCommand = `\\draw (${startX / gridSize},${startY / gridSize}) -- (${endX / gridSize},${endY / gridSize});\n`;
            } else {
                tikzCommand = `\\draw (${startX / gridSize},${startY / gridSize}) rectangle (${endX / gridSize},${endY / gridSize});\n`;
                rectangles.push({ startX, startY, width: endX - startX, height: endY - startY });
            }
        } else if (currentTool === 'polygon' && !isDrawingPolygon) {
            if (currentPolygon.length === 1) {
                tikzCommand = `\\fill (${currentPolygon[0].x / gridSize},${currentPolygon[0].y / gridSize}) circle (2pt);\n`;
            } else if (currentPolygon.length === 2) {
                tikzCommand = `\\draw (${currentPolygon[0].x / gridSize},${currentPolygon[0].y / gridSize}) -- (${currentPolygon[1].x / gridSize},${currentPolygon[1].y / gridSize});\n`;
            } else {
                let tikzCommand = '\\draw ';
                currentPolygon.forEach((point, index) => {
                    tikzCommand += `(${point.x / gridSize},${point.y / gridSize})`;
                    if (index < currentPolygon.length - 1) {
                        tikzCommand += ' -- ';
                    }
                });
                tikzCommand += ';\n';
                tikzCommands.push(tikzCommand);
                polygons.push([...currentPolygon]); // Ajouter le polygone à la liste des polygones
            }
            updateTikzCode();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawShapes();
            currentPolygon = [];
        } else if (currentTool === 'circle') {
            if (startX === endX && startY === endY) {
                tikzCommand = `\\fill (${startX / gridSize},${startY / gridSize}) circle (2pt);\n`;
            } else {
                const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / gridSize;
                tikzCommand = `\\draw (${startX / gridSize},${startY / gridSize}) circle (${radius});\n`;
                circles.push({ startX, startY, radius });
            }
        } else if (currentTool === 'point') {
            tikzCommand = `\\fill (${startX / gridSize},${startY / gridSize}) circle (2pt);\n`;
            points.push({ startX, startY });
        }
        tikzCommands.push(tikzCommand);
        updateTikzCode();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawShapes(); // Redessiner toutes les formes
    }
});

canvas.addEventListener('dblclick', (e) => {
    if (currentTool === 'polygon' && isDrawingPolygon) {
        isDrawingPolygon = false;
        if (currentPolygon.length === 1) {
            tikzCommands.push(`\\fill (${currentPolygon[0].x / gridSize},${currentPolygon[0].y / gridSize}) circle (2pt);\n`);
        } else if (currentPolygon.length === 2) {
            tikzCommands.push(`\\draw (${currentPolygon[0].x / gridSize},${currentPolygon[0].y / gridSize}) -- (${currentPolygon[1].x / gridSize},${currentPolygon[1].y / gridSize});\n`);
        } else {
            currentPolygon.pop(); // Retirer le dernier point ajouté
            let tikzCommand = '\\draw ';
            currentPolygon.forEach((point, index) => {
                tikzCommand += `(${point.x / gridSize},${point.y / gridSize})`;
                if (index < currentPolygon.length - 1) {
                    tikzCommand += ' -- ';
                }
            });
            // Vérifier si le polygone est fermé
            if (currentPolygon[0].x === currentPolygon[currentPolygon.length - 1].x &&
                currentPolygon[0].y === currentPolygon[currentPolygon.length - 1].y) {
                tikzCommand = tikzCommand.replace(/ -- \(\d+(\.\d+)?,\d+(\.\d+)?\)$/, ''); // Retirer la dernière coordonnée
                tikzCommand += ' -- cycle;\n';
            } else {
                tikzCommand += ';\n';
            }
            tikzCommands.push(tikzCommand);
            polygons.push([...currentPolygon]); // Ajouter le polygone terminé à la liste
        }
        updateTikzCode();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawShapes();
        currentPolygon = [];
    }
});

resetButton.addEventListener('click', () => {
    rectangles = [];
    lines = [];
    circles = [];
    points = [];
    polygons = []; // Réinitialiser les polygones
    tikzCommands = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    tikzCodeTextarea.value = '';
});

undoButton.addEventListener('click', () => {
    if (tikzCommands.length > 0) {
        tikzCommands.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        rectangles.pop();
        lines.pop();
        polygons.pop();
        currentPolygon.pop();
        circles.pop();
        points.pop();
        drawShapes();
        updateTikzCode();
    }
});

exportButton.addEventListener('click', () => {
    navigator.clipboard.writeText(tikzCodeTextarea.value).then(() => {
        alert('Code TikZ copié dans le presse-papiers !');
    }).catch(err => {
        console.error('Erreur lors de la copie du code TikZ : ', err);
    });
});

a3Button.addEventListener('click', () => {
    paperSize = 'a3paper';
    gridSize = canvas.width / 29.7;
    canvas.height = 42 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

a4Button.addEventListener('click', () => {
    paperSize = 'a4paper';
    gridSize = canvas.width / 21;
    canvas.height = 29.7 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

a5Button.addEventListener('click', () => {
    paperSize = 'a5paper';
    gridSize = canvas.width / 14.8;
    canvas.height = 21 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

usLetterButton.addEventListener('click', () => {
    paperSize = 'letterpaper';
    gridSize = canvas.width / 8.5;
    canvas.height = 11 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

usLegalButton.addEventListener('click', () => {
    paperSize = 'legalpaper';
    gridSize = canvas.width / 8.5;
    canvas.height = 14 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

usTabButton.addEventListener('click', () => {
    paperSize = 'tabloidpaper';
    gridSize = canvas.width / 11;
    canvas.height = 17 * gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    updateTikzCode();
});

// Fonction pour dessiner toutes les formes
function drawShapes() {
    rectangles.forEach(rect => {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height);
    });
    // lines.forEach(line => {
    //     ctx.strokeStyle = 'black';
    //     ctx.beginPath();
    //     ctx.moveTo(line.startX, line.startY);
    //     ctx.lineTo(line.endX, line.endY);
    //     ctx.stroke();
    // });
    circles.forEach(circle => {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(circle.startX, circle.startY, circle.radius * gridSize, 0, 2 * Math.PI);
        ctx.stroke();
    });
    points.forEach(point => {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(point.startX, point.startY, 2, 0, 2 * Math.PI);
        ctx.fill();
    });
    polygons.forEach(polygon => {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(polygon[0].x, polygon[0].y);
        for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y);
        }
        ctx.stroke();
    });
}

function drawCurrentPolygon() {
    if (currentPolygon.length > 0) {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(currentPolygon[0].x, currentPolygon[0].y);
        for (let i = 1; i < currentPolygon.length; i++) {
            ctx.lineTo(currentPolygon[i].x, currentPolygon[i].y);
        }
        ctx.stroke();
    }
}

// Fonction pour arrondir à 0.5
function roundToHalf(value) {
    return Math.round(value * 2) / 2;
}

// Mettre à jour la fonction pour générer le code TikZ avec des coordonnées arrondies
function updateTikzCode() {
    const tikzCode = `\\begin{tikzpicture}\n${tikzCommands.map(command => {
        return command.replace(/(\d+\.\d+)/g, (match) => roundToHalf(parseFloat(match)).toFixed(1));
    }).join('')}\\end{tikzpicture}`;
    tikzCodeTextarea.value = tikzCode;
}

function drawGrid() {
    ctx.strokeStyle = '#e0e0e0';
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        // Demi-unités en pointillés
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x + gridSize / 2, 0);
        ctx.lineTo(x + gridSize / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        // Demi-unités en pointillés
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, y + gridSize / 2);
        ctx.lineTo(canvas.width, y + gridSize / 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function snapToGrid(value) {
    return Math.round(value / (gridSize / 2)) * (gridSize / 2);
}

// Dessiner la grille initiale
drawGrid();

// Permettre la modification directe du code TikZ
tikzCodeTextarea.addEventListener('input', () => {
    tikzCommands = tikzCodeTextarea.value.split('\n').filter(line => line.trim() !== '');
});

// Fonction pour arrondir à 0.5
function roundToHalf(value) {
    return Math.round(value * 2) / 2;
}

// Mettre à jour la fonction pour générer le code TikZ avec des coordonnées arrondies
function updateTikzCode() {
    const tikzCode = `\\begin{tikzpicture}\n${tikzCommands.map(command => {
        return command.replace(/(\d+\.\d+)/g, (match) => roundToHalf(parseFloat(match)).toFixed(1));
    }).join('')}\\end{tikzpicture}`;
    tikzCodeTextarea.value = tikzCode;
}

function drawGrid() {
    ctx.strokeStyle = '#e0e0e0';
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        // Demi-unités en pointillés
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x + gridSize / 2, 0);
        ctx.lineTo(x + gridSize / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        // Demi-unités en pointillés
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, y + gridSize / 2);
        ctx.lineTo(canvas.width, y + gridSize / 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function snapToGrid(value) {
    return Math.round(value / (gridSize / 2)) * (gridSize / 2);
}

// Dessiner la grille initiale
drawGrid();

// Permettre la modification directe du code TikZ
tikzCodeTextarea.addEventListener('input', () => {
    tikzCommands = tikzCodeTextarea.value.split('\n').filter(line => line.trim() !== '');
});