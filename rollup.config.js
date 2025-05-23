import { terser } from 'rollup-plugin-terser';

export default [
  // UMD (import estático)
  {
    input: 'src/NGateDateTime.js',
    output: [
      {
        file: 'dist/ngate-datetime.js',
        format: 'umd',
        name: 'NGateDateTime',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/ngate-datetime.min.js',
        format: 'umd',
        name: 'NGateDateTime',
        exports: 'named',
        plugins: [terser()],
        sourcemap: true
      }
    ]
  },
  // ESM (import dinâmico, sem pasta esm)
  {
    input: 'src/NGateDateTime.js',
    output: [
      {
        file: 'dist/ngate-datetime.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/ngate-datetime.esm.min.js',
        format: 'esm',
        plugins: [terser()],
        sourcemap: true
      }
    ]
  }
];
