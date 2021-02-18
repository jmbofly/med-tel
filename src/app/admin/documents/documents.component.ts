import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { DocumentService, AdminDocument } from '../services/document.service';
import { DATA } from '../services/mach/documents.mach';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit {
  tableConfiguration: any;
  tableColumns: any;
  documentsData: any = [];
  modalRef: BsModalRef;
  editDoc = false;
  selectedDocument: AdminDocument;
  // currentDate: Date = new Date();
  constructor(private docServices: DocumentService, private modal: BsModalService) { }

  createDocument(type: string, author: string, data: any) {
    this.docServices.createDocument(type, author, data);
  }
  async edit(doc: any) {
    this.editDoc = true;
    await this.docServices.update(doc.type, doc.id, doc.data);
    this.editDoc = false;
  }

  async delete(doc: any) {
    await this.docServices.delete(doc.type, doc.id);
  }
  selectDocument(event, template) {
    console.log("DocumentsComponent -> selectDocument -> event", event)
    this.selectedDocument = DATA.filter((data: any) => data.id === event.value.row.id)[0]
    this.modalRef = this.modal.show(template, {animated: true, class: 'documents-view-modal' })
  }

  displayDocument(type: string, doc: AdminDocument) {
  }
  ngOnInit(): void {
    this.documentsData = DATA;
    this.tableConfiguration = { ...DefaultConfig, draggable: true };
    this.tableColumns = [
      { key: 'id', title: '#' },
      { key: 'type', title: 'Type' },
      { key: 'author', title: 'Author' },
      { key: 'date', title: 'Date'},
    ]
  }

}
