import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from '../course-card/course-card';
import { CourseService, Course } from '../course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data.map((post, idx) => ({
          id: post.id,
          name: post.title.slice(0, 20),
          code: `CS10${idx + 1}`,
          credits: 3 + (idx % 2),
          grade: 'A'
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredCourses(): Course[] {
    return this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}