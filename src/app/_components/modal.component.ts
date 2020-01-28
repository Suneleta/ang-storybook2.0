import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../_services';

@Component({
    selector: 'tfm-modal',
    template: 
        `
        <div class="tfm-modal--bg">
          <div class="tfm-modal fadeInDown">
            <div class="tfm-modal--header">
              <h3 class="tfm-modal--header_title">Space</h3>
              <span id="x" class="tfm-modal--header_close-icon vy-icon-close">X</span>
            </div>
            <div class="tfm-modal--body">
              <div class="tfm-modal--body_content">
                <div class="tfm-modal--body_description">
                  <div class="tfm-modal--body_description-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo ut augue sit amet dignissim. Aenean eget fringilla nisi. Sed elementum viverra diam eget aliquam. Sed condimentum sem sit amet diam pharetra dignissim. Vivamus aliquet, nisi in lacinia auctor, ex lacus euismod lectus, sodales dapibus libero diam at lorem. Nunc elit lorem, scelerisque quis urna non, vehicula laoreet elit. Pellentesque molestie gravida tortor, at ultrices enim fringilla eget. Nulla id sagittis urna. Fusce a justo eros. Sed aliquam, odio in efficitur egestas, felis risus consequat nisl, at viverra metus ex at eros. Sed porttitor urna ac ligula tristique ultrices. Phasellus vitae pharetra nibh, ac scelerisque ex.</p>
                  </div>
                </div>
              </div>
              <div class="tfm-modal--footer">
                <div class="c2aEndSection tfm-modal--footer_close-button">
                  <a href="#" title="aceptar" class="btn--solid">Cerrar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;
        this.element.style.display = 'none';

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'tfm-modal--bg') {
                modal.close();
            }
        });
        this.element.addEventListener('click', function (f: any) {
            if (f.target.id === 'x') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('tfm-modal');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.add('body');
    }
}