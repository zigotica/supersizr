/*
* supersizr.js 1.0.1
* Sergi Meseguer @zigotica
* https://github.com/zigotica/supersizr
*/


;(function( $ ){

  var count = 0; 
  // modified from http://remysharp.com/2010/07/21/throttling-function-calls/
  $.debouncr = function(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay || 200);
    };
  };

  var methods = {
    init : function( options ) {  
      
      settings = $.extend({
          'minSize' : 6
        , 'maxSize' : 1000
        , 'preserveLineHeight' : 0
      }, options);

      count++;

      return this.each(function(i){

        var id = $(this).attr("id") || "supersizr_"+ count+i; 
        $(this).attr("id", id);
        var elm = $('#'+id);

        elm.supersizr('create', id, settings); 
        elm.supersizr('sizr', id); 

        // $(window).on('resize.supersizr', function(){elm.supersizr('sizr', id)} );
        $(window).on('resize.supersizr', $.debouncr( function (event) { elm.supersizr('sizr', id);  }));
          
      });
    }

    , sizr : function ( id ) {
      var elm = $('#'+id),
          settings = elm.data("supersizr").settings;

      // formula / algorithm:
      var fs = elm.parent().width() / ( elm.outerWidth() / parseInt(elm.css("font-size"), null) );
      fs = Math.max(Math.min( fs , parseFloat(settings.maxSize)), parseFloat(settings.minSize));

      var LHratio = 1;
      if( settings.preserveLineHeight == 1) LHratio = elm.data("supersizr").RT;

      elm.css({'font-size': fs, 'line-height': (fs * LHratio) +"px" });
    }

    , create : function( id, settings ) {
        var elm = $('#'+id);
        elm.data('supersizr', {
            "PW": elm.parent().width()
          , "DS": elm.css("display")
          , "WS": elm.css("white-space")
          , "FS": elm.css("font-size")
          , "LH": elm.css("line-height")
          , "RT": parseInt(elm.css("line-height"),null) / parseInt(elm.css("font-size"),null)
          , "settings": settings
        });
        // we force inline-block and nowrap (needed to calculate width in one line);
        elm.css({
          "display": "inline-block", 
          "white-space": "nowrap"
        });
    }

    , destroy : function( ) {

      return this.each(function(){

        var id = $(this).attr("id");
        var elm = $('#'+id);
        $(window).unbind('.supersizr');
        // reset styles:
        elm.css({
          "display": elm.data("supersizr").DS, 
          "white-space": elm.data("supersizr").WS, 
          "font-size": elm.data("supersizr").FS, 
          "line-height": elm.data("supersizr").LH 
        });
        elm.removeData('supersizr');

      });

     }
  };

  $.fn.supersizr = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.supersizr' );
    }    
  
  };


})( jQuery );