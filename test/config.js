require.config({
    baseUrl: '../src/js',
    paths: {
        jquery: '../../vendor/js/jquery/jquery',
        three: '../../vendor/js/threejs/three'
    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }
});
