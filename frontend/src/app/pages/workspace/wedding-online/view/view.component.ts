import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PermissionService } from 'src/app/services/permission.service';
import * as moment from 'moment';
import { HeaderService } from 'src/app/services/header.service';
import 'moment-lunar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  constructor(
    private router: Router,
    private headerService: HeaderService,
    private elementRef: ElementRef,
    public permissionService: PermissionService,
    private route: ActivatedRoute
  ){
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

  public modelId: number = 0;
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

  public weddingOnline: any = {};
  public formData: any = {
    slug: '',
    title: '',
    logo_url: '',
    bride_name: '',
    groom_name: '',
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
    wedding_location: '',
    wedding_location_address: '',
    map_url: '',
    invitation_to: '',
    father_groom_name: '',
    mother_groom_name: '',
    father_bride_name: '',
    mother_bride_name: '',
    pick_up_time: '',
    service_time: '',
    party_time: '',
    photo_time: '',
    transfer_of_bride_url: '',
    transfer_of_groom_url: '',
    card_cover_image_url: '',
    bride_image_url: '',
    groom_image_url: '',
    bride_image_url_2: '',
    groom_image_url_2: '',
    background_video_image_url: '',
    wedding_video_description: '',
    popup_video_description: '',
    background_youtube_url: '',
    youtube_url: '',
    facebook_bride_url: '',
    facebook_groom_url: '',
    wish_text: '',
    background_wish_image_url: '',
    background_wish_image_url_2: '',
    event_image_url: '',
    wedding_ceremony_image_url: '',
    invitation_text: '',
    background_footer_image_url: '',
    galleries:[],
    memories: [],
    dress_codes: [],
    bank_account_bride: '',
    bank_account_groom: '',
  };

  public approvalForm: any = {
    status: '',
    rejection_reason: '',
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
    this.weddingFullDate = event.target.value;
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
        formData.append(`memories[${index}][id]`, value.id);
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
        formData.append(`galleries[${index}][id]`, value.id);
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
        formData.append(`dress_codes[${index}][id]`, value.id);
        formData.append(`dress_codes[${index}][title]`, value.title);
        formData.append(`dress_codes[${index}][color]`, value.color);
      });
      formData.append('_method', 'PUT');

      axios.post(`${environment.api_url}/work-space/wedding-onlines/${this.modelId}`, formData, {
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
              }

              this.router.navigateByUrl('/wedding-online');
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

  getWeddingOnline() {
    this.loading = true;
    axios.get(`${environment.api_url}/work-space/wedding-onlines/${this.modelId}`, {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
        },
    })
        .then((response) => {
            if (response.data.error) {
                if (response.data.error_code == '404') {
                    this.router.navigateByUrl('/not-found');
                } else {
                    this.errorMessages = response.data.error_message;
                }
                return;
            }

            this.weddingOnline = response.data.wedding_online;
            this.formData.slug = this.weddingOnline.slug;
            this.formData.title = this.weddingOnline.title;
            this.formData.logo_url = this.weddingOnline.logo_url_signed;
            this.formData.bride_name = this.weddingOnline.bride_name;
            this.formData.groom_name = this.weddingOnline.groom_name;
            this.formData.wedding_date = this.weddingOnline.wedding_date;
            this.formData.wedding_month = this.weddingOnline.wedding_month;
            this.formData.wedding_year = this.weddingOnline.wedding_year;
            this.formData.wedding_day = this.weddingOnline.wedding_day;
            this.formData.wedding_full_date = this.weddingOnline.wedding_full_date;
            this.formData.wedding_full_date_formatted = this.weddingOnline.wedding_full_date_formatted;
            this.formData.wedding_date_month = this.weddingOnline.wedding_date_month;
            this.formData.wedding_period = this.weddingOnline.wedding_period;
            this.formData.wedding_lunar_full_date = this.weddingOnline.wedding_lunar_full_date;
            this.formData.wedding_lunar_full_date_formatted = this.weddingOnline.wedding_lunar_full_date_formatted;
            this.formData.wedding_lunar_date = this.weddingOnline.wedding_lunar_date;
            this.formData.wedding_lunar_month = this.weddingOnline.wedding_lunar_month;
            this.formData.wedding_lunar_year = this.weddingOnline.wedding_lunar_year;
            this.formData.wedding_time = this.weddingOnline.wedding_time;
            this.formData.wedding_location = this.weddingOnline.wedding_location;
            this.formData.wedding_location_address = this.weddingOnline.wedding_location_address;
            this.formData.map_url = this.weddingOnline.map_url;
            this.formData.invitation_to = this.weddingOnline.invitation_to;
            this.formData.father_groom_name = this.weddingOnline.father_groom_name;
            this.formData.mother_groom_name = this.weddingOnline.mother_groom_name;
            this.formData.father_bride_name = this.weddingOnline.father_bride_name;
            this.formData.mother_bride_name = this.weddingOnline.mother_bride_name;
            this.formData.pick_up_time = this.weddingOnline.pick_up_time;
            this.formData.service_time = this.weddingOnline.service_time;
            this.formData.party_time = this.weddingOnline.party_time;
            this.formData.photo_time = this.weddingOnline.photo_time;
            this.formData.transfer_of_bride_url = this.weddingOnline.transfer_of_bride_url_signed;
            this.formData.transfer_of_groom_url = this.weddingOnline.transfer_of_groom_url_signed;
            this.formData.card_cover_image_url = this.weddingOnline.card_cover_image_url_signed;
            this.formData.bride_image_url = this.weddingOnline.bride_image_url_signed;
            this.formData.groom_image_url = this.weddingOnline.groom_image_url_signed;
            this.formData.bride_image_url_2 = this.weddingOnline.bride_image_url_2_signed;
            this.formData.groom_image_url_2 = this.weddingOnline.groom_image_url_2_signed;

            this.formData.background_video_image_url = this.weddingOnline.background_video_image_url_signed;
            this.formData.wedding_video_description = this.weddingOnline.wedding_video_description;
            this.formData.popup_video_description = this.weddingOnline.popup_video_description;
            this.formData.background_youtube_url = this.weddingOnline.background_youtube_url_signed;
            this.formData.youtube_url = this.weddingOnline.youtube_url;
            this.formData.facebook_bride_url = this.weddingOnline.facebook_bride_url;
            this.formData.facebook_groom_url = this.weddingOnline.facebook_groom_url;
            this.formData.wish_text = this.weddingOnline.wish_text;
            this.formData.background_wish_image_url = this.weddingOnline.background_wish_image_url_signed;
            this.formData.background_wish_image_url_2 = this.weddingOnline.background_wish_image_url_2_signed;
            this.formData.event_image_url = this.weddingOnline.event_image_url_signed;
            this.formData.wedding_ceremony_image_url = this.weddingOnline.wedding_ceremony_image_url_signed;
            this.formData.invitation_text = this.weddingOnline.invitation_text;
            this.formData.background_footer_image_url = this.weddingOnline.background_footer_image_url_signed;
            this.formData.bank_account_bride = this.weddingOnline.bank_account_bride;
            this.formData.bank_account_groom = this.weddingOnline.bank_account_groom;
            
            this.formData.galleries = this.weddingOnline.galleries.map((gallery: any) => ({
              ...gallery,
              image_url: gallery.image_url_signed
            }));
            this.formData.memories = this.weddingOnline.memories.map((memory: any) => ({
              ...memory,
              image_url: memory.image_url_signed
            }));

            this.formData.dress_codes = this.weddingOnline.dress_codes.map((dress_code: any) => ({
              ...dress_code,
              color: dress_code.color
            }));

            this.loading = false;
        })
        .catch((error) => {
            this.errorMessages = error.response.data.error_message;
            this.loading = false;
        });
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

  ngOnInit() {
    this.modelId = this.route.snapshot.params['id'];
    this.getWeddingOnline();
  }

  async updateStatus(action: string) {

    var confirmMessage = '';
    var actionForm = '';
    if (action == 'submit') {
      confirmMessage = 'Are you sure you want to submit?';
      actionForm = 'Submitted';
    } else if (action == 'approval') {
      if (this.approvalForm.status == 'Inactive') {
        confirmMessage = 'Are you sure you want to inactive?';
        actionForm = 'Inactive';
      } else {
        confirmMessage = 'Are you sure you want to activate?';
        actionForm = 'Activate';
      }
    } 

    if (confirm(confirmMessage)) {
      this.loading = true;
      this.errorMessages = [];
      this.successMessage = '';

      await axios.post(`${environment.api_url}/work-space/wedding-onlines/${this.modelId}/update-status`, {
        action: actionForm,
        status: this.approvalForm.status,
        rejection_reason: this.approvalForm.rejection_reason
      }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(environment.api_token_identifier)}`
        }
      })
      .then((response) => {
        if (response.data.error) {
          this.errorMessages = response.data.error_message;
          this.loading = false;
          return;
        }

        this.loading = false;
        if (actionForm == 'Submitted') {
          this.successMessage = 'Wedding online submitted successfully';
        } else if (actionForm == 'Activate') {
          this.successMessage = 'Wedding online activated successfully';
        } else if (actionForm == 'Inactive') {
          this.successMessage = 'Wedding online inactived successfully';
        }

        this.getWeddingOnline();
      })
      .catch((error) => {
          this.errorMessages = error.response.data.error_message;
          this.loading = false;
        });
    }
  }
}
