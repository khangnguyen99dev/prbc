import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';
import 'moment-lunar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(
      private router: Router,
      private headerService: HeaderService,
      private elementRef: ElementRef,
      public permissionService: PermissionService
  ) {
      this.headerService.setupHeader([
          {
              title: 'Work Space',
          },
          {
              title: 'Wedding Online',
              link: '/wedding-online',
          },
          {
              title: 'New Wedding Online',
          },
      ]);
  }

  public loading: boolean = false;
  public errorMessages: string[] = [];
  public successMessage: string = '';

  currentMonth: moment.Moment = moment();
  calendar: any[][] = [];
  weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  private CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  private CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  selectedDate: moment.Moment = moment();
  countdown: any = 0;

  weddingFullDate: string = moment().format('YYYY-MM-DD');

  public dressCodes: any[] = [];
  public formData: any = {
    slug: 'anh-tu-va-phuong-anh',
    title: 'THÂN MỜI TỚI DỰ BỮA TIỆC',
    bride_name: 'Phương Anh',
    groom_name: 'Anh Tú',
    wedding_date: moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD'),
    wedding_month: moment(this.weddingFullDate, 'YYYY-MM-DD').format('MM'),
    wedding_year: moment(this.weddingFullDate, 'YYYY-MM-DD').format('YYYY'),
    wedding_day: this.getDayOfWeekText(moment(this.weddingFullDate)),
    wedding_full_date: this.weddingFullDate,
    wedding_full_date_formatted: moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
    wedding_date_month: moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD/MM'),
    wedding_period: moment(this.weddingFullDate, 'YYYY-MM-DD').format('MM - YYYY'),
    wedding_lunar_full_date: moment(this.weddingFullDate, 'YYYY-MM-DD').lunar().format('YYYY-MM-DD'),
    wedding_lunar_full_date_formatted: moment(this.weddingFullDate, 'YYYY-MM-DD').lunar().format('DD/MM/YYYY'),
    wedding_lunar_date: this.getLunarInfo(moment(this.weddingFullDate, 'YYYY-MM-DD')).day,
    wedding_lunar_month: this.getLunarInfo(moment(this.weddingFullDate, 'YYYY-MM-DD')).month, 
    wedding_lunar_year: this.getLunarYear(moment(this.weddingFullDate, 'YYYY-MM-DD')),
    wedding_time: '',
    wedding_location: 'Khách Sạn Lâm Ký',
    wedding_location_address: '119 Quang Trung, TX Sơn Tây, TP Hà Nội',
    map_url: 'https://maps.app.goo.gl/p9WAszMy5aaUJDgSA',
    invitation_to: 'Bạn + NT (GĐ Bạn)',
    father_groom_name: 'Đỗ Văn Long',
    mother_groom_name: 'Nguyễn Thị Hằng',
    father_bride_name: 'Đỗ Văn Long',
    mother_bride_name: 'Nguyễn Thị Hằng',
    pick_up_time: '',
    service_time: '',
    party_time: '',
    photo_time: '',
    wedding_video_description: 'Gặp nhiều người ở thời điểm khác nhau cũng không huy hoàng bằng gặp đúng người đúng thời điểm.',
    popup_video_description: 'Chúng tôi luôn có những kỷ niệm tuyệt vời cùng nhau, dù ở bất cứ đâu, hay là bất cứ khi nào ♥️',
    youtube_url: 'https://www.youtube.com/watch?v=vt-YPnXV8WM',
    facebook_bride_url: 'https://www.facebook.com/ankhang9916',
    facebook_groom_url: 'https://www.facebook.com/ankhang9916',
    wish_text: 
    `Gặp gỡ, yêu và cưới. Điều bạn vừa nghe không nằm trong một câu chuyện cổ tích, mà chính là câu chuyện về cuộc đời hai chúng tôi
Chúng tôi sẽ yêu thương, chăm sóc, trân trọng và nắm tay nhau cùng đi đến hết cuộc đời này.
Thật là một niềm vinh hạnh lớn khi ngày hạnh phúc nhất cuộc đời chúng tôi có sự hiện diện và chúc phúc của bạn!
Chân thành cảm ơn bạn ♥ ♥ `,
    invitation_text: 
    `Đám cưới sẽ trọn vẹn và ý nghĩa hơn khi có sự hiện diện và chúc phúc của bạn. Hãy xác nhận sự có mặt của bạn để
Tú & Anh chuẩn bị đón tiếp bạn chu đáo nhất nha ♥️`,
    galleries:[
      {
        title: 'Hình ảnh 1',
        image_url: '',
        order: 0,
        is_active: true
      }
    ],
    memories: [
      {
        title: 'Kỷ niệm 1',
        image_url: '',
        order: 0,
        is_active: true
      }
    ],
    dress_codes: [],
    bank_account_bride: '',
    bank_account_groom: '',
    // url file
    logo_url: '',
    transfer_of_bride_url: '',
    transfer_of_groom_url: '',
    card_cover_image_url: '',
    bride_image_url: '',
    groom_image_url: '',
    bride_image_url_2: '',
    groom_image_url_2: '',
    background_video_image_url: '',
    background_youtube_url: '',
    background_wish_image_url: '',
    background_wish_image_url_2: '',
    event_image_url: '',
    wedding_ceremony_image_url: '',
    background_footer_image_url: '',
   
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

  private getLunarYear(date: moment.Moment): string {
    const lunarYear = date.lunar().year();
    
    const canIndex = (lunarYear - 4) % 10; // Công thức tính Can
    const chiIndex = (lunarYear - 4) % 12; // Công thức tính Chi
    
    return `${this.CAN[canIndex]} ${this.CHI[chiIndex]}`;
  }

  onWeddingDateChange(event: any) {
    this.weddingFullDate = moment(event.target.value).format('YYYY-MM-DD');
    this.formData.wedding_lunar_full_date = moment(this.weddingFullDate, 'YYYY-MM-DD').lunar().format('YYYY-MM-DD');
    this.formData.wedding_lunar_full_date_formatted = moment(this.weddingFullDate, 'YYYY-MM-DD').lunar().format('DD/MM/YYYY');
    this.formData.wedding_lunar_date = this.getLunarInfo(moment(this.weddingFullDate, 'YYYY-MM-DD')).day;
    this.formData.wedding_lunar_month = this.getLunarInfo(moment(this.weddingFullDate, 'YYYY-MM-DD')).month;
    this.formData.wedding_lunar_year = this.getLunarYear(moment(this.weddingFullDate, 'YYYY-MM-DD'));
    this.formData.wedding_date = moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD');
    this.formData.wedding_month = moment(this.weddingFullDate, 'YYYY-MM-DD').format('MM');
    this.formData.wedding_year = moment(this.weddingFullDate, 'YYYY-MM-DD').format('YYYY');
    this.formData.wedding_day = this.getDayOfWeekText(moment(this.weddingFullDate, 'YYYY-MM-DD'));
    this.formData.wedding_full_date = this.weddingFullDate;
    this.formData.wedding_full_date_formatted = moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
    this.formData.wedding_date_month = moment(this.weddingFullDate, 'YYYY-MM-DD').format('DD/MM');
    this.formData.wedding_period = moment(this.weddingFullDate, 'YYYY-MM-DD').format('MM - YYYY');
  }


  ngOnInit() {

  }

  save() {
      this.errorMessages = [];
      // this.loading = true;

      const formData = new FormData();
      Object.keys(this.formData).forEach(key => {
        formData.append(key, this.formData[key]);

        const fileFields = [
          'logo_url',
          'transfer_of_bride_url',
          'transfer_of_groom_url', 
          'card_cover_image_url',
          'bride_image_url',
          'groom_image_url',
          'bride_image_url_2',
          'groom_image_url_2',
          'background_video_image_url',
          'background_youtube_url',
          'background_wish_image_url',
          'background_wish_image_url_2',
          'event_image_url',
          'wedding_ceremony_image_url',
          'background_footer_image_url'
        ];

        const fileKey = `${key}_file`;
        if (fileFields.includes(key.replace('_file', '')) && this.formData[fileKey] instanceof File) {
          formData.append(fileKey, this.formData[fileKey]);
        }
      });

      this.formData.memories.forEach((value: any, index: any) => {
        formData.append(`memories[${index}][title]`, value.title);
        formData.append(`memories[${index}][image_url]`, value.image_url);
        const fileMemoryKey = `memories[${index}][image_file]`;
        if (value.image_url_file instanceof File) {
          formData.append(fileMemoryKey, value.image_url_file);
        }
        formData.append(`memories[${index}][order]`, value.order);
        formData.append(`memories[${index}][is_active]`, value.is_active);
      });

      this.formData.galleries.forEach((value: any, index: any) => {
        formData.append(`galleries[${index}][title]`, value.title);
        formData.append(`galleries[${index}][image_url]`, value.image_url);
        const fileGalleryKey = `galleries[${index}][image_file]`;
        if (value.image_url_file instanceof File) {
          formData.append(fileGalleryKey, value.image_url_file);
        }
        formData.append(`galleries[${index}][order]`, value.order);
        formData.append(`galleries[${index}][is_active]`, value.is_active);
      });

      this.formData.dress_codes.forEach((value: any, index: any) => {
        formData.append(`dress_codes[${index}][title]`, value.title);
        formData.append(`dress_codes[${index}][color]`, value.color);
      });

      axios.post(`${environment.api_url}/work-space/wedding-onlines`, formData, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
          }
      })
          .then(response => {
              if (response.data.error) {
                  this.errorMessages.push(response.data.error_message);
                  window.scrollTo(0, 0);
                  this.loading = false;
                  this.clearMessages();
                  return;
              }else{
                this.successMessage = 'Wedding online created successfully';
                // this.router.navigateByUrl('/wedding-online');
              }
          })
          .catch(error => {
              console.error(error);
              if (error.response.status == 422) {
                  Object.keys(error.response.data.errors).forEach(key => {
                      this.errorMessages.push(error.response.data.errors[key]);
                  });
              } else {
                  this.errorMessages.push('Sorry, something went wrong. Please try again later.');
              }
              window.scrollTo(0, 0);
              this.loading = false;
              this.clearMessages();
          });
  }

  clearMessages() {
    setTimeout(() => {
        this.successMessage = '';
    }, 3500);
  }

  deleteGallery(index: number) {
    this.formData.galleries.splice(index, 1);
    
    // Reset order for remaining galleries
    this.formData.galleries.forEach((gallery: any, i: number) => {
      gallery.order = i;
    });
  }

  addGallery() {
    const nextOrder = this.formData.galleries.length > 0 
      ? Math.max(...this.formData.galleries.map((g: any) => g.order)) + 1 
      : 0;

    this.formData.galleries.push({
      title: '',
      image_url: '',
      order: nextOrder,
      is_active: true
    });
  }

  deleteMemory(index: number) {
    this.formData.memories.splice(index, 1);

    this.formData.memories.forEach((memory: any, i: number) => {
      memory.order = i;
    });
  }

  addMemory() {
    const nextOrder = this.formData.memories.length > 0 
      ? Math.max(...this.formData.memories.map((m: any) => m.order)) + 1 
      : 0;

    this.formData.memories.push({
      title: '',
      image_url: '',
      order: nextOrder,
      is_active: true
    });
  }

  onImageChange(event: any, data: any, key: string | null = null) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
        if (key) {
          data[key] = e.target.result;
          data[key + '_file'] = file;
        } else {
          data.image_url = e.target.result;
          data.image = file;
        }
    };
    reader.readAsDataURL(file);
  }

  removeImage(data: any, key: string | null = null) {
    if (key) {
      data[key] = null;
      data[key + '_file'] = null;
    } else {
      data.image_url = null;
      data.image = null;
    }
  }

  addDressCode() {
    this.formData.dress_codes.push({
      title: '',
      color: '#000000',
    });
  }

  deleteDressCode(index: number) {
    this.formData.dress_codes.splice(index, 1);
  }
}
