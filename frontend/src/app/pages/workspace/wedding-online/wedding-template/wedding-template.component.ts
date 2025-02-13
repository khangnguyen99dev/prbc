import { Component, OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import { STYLE_LADI } from '../../../workspace/wedding-online/template1/styles/style-ladi';
import { STYLE_PAGE } from '../../../workspace/wedding-online/template1/styles/style_page';
import { STYLE_ELEMENT } from '../../../workspace/wedding-online/template1/styles/style_element';
import { EVENT_DATA } from '../../../workspace/wedding-online/template1/js/script_event_data';
import { STYLE_LAZY_LOAD } from '../../../workspace/wedding-online/template1/styles/style_lazy_load';
import { STYLE_SNOWFLAKES } from '../../../workspace/wedding-online/template1/styles/style_snowflakes';
import * as moment from 'moment';
import 'moment-lunar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';

declare global {
  interface Window {
    LadiPageScript: any & {
      reloadNotifications: (elementId: string) => void;
      run: (isFirst: boolean) => void;
    };
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
  selector: 'app-wedding-template',
  templateUrl: './wedding-template.component.html',
  styleUrls: ['./wedding-template.component.scss']
})
export class WeddingTemplateComponent {
  @Input() formData: any;
  @Input() previewMode: boolean = false;

  slug: string = '';
  loading: boolean = false;
  errorMessages: string[] = [];
  weddingOnline: any = {};
  isPlaying = false;
  currentMonth: moment.Moment = moment();
  calendar: any[][] = [];
  countdown: any = 0;
  weddingFullDate: any = moment().format('YYYY-MM-DD');
  selectedDate: any = moment().format('YYYY-MM-DD');
  weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  private CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  private CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }
  

  public formMessage: any = {
    id: '',
    slug: '',
    name: '',
    from_whom: '',
    message: '',
    suggestion: '',
  };

  public formFeedback: any = {
    id: '',
    slug: '',
    name: '',
    phone: '',
    is_join_wedding: false,
    is_guest_of_bride: false,
    is_guest_of_groom: false,
    number_of_people: '',
  };

  ngOnInit() {
    setTimeout(() => {
          // Add new event data script
      let eventData = EVENT_DATA
        .replace(/\[URL_YOUTUBE\]/g, this.formData.youtube_url ? `"${this.formData.youtube_url}"` : '')
        .replace(/\[COUNTDOWN\]/g, this.countdown > 0 ? this.countdown : '')
        .replace(/\[TRANSFER_OF_BRIDE_URL\]/g, this.formData.transfer_of_bride_url ? `"${this.formData.transfer_of_bride_url}"` : '')
        .replace(/\[TRANSFER_OF_GROOM_URL\]/g, this.formData.transfer_of_groom_url ? `"${this.formData.transfer_of_groom_url}"` : '')
        .replace(/\[BANK_ACCOUNT_NUMBER_BRIDE\]/g, this.formData.bank_account_bride ? `"${this.formData.bank_account_bride}"` : '')
        .replace(/\[BANK_ACCOUNT_NUMBER_GROOM\]/g, this.formData.bank_account_groom ? `"${this.formData.bank_account_groom}"` : '');

      const scriptEventData = document.createElement('script');
      scriptEventData.id = 'script_event_data';
      scriptEventData.type = 'application/json';
      scriptEventData.textContent = eventData;
      document.body.appendChild(scriptEventData);

      console.log(scriptEventData);

      

      document.title = this.formData.groom_name + ' & ' + this.formData.bride_name;

      this.weddingFullDate = this.formData.wedding_full_date;
    
      if (this.formData.wedding_date && this.formData.wedding_month && this.formData.wedding_year) {
          this.countdown = moment(this.formData.wedding_full_date + ' ' + this.formData.wedding_time, 'YYYY-MM-DD HH:mm').diff(moment().utcOffset('+0700'), 'minutes');
      }

      console.log(this.countdown);
      // Load scripts first
      this.loadScripts();

      // Initialize calendar
      this.currentMonth = moment(this.weddingFullDate, 'YYYY-MM-DD').clone().startOf('month');
      this.generateCalendar();

      // Load images
      this.loadImages();

      // Inject styles
      const styles = [
          { id: 'style_ladi', content: STYLE_LADI },
          { id: 'style_page', content: STYLE_PAGE },
          { id: 'style_element', content: STYLE_ELEMENT },
          { id: 'style_lazy_load', content: STYLE_LAZY_LOAD },
          { id: 'style_snowflakes', content: STYLE_SNOWFLAKES }
      ];

      styles.forEach(style => {
          const styleElement = document.createElement('style');
          styleElement.id = style.id;
          styleElement.textContent = style.content;
          document.head.appendChild(styleElement); // Append to head instead of element
      });

      // Remove existing script if it exists
      // const existingEventData = document.getElementById('script_event_data');
      // if (existingEventData) {
      //     existingEventData.remove();
      // }
    }, 500);
  }
  
  private getDayOfWeekText(date: moment.Moment): string {
    const day = date.day();
    switch (day) {
      case 0: return 'Chủ Nhật';
      case 1: return 'Thứ Hai';
      case 2: return 'Thứ Ba';
      case 3: return 'Thứ Tư';
      case 4: return 'Thứ Năm';
      case 5: return 'Thứ Sáu';
      case 6: return 'Thứ Bảy';
      default: return '';
    }
  }

  getLunarDay(date: moment.Moment): number {
    return this.getLunarInfo(date).day;
  }

  getLunarInfo(date: moment.Moment): { day: number; month: number; year: number } {
    // @ts-ignore
    const lunar = date.lunar();
    return {
      day: lunar.date(),
      month: lunar.month() + 1, 
      year: lunar.year()
    };
  }

  private getLunarYear(date: moment.Moment): string {
    const lunarYear = date.lunar().year();
    
    const canIndex = (lunarYear - 4) % 10; 
    const chiIndex = (lunarYear - 4) % 12; 
    
    return `${this.CAN[canIndex]} ${this.CHI[chiIndex]}`;
  }

  loadImages() {
    const imageMap = {
      // Galleries
      'GALLERY2': this.formData.galleries,
      'GALLERY1': this.formData.memories,
      'GALLERY3': [
        {
          image_url: this.formData.bride_image_url,
          order: 0,
        },
        {
          image_url: this.formData.bride_image_url_2,
          order: 1,
        },
      ],
      'GALLERY4': [
        {
          image_url: this.formData.groom_image_url,
          order: 0,
        },
        {
          image_url: this.formData.groom_image_url_2,
          order: 1,
        },
      ],
      // Dress codes
      'BOX38': this.formData.dress_codes && this.formData.dress_codes[0] ? this.formData.dress_codes[0] : null,
      'BOX39': this.formData.dress_codes && this.formData.dress_codes[1] ? this.formData.dress_codes[1] : null,
      // Single images
      'IMAGE25': this.formData.transfer_of_groom_url,
      'IMAGE24': this.formData.transfer_of_bride_url,
      'IMAGE14': this.formData.card_cover_image_url,
      'IMAGE36': this.formData.groom_image_url,
      'IMAGE37': this.formData.bride_image_url,
      'IMAGE41': this.formData.background_video_image_url,
      'IMAGE39': this.formData.bride_image_url_2,
      'IMAGE38': this.formData.groom_image_url_2,
      'IMAGE28': this.formData.background_wish_image_url,
      'IMAGE20': this.formData.background_wish_image_url_2,
      'IMAGE45': this.formData.event_image_url,
      'IMAGE46': this.formData.wedding_ceremony_image_url,
      'IMAGE40': this.formData.background_footer_image_url,
      'IMAGE4': this.formData.logo_url,

    };

    // Load galleries
    ['GALLERY1', 'GALLERY2', 'GALLERY3', 'GALLERY4'].forEach(galleryId => {
      const images = imageMap[galleryId as keyof typeof imageMap];
      const galleryView = document.querySelector(`#${galleryId} .ladi-gallery-view`) as HTMLElement;
      const galleryControl = document.querySelector(`#${galleryId} .ladi-gallery-control-box`) as HTMLElement;

      images.forEach((image: any) => {
        // Create view item if it doesn't exist
        let viewItem = document.querySelector(`#${galleryId} .ladi-gallery-view-item[data-index="${image.order}"]`) as HTMLElement;
        if (!viewItem) {
          viewItem = document.createElement('div');
          viewItem.className = 'ladi-gallery-view-item ladi-lazyload' + (image.order == 0 ? ' selected' : '');
          viewItem.setAttribute('data-index', image.order.toString());
          galleryView.appendChild(viewItem);
        }
        const encodedUrlView = encodeURI(image.image_url as string);
        viewItem.style.backgroundImage = `url(${encodedUrlView})`;

        // Create control item if it doesn't exist
        let controlItem = document.querySelector(`#${galleryId} .ladi-gallery-control-item[data-index="${image.order}"]`) as HTMLElement;
        if (!controlItem) {
          controlItem = document.createElement('div');
          controlItem.className = 'ladi-gallery-control-item ladi-lazyload' + (image.order == 0 ? ' selected' : '');
          controlItem.setAttribute('data-index', image.order.toString());
          galleryControl.appendChild(controlItem);
        }
        const encodedUrlControl = encodeURI(image.image_url as string);
        controlItem.style.backgroundImage = `url(${encodedUrlControl})`;
      });

      // Dress codes
      const dressCode1 = document.querySelector(`#BOX38 .ladi-box`) as HTMLElement;
      dressCode1.style.backgroundColor = this.formData.dress_codes && this.formData.dress_codes[0] ? this.formData.dress_codes[0].color : '';
      const dressCode2 = document.querySelector(`#BOX39 .ladi-box`) as HTMLElement;
      dressCode2.style.backgroundColor = this.formData.dress_codes && this.formData.dress_codes[1] ? this.formData.dress_codes[1].color : '';
    });

    // Load single images
    Object.entries(imageMap).forEach(([id, url]) => {
      if (id.startsWith('IMAGE')) {
        const element = document.querySelector(`#${id} .ladi-image-background`) as HTMLElement;
        if (element) {          
          const encodedUrl = encodeURI(url as string);
          element.style.backgroundImage = `url("${encodedUrl}")`;
        } 
      }
    });

    // Load popup video background
    const popupVideo = document.querySelector(`#VIDEO1>.ladi-video>.ladi-video-background`) as HTMLElement;
    if (popupVideo) {
      popupVideo.style.backgroundImage = `url(${this.formData.background_youtube_url})`;
    }
  }

  private loadScripts() {
    // Create a promise-based script loader
    const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
              existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = src;
            script.type = 'text/javascript';
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            
            document.body.appendChild(script);
        });
    };

    // Define scripts in order they need to be loaded
    const scripts = [
        'assets/template-1/js/ladipagev3.min.js',
        'assets/template-1/js/script.js'
    ];

    // Load scripts sequentially
    scripts.reduce((promise, scriptSrc) => {
        return promise.then(() => loadScript(scriptSrc));
    }, Promise.resolve())
    .then(() => {
        // Initialize LadiPage after scripts are loaded
        setInterval(() => {
          this.initializeLadiPage();
          this.initLazyLoad();
        }, 500);
    })
    .catch(error => {
        console.error('Script loading failed:', error);
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
    if (typeof window.LadiPageScript !== "undefined" && typeof window.ladi !== "undefined") {
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
    } else {
        console.warn('LadiPageScript not loaded properly');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initLazyLoad();
    }, 500);
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
    lazyloadRun(document, true, true);    // Add mutation observer to watch for modal changes
  }

  generateCalendar() {
    const firstDay = this.currentMonth.clone().startOf('month');
    const lastDay = this.currentMonth.clone().endOf('month');
    
    // Reset calendar array
    this.calendar = [];
    
    // Get the first Monday before or on the first day of the month
    let date = firstDay.clone().startOf('week').add(1, 'day');
    if (date.isAfter(firstDay)) {
      date.subtract(7, 'days');
    }

    // Generate weeks until we reach a date after the last day of the month
    while (date.isBefore(lastDay) || date.isSame(lastDay, 'day')) {
      const week = [];
      
      // Generate days for the week
      for (let i = 0; i < 7; i++) {
        week.push({
          date: date.clone(),
          solarDay: date.date(),
          lunarDay: this.getLunarDay(date.clone()),
          isCurrentMonth: date.month() === this.currentMonth.month(),
          isSelected: date.isSame(this.weddingFullDate, 'day'),
          isToday: date.isSame(moment(), 'day')
        });
        date.add(1, 'day');
      }
      
      this.calendar.push(week);
    }
  }

  prevMonth() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateCalendar();
  }

  selectDate(date: moment.Moment) {
    this.selectedDate = date;
    this.generateCalendar();
  }

  // Helper method to get month title
  getMonthTitle(): string {
    return `THÁNG ${this.currentMonth.format('MM - YYYY')}`;
  }

  shouldShowHeart(date: moment.Moment): boolean {
    return date.isSame(this.weddingFullDate, 'day');
  }

  sendMessage() {
    // Reset error messages array
    this.errorMessages = [];

    // Validate required fields
    if (!this.formMessage.name || (!this.formMessage.message && !this.formMessage.suggestion) || !this.formMessage.from_whom) {
        // Use LadiPageScript's showMessage method for popup
        window.LadiPageScript.showMessage('Vui lòng nhập đầy đủ thông tin tên và lời chúc!');
        return;
    }

    this.formMessage.id = this.weddingOnline.id;
    this.formMessage.slug = this.weddingOnline.slug;
    axios.post(`${environment.api_url}/wedding-onlines/send-message`, this.formMessage, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          }
      })
      .then(response => {
          if (response.data.error) {
            window.LadiPageScript.showMessage(response.data.error_message);
              return;
          }else{
            const shape55Element = document.querySelector('#SHAPE55') as HTMLElement;
            if (shape55Element) {
              shape55Element.click();
            }

            // Reset form message
            this.formMessage = {
              id: '',
              slug: '',
              name: '',
              from_whom: '',
              message: '',
              suggestion: '',
            };

            // Reload notifications after a short delay to ensure the API has processed the new message
            setTimeout(() => {
              if (window.LadiPageScript && window.LadiPageScript.reloadNotifications) {
                  window.LadiPageScript.reloadNotifications('NOTIFY1');
              }
            }, 1000);
          }
      })
      .catch(error => {
        if (error.response.status == 422) {
            let errorMessage = '';
            Object.keys(error.response.data.errors).forEach(key => {
                errorMessage += error.response.data.errors[key] + '\n';
            });
            window.LadiPageScript.showMessage(errorMessage);
        } else {
            window.LadiPageScript.showMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      });
  }

  sendFeedback() {
    this.errorMessages = [];
    if (!this.formFeedback.name || !this.formFeedback.phone || !this.formFeedback.number_of_people || this.formFeedback.is_join_wedding == '' || (this.formFeedback.is_guest_of_bride == '' && this.formFeedback.is_guest_of_groom == '')) {
      window.LadiPageScript.showMessage('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.formFeedback.phone)) {
      window.LadiPageScript.showMessage('Số điện thoại không hợp lệ! Vui lòng nhập 10 chữ số.');
      return;
    }

    this.formFeedback.id = this.weddingOnline.id;
    this.formFeedback.slug = this.weddingOnline.slug;
    axios.post(`${environment.api_url}/wedding-onlines/send-feedback`, this.formFeedback, {
      headers: {
          Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
      }
    })
    .then(response => {
      if (response.data.error) {
        window.LadiPageScript.showMessage(response.data.error_message);
          return;
      }else{
        const shape56Element = document.querySelector('#SHAPE56') as HTMLElement;
        if (shape56Element) {
          shape56Element.click();
        }

        // Reset form message
        this.formFeedback = {
          id: '',
          slug: '',
          name: '',
          phone: '',
          number_of_people: '',
          is_join_wedding: '',
          is_guest_of_bride: '',
          is_guest_of_groom: '',
        };
      }
    })
    .catch(error => {
      if (error.response.status == 422) {
          let errorMessage = '';
          Object.keys(error.response.data.errors).forEach(key => {
              errorMessage += error.response.data.errors[key] + '\n';
          });
          window.LadiPageScript.showMessage(errorMessage);
      } else {
          window.LadiPageScript.showMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
  });
} 
}
