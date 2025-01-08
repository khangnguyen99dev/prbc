(function() {
    var run = function() {
        if(typeof window.LadiPageScript == "undefined" || typeof window.ladi == "undefined" || window.ladi == undefined) {
            setTimeout(run, 100);
            return;
        }
        window.LadiPageApp = window.LadiPageApp || new window.LadiPageAppV2();
        window.LadiPageScript.runtime.ladipage_id = '669e98061ed4030012310e6c';
        window.LadiPageScript.runtime.publish_platform = 'LADIPAGEDNS';
        window.LadiPageScript.runtime.is_mobile_only = true;
        window.LadiPageScript.runtime.version = '1727062470377';
        window.LadiPageScript.runtime.cdn_url = 'https://w.ladicdn.com/v4/source/';
        window.LadiPageScript.runtime.DOMAIN_SET_COOKIE = ["mewedding.online"];
        window.LadiPageScript.runtime.DOMAIN_FREE = ["preview.ldpdemo.com", "ldp.page"];
        window.LadiPageScript.runtime.bodyFontSize = 12;
        window.LadiPageScript.runtime.store_id = "5c728619c417ab07e5194baa";
        window.LadiPageScript.runtime.time_zone = 7;
        window.LadiPageScript.runtime.currency = "VND";
        window.LadiPageScript.runtime.convert_replace_str = true;
        window.LadiPageScript.runtime.desktop_width = 960;
        window.LadiPageScript.runtime.mobile_width = 420;
        window.LadiPageScript.runtime.formdata = true;
        window.LadiPageScript.runtime.tracking_button_click = true;
        window.LadiPageScript.runtime.publish_time = 1727101196169;
        window.LadiPageScript.runtime.lang = "vi";
        window.LadiPageScript.run(true);
        window.LadiPageScript.runEventScroll();
    };
    run();
})();