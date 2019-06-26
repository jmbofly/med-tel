import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() loggedIn: Observable<boolean>;
  @Input() status: string;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}
}
