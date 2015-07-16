// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['/assets/js/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['/assets/js/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['/assets/js/vendor/jquery/charts/flot/jquery.flot.min.js', 
                          '/assets/js/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          '/assets/js/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          '/assets/js/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          '/assets/js/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          '/assets/js/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['/assets/js/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['/assets/js/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['/assets/js/vendor/jquery/nestable/jquery.nestable.js',
                          '/assets/js/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['/assets/js/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['/assets/js/vendor/jquery/slider/bootstrap-slider.js',
                          '/assets/js/vendor/jquery/slider/slider.css'],
      chosen:         ['/assets/js/vendor/jquery/chosen/chosen.jquery.min.js',
                          '/assets/js/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['/assets/js/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          '/assets/js/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['/assets/js/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          '/assets/js/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['/assets/js/vendor/jquery/datatables/jquery.dataTables.min.js',
                          '/assets/js/vendor/jquery/datatables/dataTables.bootstrap.js',
                          '/assets/js/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['/assets/js/vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
                          '/assets/js/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          '/assets/js/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          '/assets/js/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['/assets/js/vendor/jquery/footable/footable.all.min.js',
                          '/assets/js/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug: false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      '/assets/js/vendor/modules/ng-grid/ng-grid.min.js',
                      '/assets/js/vendor/modules/ng-grid/ng-grid.min.css',
                      '/assets/js/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      '/assets/js/vendor/modules/angular-ui-select/select.min.js',
                      '/assets/js/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      '/assets/js/vendor/modules/ngImgCrop/ng-img-crop.js',
                      '/assets/js/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      '/assets/js/vendor/modules/angularjs-toaster/toaster.js',
                      '/assets/js/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      '/assets/js/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      '/assets/js/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      '/assets/js/vendor/modules/angular-slider/angular-slider.min.js',
                      '/assets/js/vendor/modules/angular-slider/angular-slider.css'
                  ]
              }
          ]
      });
  }])
;