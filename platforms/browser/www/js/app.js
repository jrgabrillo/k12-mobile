var App = function () {
    "use strict";
    return {
        handleCheckPageLoadUrl: function(hash) {
            var func = this;
            hash = (hash) ? hash : '#cmd=index';
            $('.sidebar [href="'+hash+'"][data-toggle=ajax]').trigger('click');
            func.handleLoadPage(hash);
        },
        handleHashChange: function() {
            var func = this;
            $(window).hashchange(function() {
                if (window.location.hash) {
                    func.handleLoadPage(window.location.hash);
                }
            });
        },
        handleLoadPage: function(hash) {
            var node = 'admin';
            var newhash = hash.split(';');
            var targetUrl = newhash[0].replace('#cmd=','../templates/'+node+'/')+".html";
            $('.jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox').remove();
            $.ajax({
                type: 'POST',
                url: targetUrl,
                dataType: 'html',
                cache: false,
                success: function(data) {
                    $('#_content').html(data);

                    console.log(data);

                    if(newhash.length>1){
                        targetUrl = newhash[1].replace('content=','../templates/'+node+'/')+".html";
                    }
                    else{
                        newhash.push('content=index');
                        targetUrl = newhash[1].replace('content=','../templates/'+node+'/')+".html";
                    }
                    $.ajax({
                        type: 'POST',
                        url: targetUrl,
                        dataType: 'html',
                        cache: false,
                        success: function(data) {
                            $('#_content').html(data);
                            $("a").parent('li').removeClass("active");
                            $("a[href='"+hash+"']").parent('li').addClass("active");
                        }
                    });
                    $('html, body').animate({
                        scrollTop: $("body").offset().top
                    }, 250);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var error = "<div class='middle-box text-center animated fadeInDown'>"+
                                    "<h1>404</h1>"+
                                    "<h3 class='font-bold'>Page Not Found</h3>"+

                                    "<div class='error-desc'>"+
                                        "Sorry, but the page you are looking for has not been found. Try checking the URL for error, then hit the refresh button on your browser or try something else in our app."+
                                    "</div>"+
                                "</div>";

                    $('#content').html(error);
                }
            });

            // $('.material-tooltip').css({'display':'none !important;'});
            $('.material-tooltip').hide();
        },
        init: function () {
            this.initAjaxFunction();
            $("#page-top").removeClass('boxed-layout');
        },
        initAjaxFunction: function() {
            this.handleCheckPageLoadUrl(window.location.hash);
            this.handleHashChange();
            $.ajaxSetup({
                cache: false
            });
        },
    };
}();