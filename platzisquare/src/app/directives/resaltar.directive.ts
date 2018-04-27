import { Directive, OnInit, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
    selector: '[resaltar]'
})
export class ResaltarDirective implements OnInit {
    constructor(private elRef: ElementRef, private redered: Renderer2) { }
    @Input('resaltar') plan: string = '';
    ngOnInit() {
        if (this.plan === 'pagado') {
            this.redered.setStyle(this.elRef.nativeElement, 'background-color', 'pink');
            this.redered.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
        }
    }
}