import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { concat } from 'rxjs';
import { ApiClientService } from '../service/api-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  readonly gameForm: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ApiClientService
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
    console.log(this.wordControl.value);

    this.api.getWordInfo(this.wordControl.value).subscribe(
      (record) => console.log(record),
      (error) => console.error(error)
    );
  }
}
