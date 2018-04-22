import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/Bleedr.js',
  output: [
    {
      file: 'dist/bleedr.umd.js',
      format: 'umd',
      name: 'Bleedr'
    },
    {
      file: 'dist/bleedr.es.js',
      format: 'es',
    }
  ],
  plugins: [ 
    uglify()
  ]
};