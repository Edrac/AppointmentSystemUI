import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiAppointmentService } from 'src/app/core/services/api/appointment/api.appointment.service';
import { Appointments } from 'src/app/shared/interfaces/appointments';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();
  public registrationForm: FormGroup;
  public message: string | undefined;
  public messageType: string = 'info';
  public appointments: Array<Appointments> = new Array();
  private _currentMonth: Array<Date> = new Array();
  // set to any since otherwise, the ngFor will give the following message:
  // Type 'Date' is not assignable to type 'NgIterable<any> | null | undefined
  public weekGrid: Array<any> = new Array();
  public weekGridIt: number = 0;
  public timeSlots: Array<TimeSlot> = new Array();

  public showPrompt: boolean = false;
  public selectedDate: { from: Date, to: Date } | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiAppointmentService: ApiAppointmentService,
    private _router: Router,
  ) {
    this.setupGridDate(new Date(Date.now()));
    this.fillTimeSlots();

    this.registrationForm = _formBuilder.group(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }
    );

  }


  setupGridDate(date: Date) {
    this._currentMonth = this.getAllDaysInMonth(date.getFullYear(), date.getMonth());
    this.fillGridDates(this._currentMonth);
    this.weekGrid = this.createWeekGrid(this._currentMonth);
  }

  ngOnInit(): void {
    (<any>window).ctrl = this;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  previousWeek() {
    if (this.weekGridIt == 0) {
      //load previous month with the last week loaded
      this.setupGridDate(this.weekGrid[this.weekGridIt][0]);
      this.weekGridIt = this.weekGrid.length - 1;
    } else {
      this.weekGridIt--;
    }
  }

  nextWeek() {
    if (this.weekGridIt + 1 == this.weekGrid.length) {
      //load next month with the first week loaded
      this.setupGridDate(this.weekGrid[this.weekGridIt][6]);
      this.weekGridIt = 0;
    } else {
      this.weekGridIt++;
    }
  }

  getDayName(day: Date): string {
    let locale = typeof navigator.language == 'string' ? navigator.language : navigator.language[0];
    return day.toLocaleDateString(locale, { weekday: 'long' });
  }

  formatNumberToTime(t: number): string {
    return t < 10 ? `0${t}` : `${t}`;
  }

  fillTimeSlots() {
    let startMinutes = 8 * 60; // 8am
    let endMinutes = 6 * 60; //6pm

    let max = 24 * 60 - endMinutes;
    let interval = 30;
    for (let minutes = startMinutes; minutes < max;) {
      let hours = Math.floor(minutes / 60);
      let min = minutes % 60;
      let from = `${this.formatNumberToTime(hours)}:${this.formatNumberToTime(min)}`;

      minutes = minutes + interval;

      hours = Math.floor(minutes / 60);
      min = minutes % 60;
      let to = `${this.formatNumberToTime(hours)}:${this.formatNumberToTime(min)}`;

      let slot: TimeSlot = {
        from: from,
        to: to,
        disabled: false,
      }
      this.timeSlots.push(slot);
    }
  }

  createWeekGrid(datesArray: Array<Date>) {
    let month = new Array();
    let week = new Array();
    for (let index = 0; index < datesArray.length; index++) {
      if (week.length == 7) {
        month.push(week);
        week = new Array();
      }
      week.push(datesArray[index]);
    }

    return month;
  }

  fillGridDates(datesArray: Array<Date>) {
    // we find out which day is the first element in the array
    let daysToFill = datesArray[0].getDay();
    let missingDays: Array<Date> = new Array();
    let d = new Date(datesArray[0]);
    let fillingDate = d.setDate(d.getDate() - daysToFill);
    for (let index = 0; index < daysToFill; index++) {
      missingDays.push(new Date(fillingDate));
      d = new Date(fillingDate);
      fillingDate = d.setDate(d.getDate() + 1);
    }
    datesArray.unshift(...missingDays);

    //filling the days that are on the next month
    d = datesArray[datesArray.length - 1];
    for (; d.getDay() > 1;) {
      d = new Date(d.setDate(d.getDate() + 1));
      datesArray.push(d);
    }
  }

  getAllDaysInMonth(year: number, month: number) {
    let date = new Date(year, month, 1);
    let dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  book(week: Date, timeSlot: TimeSlot) {
    this.showPrompt = true;

    let from = new Date(week);
    let tsFrom = timeSlot.from.split(':');
    from.setHours(parseInt(tsFrom[0]));
    from.setMinutes(parseInt(tsFrom[1]));

    let to = new Date(week);
    let tsTo = timeSlot.to.split(':');
    to.setHours(parseInt(tsTo[0]));
    to.setMinutes(parseInt(tsTo[1]));

    this.selectedDate = {
      from: from,
      to: to,
    }
  }

  cancel() {
    this.showPrompt = false;
  }

  getRangeDisplay(): string {
    return `from: ${this.selectedDate?.from.toDateString()} ${this.selectedDate?.from.toLocaleTimeString()} to: ${this.selectedDate?.to.toDateString()} ${this.selectedDate?.to.toLocaleTimeString()}`;
  }

  getAvailableDates(): void {
    // this._subscriptions.add(
    //   this._apiAppointmentService.getAppointments(this.registrationForm.controls['id'].value)
    //     .subscribe(
    //       (resp: Array<Appointments>) => {
    //         if (resp?.length == 0) {
    //           this.message = 'No appointments found';
    //           this.messageType = 'info';
    //         }
    //         this.appointments = resp;
    //       },
    //       (error) => {
    //         this.message = error;
    //         this.messageType = 'danger';
    //       }
    //     )
    // );
  }

}
interface TimeSlot {
  from: string,
  to: string,
  disabled: boolean,
}
