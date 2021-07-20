import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {


  readonly gameForm: FormGroup;

  @Output() submitWord: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {
    this.gameForm = this.createGameForm();
  }
  ngOnInit(): void {
  }
  private createGameForm(): FormGroup {
    return this.fb.group({
      word: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z]+$")]]
    });
  }

  get wordControl(): FormControl {
    return this.gameForm.get("word") as FormControl;
  }

  getErrorMessage(name: string): string {
    const ctl = this.gameForm.get(name) as FormControl;
    if (ctl.hasError("required")) {
      return "please enter.";
    }
    if (ctl.hasError("maxlength")) {
      return `please enter within ${ctl.errors.maxlength.requiredLength} characters maximum.`;
    }
    if (ctl.hasError("pattern")) {
      return "please enter in alphabet.";
    }
  }

  submitGameForm() {
    if (this.gameForm.invalid) {
      return;
    }
    this.submitWord.emit(this.wordControl.value);
  }
}
