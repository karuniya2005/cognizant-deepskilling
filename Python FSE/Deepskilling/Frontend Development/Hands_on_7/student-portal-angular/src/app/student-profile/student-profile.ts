import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent implements OnInit {
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('Alex Johnson', [Validators.required]),
      email: new FormControl('alex@student.edu', [Validators.required, Validators.email]),
      semester: new FormControl(6, [Validators.required, Validators.min(1), Validators.max(8)])
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form Submitted:', this.profileForm.value);
      alert('Profile updated successfully!');
    }
  }
}