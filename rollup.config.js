import { terser } from 'rollup-plugin-terser';

export default {
  external: ['react'],
  input: 'index.js',
  output: [{
    file: 'dist/rec.js',
    format: 'cjs',
    name: 'version',
    plugins: [terser()]
  }, {
    file: 'dist/rec.esm.js',
    format: 'esm',
    name: 'version',
    plugins: [terser()]
  }]
};
