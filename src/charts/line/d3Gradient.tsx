// Create Gradient

interface Color {
  text: string;
  grid: string;
  gradientOne: string;
  gradientOneOpacity:number;
  gradientTwo: string;
  gradientTwoOpacity:number;
  lineMain: string;
  lineOne: string;
}


const d3Gradient = (svg:any, color:Color) => {


  const gradient = svg
    .select('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '0%')
    .attr('y2', '0%');

  gradient
    .append('stop')
    .attr('offset', '0%') // Bottom
    .attr(
      'style',
      `stop-color:${color.gradientTwo};stop-opacity:${color.gradientTwoOpacity}`,
    );

  gradient
    .append('stop')
    .attr('offset', '100%') // Top
    .attr(
      'style',
      `stop-color:${color.gradientOne};stop-opacity:${color.gradientOneOpacity}`,
    );
};

export default d3Gradient;
