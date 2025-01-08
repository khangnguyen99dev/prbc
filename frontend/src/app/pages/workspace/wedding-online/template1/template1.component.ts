import { Component, OnInit, ElementRef } from '@angular/core';
import { STYLE_LADI } from './styles/style-ladi';
import { STYLE_PAGE } from './styles/style_page';
import { STYLE_ELEMENT } from './styles/style_element';
import { EVENT_DATA } from './js/script_event_data';
import { STYLE_LAZY_LOAD } from './styles/style_lazy_load';
import { STYLE_SNOWFLAKES } from './styles/style_snowflakes';

declare global {
  interface Window {
    LadiPageScript: any;
    ladi: any;
    LadiPageApp: any;
    LadiPageAppV2: any;
    ladi_viewport: any;
    ladi_is_desktop: any;
    ladi_fbq_data: any;
    ladi_fbq: any;
    ladi_ttq_data: any;
    ladi_ttq: any;
    ladi_is_mobile: any;
  }
}

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})
export class Template1Component {
  isPlaying = false;
  hasUserInteracted = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Inject styles vào style tag
    const style = document.createElement('style');
    style.id = 'style_ladi';
    style.textContent = STYLE_LADI;
    this.elementRef.nativeElement.appendChild(style);

    const stylePage = document.createElement('style');
    stylePage.id = 'style_page';
    stylePage.textContent = STYLE_PAGE;
    this.elementRef.nativeElement.appendChild(stylePage);

    const styleElement = document.createElement('style');
    styleElement.id = 'style_element';
    styleElement.textContent = STYLE_ELEMENT;
    this.elementRef.nativeElement.appendChild(styleElement);

    const styleLazyLoad = document.createElement('style');
    styleLazyLoad.id = 'style_lazy_load';
    styleLazyLoad.textContent = STYLE_LAZY_LOAD;
    this.elementRef.nativeElement.appendChild(styleLazyLoad);

    const styleSnowflakes = document.createElement('style');
    styleSnowflakes.id = 'style_snowflakes';
    styleSnowflakes.textContent = STYLE_SNOWFLAKES;
    this.elementRef.nativeElement.appendChild(styleSnowflakes);

    const scriptEventData = document.createElement('script');
    scriptEventData.id = 'script_event_data';
    scriptEventData.type = 'application/json';
    scriptEventData.textContent = EVENT_DATA;
    this.elementRef.nativeElement.appendChild(scriptEventData);

    // Add event listeners for user interaction
    this.initializeLadiPage();

    this.loadScripts();
  }

  private handleFirstInteraction() {
    if (!this.hasUserInteracted) {
      this.hasUserInteracted = true;
      setTimeout(() => {
        this.toggleMusic(); // Start playing music after first interaction
      }, 3000);
    }
  }

  private loadScripts() {
    // Load external scripts
    const scripts = [
        'assets/template-1/js/ladipagev3.min.js',
        'assets/template-1/js/script.js',
    ];

    scripts.forEach(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        script.type = 'text/javascript';
        this.elementRef.nativeElement.appendChild(script);
    });
  }

  toggleMusic() {
    const musicPlayer = document.getElementById("musicPlayer") as HTMLAudioElement;
    const playPauseButton = document.querySelector(".tdk-music") as HTMLElement;

    if (this.isPlaying) {
      musicPlayer?.pause();
      playPauseButton?.classList.remove("playing");
    } else {
      if (musicPlayer) {
        musicPlayer.volume = 0.3; // Optional: reduce volume for better experience
        const playPromise = musicPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              playPauseButton?.classList.add("playing");
            })
            .catch(error => {
              console.log("Playback failed:", error);
              this.isPlaying = false;
            });
        }
      }
    }
    this.isPlaying = !this.isPlaying;
  }

  private initializeLadiPage() {
    // Load LadiPage script dynamically
    const script = document.createElement('script');
    script.src = 'assets/template-1/js/ladipagev3.min.js';
    script.onload = () => {
      // Initialize after script loads
      const checkLadiPageLoaded = setInterval(() => {
        if (typeof window.LadiPageScript !== "undefined" && typeof window.ladi !== "undefined") {
          clearInterval(checkLadiPageLoaded);
          
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
        }
      }, 100);
    };
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initLazyLoad();
    }, 3000);
  }

  private initLazyLoad() {
    const lazyloadRun = (dom: Document, isFirst: boolean, checkDomRect: boolean) => {
      if (checkDomRect && (document.body.clientWidth <= 0 || document.body.clientHeight <= 0)) {
        return setTimeout(() => {
          lazyloadRun(dom, isFirst, checkDomRect);
        }, 1);
      }

      const styleLazyload = document.getElementById('style_lazyload');
      const listElementLazyload = dom.querySelectorAll(`
        body.lazyload .ladi-overlay, 
        body.lazyload .ladi-box,
        body.lazyload .ladi-button-background,
        body.lazyload .ladi-collection-item, 
        body.lazyload .ladi-countdown-background, 
        body.lazyload .ladi-form-item-background, 
        body.lazyload .ladi-form-label-container .ladi-form-label-item.image, 
        body.lazyload .ladi-frame-background, 
        body.lazyload .ladi-gallery-view-item, 
        body.lazyload .ladi-gallery-control-item, 
        body.lazyload .ladi-headline, 
        body.lazyload .ladi-image-background, 
        body.lazyload .ladi-image-compare, 
        body.lazyload .ladi-list-paragraph ul li, 
        body.lazyload .ladi-section-background, 
        body.lazyload .ladi-survey-option-background, 
        body.lazyload .ladi-survey-option-image, 
        body.lazyload .ladi-tabs-background, 
        body.lazyload .ladi-video-background, 
        body.lazyload .ladi-banner, 
        body.lazyload .ladi-spin-lucky-screen, 
        body.lazyload .ladi-spin-lucky-start
      `);

      const docEventScroll = window;
      
      for (let i = 0; i < listElementLazyload.length; i++) {
        const rect = listElementLazyload[i].getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        
        if (offsetTop >= window.scrollY + window.innerHeight || 
            window.scrollY >= offsetTop + (listElementLazyload[i] as HTMLElement).offsetHeight) {
          listElementLazyload[i].classList.add('ladi-lazyload');
        }
      }

      if (styleLazyload) {
        styleLazyload.parentElement?.removeChild(styleLazyload);
      }

      document.body.classList.remove('lazyload');

      let currentScrollY = window.scrollY;
      
      const stopLazyload = (event: Event) => {
        if (event.type === 'scroll' && window.scrollY === currentScrollY) {
          currentScrollY = -1;
          return;
        }
        
        docEventScroll.removeEventListener('scroll', stopLazyload);
        const lazyElements = document.getElementsByClassName('ladi-lazyload');
        while (lazyElements.length > 0) {
          lazyElements[0].classList.remove('ladi-lazyload');
        }
      };

      if (isFirst) {
        let scrollEventPassive = null;
        try {
          const opts = Object.defineProperty({}, 'passive', {
            get: function() {
              scrollEventPassive = { passive: true };
              return true;
            }
          });
          window.addEventListener('testPassive', null as any, opts);
          window.removeEventListener('testPassive', null as any, opts);
        } catch (e) {}

        docEventScroll.addEventListener('scroll', stopLazyload, scrollEventPassive as any);
      }

      return dom;
    };

    // Run the lazyload
    lazyloadRun(document, true, true);
  }
}
