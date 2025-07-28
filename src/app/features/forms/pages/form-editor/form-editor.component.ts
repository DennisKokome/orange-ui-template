import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
  editorContent: string = '<p>This is the initial content of the editor</p>';

  // Since we don't have a dedicated rich text editor library,
  // we'll simulate one with a textarea and some basic formatting options
  fontSizes: number[] = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];
  selectedFontSize: number = 16;

  constructor() { }

  ngOnInit(): void {
  }

  applyBold(): void {
    // In a real implementation, this would apply bold formatting to selected text
    console.log('Bold applied');
  }

  applyItalic(): void {
    // In a real implementation, this would apply italic formatting to selected text
    console.log('Italic applied');
  }

  applyUnderline(): void {
    // In a real implementation, this would apply underline formatting to selected text
    console.log('Underline applied');
  }

  changeFontSize(): void {
    // In a real implementation, this would change the font size of selected text
    console.log('Font size changed to', this.selectedFontSize);
  }

  insertLink(): void {
    // In a real implementation, this would insert a link
    console.log('Link inserted');
  }

  insertImage(): void {
    // In a real implementation, this would insert an image
    console.log('Image inserted');
  }

  alignLeft(): void {
    // In a real implementation, this would align text to the left
    console.log('Text aligned left');
  }

  alignCenter(): void {
    // In a real implementation, this would align text to the center
    console.log('Text aligned center');
  }

  alignRight(): void {
    // In a real implementation, this would align text to the right
    console.log('Text aligned right');
  }

  insertOrderedList(): void {
    // In a real implementation, this would insert an ordered list
    console.log('Ordered list inserted');
  }

  insertUnorderedList(): void {
    // In a real implementation, this would insert an unordered list
    console.log('Unordered list inserted');
  }
}
