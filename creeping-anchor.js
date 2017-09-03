// Сreated by vereschak@gmail.com

// -----------------------------------------
// ----------- Creeping Anchor  ------------
// -----------------------------------------
"use strict";
( function ( $ ) {
    $.fn.creepingAnchor = function ( opt ) {
        var options = $.extend( {
            speed: 500,
            activeLinks: true,
            position: "top",
            offsetLeft: 0,
            anchors: false
        }, opt );
        var _ = this;
        if ( !_.length ) return false;
        var speed = options.speed / 1000;
        var li = this.find( "li" );
        var line = document.createElement( "div" );
        line.style.transition = speed + "s"
        $( line ).addClass( 'air_line' );
        _[ 0 ].style.position = "relative";
        _.append( line );
        line.style.position = "absolute";
        var move = function ( li ) {
            line.style.width = $( li ).innerWidth() - ( options.offsetLeft * 2 ) + "px";
            line.style.left = $( li ).position().left + options.offsetLeft + "px";
        };
        _.init = function ( li ) {
            return function ( e ) {
                move( li );
                if ( options.position == "top" ) {
                    line.style.top = $( li ).position().top + "px";
                } else {
                    line.style.top = $( li ).position().top + $( li ).innerHeight() + "px";
                }
                line.style.transform = "scale(1)";
                line.style.width = $( li ).innerWidth() - ( options.offsetLeft * 2 ) + "px";
                line.style.left = $( li ).position().left + options.offsetLeft + "px";
            }
        };
        _.disable = function () {
            if ( !_.find( "li.active-link" ).length ) {
                line.style.transform = "scale(0)"
                _.css( "position", "relative" );
            } else {
                _.init( _.find( "li.active-link" )[ 0 ] )();
            }
        };
        _.initAnchors = function () {
            var _ = this;
            if ( options.anchors === true ) {
                li.find( "a" ).click( function ( e ) {
                    
                    var section = $( this ).attr( "href" );
                    if( section !== "#" && $(section).length ) e.preventDefault();
                    _.scrollTo( section, $( this ).data( "offset" ) )
                } )
            }
        }
        _.scrollTo = function ( section, dataOffset ) {
            if ( section != "#" && $( section ).length ) {
                var offset = $( section ).offset().top;
                var superOffset = offset + ( dataOffset || 0 );

                $( 'body' ).animate( {
                    scrollTop: superOffset
                }, 400 )
            }
        };
        var detectWindow = function ( el ) {
            var viewport = {};
            viewport.top = $( window ).scrollTop();
            viewport.bottom = viewport.top + $( window ).height();
            var bounds = {};
            bounds.top = el.offset().top;
            bounds.bottom = bounds.top + ( el.outerHeight() / 2 );
            return ( ( bounds.top <= viewport.bottom ) && ( bounds.bottom >= viewport.top ) );
        };
        var scrollEv = function () {
            var scroll;
            clearTimeout( scroll );
            scroll = setTimeout( function () {
                var elements = [];
                li.each( function ( index, el, arr ) {
                    var section = $( el ).find( "a" ).attr( "href" );
                    if ( section != "#" && $( section ).length && detectWindow( $( section ) ) ) {
                        elements.push( $( this ) );
                    }
                } );
                if ( elements.length ) {
                    var section = $( elements[ 0 ].find( "a" ).attr( "href" ) );
                    elements[ 0 ].addClass( "active-link" ).siblings().removeClass( "active-link" )
                    _.init( elements[ 0 ] )();
                } else {
                    _.disable();
                    li.removeClass( "active-link" )
                }
            }, 0 )
        };
        if ( options.activeLinks ) {
            window.addEventListener( "scroll", function () {
                scrollEv();
            } )
            scrollEv();
        };
        _.initAnchors();
        _.disable();
        line.style.width = $( li ).innerWidth() - ( options.offsetLeft * 2 ) + "px";
        line.style.left = $( li ).position().left + "px";
        li.each( function ( index, el ) {
            this.addEventListener( "mouseenter", _.init( el ) );
        } );
        _[ 0 ].addEventListener( "mouseleave", _.disable );
        var timeoutC;
        window.addEventListener( "resize", function () {
            clearTimeout( timeoutC );
            timeoutC = setTimeout( _.disable, 20 );
        } );
    };
} )( jQuery );