import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAddUsers]'
})
export class AddUsersDirective {
  @Input('appAddUsers') selectedUsersIds: Set<string> = new Set<string>()
  @Input() userId = ''

  @Output() patchSelectedUsers = new EventEmitter<string>()
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onSelectUserId() {
    if (this.selectedUsersIds.has(this.userId)) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'active')
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'active')
    }
    this.patchSelectedUsers.emit(this.userId)
  }
}
