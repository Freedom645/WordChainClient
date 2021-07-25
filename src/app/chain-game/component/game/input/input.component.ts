import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
      word: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z]+$"), (c) => this.notExistWord(c), (c) => this.isUsedWord(c), (c) => this.isNotMatchPrefix(c)]]
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
    if (ctl.hasError("notExistWord")) {
      return "this word is not exist.";
    }
    if (ctl.hasError("isUsedWord")) {
      return "this word is already used.";
    }
    if (ctl.hasError("isNotMatchPrefix")) {
      return `you should enter words that begin with the letter '${ctl.errors.isNotMatchPrefix}'.`;
    }
    return "";
  }

  submitGameForm() {
    if (this.gameForm.invalid) {
      return;
    }
    if (this.usedWordList.has(this.wordControl.value)) {
      this.wordControl.setValue(this.wordControl.value);
      return;
    }
    if (!this.wordControl.value.startsWith(this.nextPrefix)) {
      this.wordControl.setValue(this.wordControl.value);
      return;
    }
    this.submitWord.emit(this.wordControl.value);
  }

  // 存在チェック系
  private readonly notExistWordList = new Set<string>();
  private notExistWord(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (this.notExistWordList.has(value)) {
      return { notExistWord: value };
    }
    return null;
  }

  public addNotExistWord(word: string): void {
    this.notExistWordList.add(word);
    this.wordControl.setValue(word);
  }

  // 使用済みチェック系
  private readonly usedWordList = new Set<string>();
  private isUsedWord(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (this.usedWordList.has(value)) {
      return { isUsedWord: value };
    }
    return null;
  }

  public addUsedWord(word: string): void {
    this.usedWordList.add(word);
  }

  // 先頭始まりチェック
  private nextPrefix: string = "";
  private isNotMatchPrefix(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value.startsWith(this.nextPrefix)) {
      return { isNotMatchPrefix: this.nextPrefix };
    }
    return null;
  }

  public setNextPrefix(word: string): void {
    this.nextPrefix = word.substring(word.length - 1);
  }
}
