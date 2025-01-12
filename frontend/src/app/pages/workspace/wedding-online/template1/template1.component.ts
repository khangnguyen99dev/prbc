import { Component, OnInit, ElementRef } from '@angular/core';
import { STYLE_LADI } from './styles/style-ladi';
import { STYLE_PAGE } from './styles/style_page';
import { STYLE_ELEMENT } from './styles/style_element';
import { EVENT_DATA } from './js/script_event_data';
import { STYLE_LAZY_LOAD } from './styles/style_lazy_load';
import { STYLE_SNOWFLAKES } from './styles/style_snowflakes';
import * as moment from 'moment';
import 'moment-lunar';

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

  currentMonth: moment.Moment = moment();
  calendar: any[][] = [];
  weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  private CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  private CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  selectedDate: moment.Moment = moment();
  countdown: any = 0;

  constructor(private elementRef: ElementRef) {}

  public formData: any = {
    title: 'THÂN MỜI TỚI DỰ BỮA TIỆC',
    logo_url: 'assets/template-1/images/ta-20240719042933-9cypn.png',
    bride_name: 'Phương Anh',
    groom_name: 'Anh Tú',
    wedding_date: '15',
    wedding_month: '01',
    wedding_year: '2025',
    wedding_day: this.getDayOfWeekText(moment('2025-01-15')),
    wedding_full_date: '2025-01-15',
    wedding_full_date_formatted: moment('2025-01-15', 'YYYY-MM-DD').format('DD/MM/YYYY'),
    wedding_date_month: moment('2025-01-15', 'YYYY-MM-DD').format('DD/MM'),
    wedding_period: moment('2025-01-09', 'YYYY-MM-DD').format('MM - YYYY'),
    wedding_lunar_date: this.getLunarInfo(moment('2025-01-15', 'YYYY-MM-DD')).day,
    wedding_lunar_month: this.getLunarInfo(moment('2025-01-15', 'YYYY-MM-DD')).month, 
    wedding_lunar_year: this.getLunarYear(moment('2025-01-15')),
    wedding_time: '00:40',
    wedding_time_formatted: moment('00:40', 'HH:mm').format('HH [GIỜ] mm'),
    wedding_location: 'Khách Sạn Lâm Ký',
    wedding_location_address: '119 Quang Trung, TX Sơn Tây, TP Hà Nội',
    map_url: 'https://maps.app.goo.gl/p9WAszMy5aaUJDgSA',
    invitation_to: 'Bạn + NT (GĐ Bạn)',
    father_groom_name: 'Đỗ Văn Long',
    mother_groom_name: 'Nguyễn Thị Hằng',
    father_bride_name: 'Đỗ Văn Long',
    mother_bride_name: 'Nguyễn Thị Hằng',
    pick_up_time: '09:00',
    service_time: '09:30',
    party_time: '10:00',
    photo_time: '11:30',
    transfer_of_bride_url: 'https://w.ladicdn.com/5c728619c417ab07e5194baa/fd41a4d1-315f-4b19-9665-96911e364677-20240626153947-rede5.jpg',
    transfer_of_groom_url: 'https://w.ladicdn.com/5c728619c417ab07e5194baa/fd41a4d1-315f-4b19-9665-96911e364677-20240626153947-rede5.jpg',
    galleries:[
      {
        title: 'Hình ảnh 1',
        image_url: 'assets/template-1/images/z5583219519965_1979ad524e89caf71ef1f41338abea26-20240628124104-3bfic_1.jpg',
        order: 0
      },
      {
        title: 'Hình ảnh 2',
        image_url: 'assets/template-1/images/z5583219519905_434e7fb2ef3834e2749815a49c2c0705-20240628124104-scio3.jpg',
        order: 1
      },
      {
        title: 'Hình ảnh 3',
        image_url: 'assets/template-1/images/z5583219519901_5cc50ac8a4e76f0660d62ff4e1904c2d-20240628124104-v64oj.jpg',
        order: 2
      },
      {
        title: 'Hình ảnh 4',
        image_url: 'assets/template-1/images/z5583219470385_e91cc9b34b077fa1d5cc2ac5e89ef7e6-20240628124050-mvvma_2.jpg',
        order: 3
      }
    ],
    card_cover_image_url: 'assets/template-1/images/z5583219519953_3d5b2a614d9d83009837386f3a3f214f-20240628124104-a4qfb_1.jpg',
    bride_image_url: 'assets/template-1/images/z5583219569767_b3e44d78c3d50bbbae68064d0512799d-20240628124112-tdout.jpg',
    groom_image_url: 'assets/template-1/images/z5583219519964_a38e7401bc2bbb7be0437b8a0a40c002-20240628124104-hum8q.jpg',
    bride_image_url_2: 'assets/template-1/images/z5583219112577_8a3bd4f6bb564b6dc5adb6456e87a633-20240628123932-averk_1.jpg',
    groom_image_url_2: 'assets/template-1/images/z5583219569699_ca7fb8c85308663a08f868301f084944-20240628124112-xzg8_.jpg',
    memories: [
      {
        title: 'Hình ảnh 1',
        image_url: 'assets/template-1/images/z5583219519965_1979ad524e89caf71ef1f41338abea26-20240628124104-3bfic_2.jpg',
        order: 0
      },
      {
        title: 'Hình ảnh 2',
        image_url: 'assets/template-1/images/z5583219519901_5cc50ac8a4e76f0660d62ff4e1904c2d-20240628124104-v64oj_3.jpg',
        order: 1
      },
      {
        title: 'Hình ảnh 3',
        image_url: 'assets/template-1/images/z5583219519901_5cc50ac8a4e76f0660d62ff4e1904c2d-20240628124104-v64oj_3.jpg',
        order: 2
      },
      {
        title: 'Hình ảnh 4',
        image_url: 'assets/template-1/images/z5583219470385_e91cc9b34b077fa1d5cc2ac5e89ef7e6-20240628124050-mvvma_1.jpg',
        order: 3
      },
      {
        title: 'Hình ảnh 5',
        image_url: 'assets/template-1/images/z5583219569766_68be02dfb4ecdba783b6f40c777811b3-20240628124112-6z5wp_1.jpg',
        order: 4
      },
      {
        title: 'Hình ảnh 6',
        image_url: 'assets/template-1/images/z5583219569680_31db69a10083dca6ee0f5eec5021912c-20240628124112-u47f3.jpg',
        order: 5
      },
      {
        title: 'Hình ảnh 7',
        image_url: 'assets/template-1/images/z5583219519953_3d5b2a614d9d83009837386f3a3f214f-20240628124104-a4qfb.jpg',
        order: 6
      },
      {
        title: 'Hình ảnh 8',
        image_url: 'assets/template-1/images/z5583219569700_517aad9318bc8affb874f060f632f90e-20240628124112-jsfpr.jpg',
        order: 7
      },
      {
        title: 'Hình ảnh 9',
        image_url: 'assets/template-1/images/z5583219519905_434e7fb2ef3834e2749815a49c2c0705-20240628124104-scio3_3.jpg',
        order: 8
      },
      {
        title: 'Hình ảnh 10',
        image_url: 'assets/template-1/images/z5583219569680_31db69a10083dca6ee0f5eec5021912c-20240628124112-u47f3.jpg',
        order: 9
      },
      {
        title: 'Hình ảnh 11',
        image_url: 'assets/template-1/images/z5583219569768_99d02927c47214e732e050063115720c-20240628124112-ljpf7.jpg',
        order: 10
      },
      {
        title: 'Hình ảnh 12',
        image_url: 'assets/template-1/images/z5583219569766_68be02dfb4ecdba783b6f40c777811b3-20240628124112-6z5wp_1.jpg',
        order: 11
      },
      {
        title: 'Hình ảnh 13',
        image_url: 'assets/template-1/images/z5583219367807_ab7c9d63011a1ee4577b056d5cfe9ba4-20240628124032-_9f4w.jpg',
        order: 12
      },
      {
        title: 'Hình ảnh 14',
        image_url: 'assets/template-1/images/z5583219367806_985927542d09f6d1509af5893d1a228c-20240628124032-nx07l_1.jpg',
        order: 13
      }
    ],
    background_video_image_url: 'assets/template-1/images/z5583219164432_981e1b1759655c926afea9680f0cbef7-20240628123950-rmi1q.jpg',
    wedding_video_description: 'Gặp nhiều người ở thời điểm khác nhau cũng không huy hoàng bằng gặp đúng người đúng thời điểm.',
    popup_video_description: 'Chúng tôi luôn có những kỷ niệm tuyệt vời cùng nhau, dù ở bất cứ đâu, hay là bất cứ khi nào ♥️',
    background_youtube_url: 'assets/template-1/images/z5583219214826_545fe7b6be49b28c836d432daa6028a0-20240628124015-0a6m-.jpg',
    youtube_url: 'https://www.youtube.com/watch?v=vt-YPnXV8WM',
    facebook_bride_url: 'https://www.facebook.com/ankhang9916',
    facebook_groom_url: 'https://www.facebook.com/ankhang9916',
    wish_text: `Gặp gỡ, yêu và cưới. Điều bạn vừa nghe không nằm trong một câu chuyện cổ tích, mà chính là câu chuyện về cuộc đời hai chúng tôi
    Chúng tôi sẽ yêu thương, chăm sóc, trân trọng và nắm tay nhau cùng đi đến hết cuộc đời này.
    Thật là một niềm vinh hạnh lớn khi ngày hạnh phúc nhất cuộc đời chúng tôi có sự hiện diện và chúc phúc của bạn!
    Chân thành cảm ơn bạn ♥ ♥ 
    `,
    background_wish_image_url: 'assets/template-1/images/z5583219519901_5cc50ac8a4e76f0660d62ff4e1904c2d-20240628124104-v64oj_2.jpg',
    background_wish_image_url_2: 'assets/template-1/images/z5583219519905_434e7fb2ef3834e2749815a49c2c0705-20240628124104-scio3_2.jpg',
    event_image_url: 'assets/template-1/images/86a5de5ed02ca2-idy07358-20240427063946-69qxh.jpg',
    wedding_ceremony_image_url: 'assets/template-1/images/z5583219519965_1979ad524e89caf71ef1f41338abea26-20240628124104-3bfic_3.jpg',
    invitation_text: `Đám cưới sẽ trọn vẹn và ý nghĩa hơn khi có sự hiện diện và chúc phúc của bạn. Hãy xác nhận sự có mặt của bạn để
      Tú & Anh chuẩn bị đón tiếp bạn chu đáo nhất nha ♥️`,
    background_footer_image_url: 'assets/template-1/images/z5583219519905_434e7fb2ef3834e2749815a49c2c0705-20240628124104-scio3_2.jpg',
  };

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

  private getLunarYear(date: moment.Moment): string {
    const lunarYear = date.lunar().year();
    
    const canIndex = (lunarYear - 4) % 10; // Công thức tính Can
    const chiIndex = (lunarYear - 4) % 12; // Công thức tính Chi
    
    return `${this.CAN[canIndex]} ${this.CHI[chiIndex]}`;
  }

  ngOnInit() {
    if (this.formData.wedding_date && this.formData.wedding_month && this.formData.wedding_year) {
      this.countdown = moment(this.formData.wedding_full_date + ' ' + this.formData.wedding_time, 'YYYY-MM-DD HH:mm').diff(moment().utcOffset('+0700'), 'minutes');
    }
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
      this.elementRef.nativeElement.appendChild(styleElement);
    });

    // Add event data script
    let eventData = EVENT_DATA
      .replace('[URL_YOUTUBE]', this.formData.youtube_url ? `"${this.formData.youtube_url}"` : '')
      .replace('[COUNTDOWN]', this.countdown > 0 ? this.countdown : '');

    console.log(this.countdown);

    const scriptEventData = document.createElement('script');
    scriptEventData.id = 'script_event_data';
    scriptEventData.type = 'application/json';
    scriptEventData.textContent = eventData;
    this.elementRef.nativeElement.appendChild(scriptEventData);

    // Add event listeners for user interaction
    this.initializeLadiPage();

    this.loadScripts();

    // Initialize calendar
    this.selectedDate = moment(`${this.formData.wedding_year}-${this.formData.wedding_month}-${this.formData.wedding_date}`);
    this.currentMonth = this.selectedDate.clone().startOf('month');
    this.generateCalendar();

    // Load galleries
    this.loadImages();
  }

  loadImages() {
    const imageMap = {
      // Galleries
      'GALLERY2': this.formData.galleries,
      'GALLERY1': this.formData.memories,

      // Single images
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
      'IMAGE4': this.formData.logo_url
    };

    // Load galleries
    ['GALLERY1', 'GALLERY2'].forEach(galleryId => {
      const images = imageMap[galleryId as keyof typeof imageMap];
      images.forEach((image: any) => {
        const viewItem = document.querySelector(`#${galleryId} .ladi-gallery-view-item[data-index="${image.order}"]`) as HTMLElement;
        const controlItem = document.querySelector(`#${galleryId} .ladi-gallery-control-item[data-index="${image.order}"]`) as HTMLElement;
        
        if (viewItem) {
          viewItem.style.backgroundImage = `url(${image.image_url})`;
        }
        if (controlItem) {
          controlItem.style.backgroundImage = `url(${image.image_url})`;
        }
      });
    });

    // Load single images
    Object.entries(imageMap).forEach(([id, url]) => {
      if (id.startsWith('IMAGE')) {
        const element = document.querySelector(`#${id} .ladi-image-background`) as HTMLElement;
        if (element) {
          element.style.backgroundImage = `url(${url})`;
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
          isSelected: date.isSame(this.selectedDate, 'day'),
          isToday: date.isSame(moment(), 'day')
        });
        date.add(1, 'day');
      }
      
      this.calendar.push(week);
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
      month: lunar.month() + 1, // lunar months are 0-based
      year: lunar.year()
    };
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
    return date.isSame(this.selectedDate, 'day');
  }
}
