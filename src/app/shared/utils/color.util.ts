export class ColorUtil {

  public static hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  public static getContrastColor(hexColor: string): 'black' | 'white' {
    // Convert the background color to RGB
    let r = parseInt(hexColor.substr(1, 2), 16);
    let g = parseInt(hexColor.substr(3, 2), 16);
    let b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate the luminance using the formula
    // L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Check if the luminance is above a threshold
    // If it's above, use black color, otherwise use white color
    return luminance > 128 ? 'black' : 'white';
  }
}
