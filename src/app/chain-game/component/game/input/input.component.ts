import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ChainGameService } from 'src/app/chain-game/service/chain-game.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  readonly gameForm: FormGroup;
  isDisabledSubmit: boolean = false;

  @Output() submitWord: EventEmitter<string> = new EventEmitter();

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private service: ChainGameService,
  ) {
    this.gameForm = this.createGameForm();
  }
  ngOnInit(): void {
  }

  private createGameForm(): FormGroup {
    return this.fb.group({
      word: ['', [
        Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z]+$"),
        (c) => this.notExistWord(c),
        (c) => this.isUsedWord(c),
        (c) => this.isNotMatchPrefix(c)
      ]]
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
    if (this.gameForm.invalid || this.isDisabledSubmit) {
      return;
    }
    if (this.service.isUsed(this.wordControl.value)) {
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
    if (this.service.isNotExist(value)) {
      return { notExistWord: value };
    }
    return null;
  }

  // 使用済みチェック系
  private isUsedWord(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (this.service.isUsed(value)) {
      return { isUsedWord: value };
    }
    return null;
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

  public setWord(word: string): void {
    this.wordControl.setValue(word);
  }

  public setNextPrefix(word: string): void {
    this.nextPrefix = word.substring(word.length - 1);
  }

  // ボタン無効化
  public setDisableSubmitButton(disabled: boolean): boolean {
    this.isDisabledSubmit = disabled;
    if (!disabled) {
      this.input.nativeElement.select();
    }
    return disabled;
  }
}
