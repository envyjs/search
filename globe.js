const earth = document.getElementById("globe");
let isDragging = false;
let previousX = 0;
let previousTime = 0;
let rotation = 0;
let velocity = 360 / 10050; // Slow auto-spin (650s per full rotation)
const defaultSpinSpeed = 360 / 10050; // Default slow rotation
const maxSpeed = 5;
let animationFrame;

// Prevent default dragging behavior
earth.addEventListener("dragstart", (e) => e.preventDefault());

function easeOut(value, easeFactor = 0.05) {
  let newValue = value * (1 - easeFactor); // Smoothly reduce speed
  return Math.abs(newValue) < defaultSpinSpeed ? defaultSpinSpeed : newValue; // Ensure smooth transition to default spin
}

function updateRotation() {
  rotation += velocity;
  earth.style.transform = `rotate(${rotation}deg)`;

  if (!isDragging) {
    velocity = easeOut(velocity, 0.02); // Smooth slowdown
  }

  animationFrame = requestAnimationFrame(updateRotation);
}

// Start dragging
earth.addEventListener("mousedown", (e) => {
  isDragging = true;
  previousX = e.clientX;
  previousTime = Date.now();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let currentTime = Date.now();
  let deltaX = e.clientX - previousX;
  let deltaTime = (currentTime - previousTime) / 16; // Normalize for smooth FPS

  let speed = deltaX / deltaTime;
  speed = Math.max(-maxSpeed, Math.min(maxSpeed, speed)); // Limit max speed

  velocity = speed * 0.8; // Adjust sensitivity
  previousX = e.clientX;
  previousTime = currentTime;
});

// Stop dragging
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Start the slow auto-rotation
updateRotation();
