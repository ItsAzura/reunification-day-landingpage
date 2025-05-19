/**
 * Calculates the initial translation and 3D rotation of an element, moving and rotating it further away from the center of the screen.
 * The rotation and Z-axis translation are proportional to the distance from the center, with elements near the center rotating less and moving less in Z.
 *
 * @param {ElementInfo} elementInfo - Object containing element's position and dimensions
 * @param {ViewportInfo} viewportInfo - Object containing viewport dimensions
 * @param {number} offsetDistance - The distance by which the element will be moved away from the center (default: 250px)
 * @param {number} maxRotation - The maximum rotation in degrees for farthest elements (default: 300 degrees)
 * @param {number} maxZTranslation - The maximum Z-axis translation in pixels for farthest elements (default: 2000px)
 * @returns {Transform3D} The x, y, z translation and rotateX, rotateY values
 */

// Define types for parameters and return value
interface ElementInfo {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ViewportInfo {
  width: number;
  height: number;
}

interface Transform3D {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
}

export const calculateInitialTransform = (
  elementInfo: ElementInfo,
  viewportInfo: ViewportInfo,
  offsetDistance: number = 250,
  maxRotation: number = 300,
  maxZTranslation: number = 2000,
): Transform3D => {
  const viewportCenter = {
    width: viewportInfo.width / 2,
    height: viewportInfo.height / 2,
  };

  const elementCenter = {
    x: elementInfo.left + elementInfo.width / 2,
    y: elementInfo.top + elementInfo.height / 2,
  };

  // Calculate the angle between the center of the element and the center of the viewport
  const angle = Math.atan2(
    Math.abs(viewportCenter.height - elementCenter.y),
    Math.abs(viewportCenter.width - elementCenter.x),
  );

  // Calculate the x and y translation based on the angle and distance
  const translateX = Math.abs(Math.cos(angle) * offsetDistance);
  const translateY = Math.abs(Math.sin(angle) * offsetDistance);

  // Calculate the maximum possible distance from the center (diagonal of the viewport)
  const maxDistance = Math.sqrt(
    Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2),
  );

  // Calculate the current distance from the center
  const currentDistance = Math.sqrt(
    Math.pow(viewportCenter.width - elementCenter.x, 2) +
      Math.pow(viewportCenter.height - elementCenter.y, 2),
  );

  // Scale rotation and Z-translation based on distance from the center
  // (closer elements rotate/translate less, farther ones rotate/translate more)
  const distanceFactor = currentDistance / maxDistance;

  // Calculate the rotation values based on the position relative to the center
  const rotationX =
    (elementCenter.y < viewportCenter.height ? -1 : 1) *
    (translateY / offsetDistance) *
    maxRotation *
    distanceFactor;

  const rotationY =
    (elementCenter.x < viewportCenter.width ? 1 : -1) *
    (translateX / offsetDistance) *
    maxRotation *
    distanceFactor;

  // Calculate the Z-axis translation (depth) based on the distance from the center
  const translateZ = maxZTranslation * distanceFactor;

  // Determine direction based on position relative to the viewport center
  return {
    x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
    y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
    z: translateZ,
    rotateX: rotationX,
    rotateY: rotationY,
  };

  // return {
  //   x: 0,
  //   y: 0,
  //   z: 0,
  //   rotateX: 0,
  //   rotateY: 0,
  // }
};

/**
 * Calculates the animation delay for an element based on its distance from the center of all elements.
 * Elements closer to the center start animating earlier than those farther away.
 * 
 * @param {ElementInfo | null} currentElement - The element to calculate delay for
 * @param {ElementInfo[]} allElements - Array of all elements in the animation
 * @param {number} totalStaggerTime - Total time (seconds) over which to stagger all animations (default: 0.5s)
 * @returns {number} The calculated delay in seconds
 */

// Define the ElementInfo interface
interface ElementInfo {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Calculates element animation delay based on distance from center
 */
export const getElementDelay = (
  currentElement: ElementInfo | null,
  allElements: ElementInfo[],
  totalStaggerTime: number = 0.5
): number => {
  if (!currentElement || allElements.length === 0) return 0;

  // Get center point of all elements
  const xValues = allElements.map(el => el.left + el.width / 2);
  const yValues = allElements.map(el => el.top + el.height / 2);
  const centerX = xValues.reduce((a, b) => a + b, 0) / allElements.length;
  const centerY = yValues.reduce((a, b) => a + b, 0) / allElements.length;

  // Current element center
  const elCenterX = currentElement.left + currentElement.width / 2;
  const elCenterY = currentElement.top + currentElement.height / 2;

  // Calculate distance from center
  const distFromCenter = Math.sqrt(
    Math.pow(centerX - elCenterX, 2) + Math.pow(centerY - elCenterY, 2)
  );

  // Find max distance for normalization
  const distances = allElements.map(el => {
    const elX = el.left + el.width / 2;
    const elY = el.top + el.height / 2;
    return Math.sqrt(
      Math.pow(centerX - elX, 2) + Math.pow(centerY - elY, 2)
    );
  });
  const maxDistance = Math.max(...distances);

  // Normalize distance (0 to 1)
  const normalizedDist = distFromCenter / (maxDistance || 1);

  // Calculate delay (items closer to center start earlier)
  return normalizedDist * totalStaggerTime;
};