import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

interface Activity {
  title: string;
  description: string;
  dueDate: Date;
}

interface Subject {
  name: string;
  description: string;
}

interface ExtraCourse {
  name: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './home_material.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  upcomingActivities: Activity[] = [
    { title: 'Entrega de trabalho', description: 'Trabalho da disciplina X', dueDate: new Date('2024-07-01') },
    { title: 'Avaliação', description: 'Avaliação da disciplina Y', dueDate: new Date('2024-07-05') },
    { title: 'Chat com o mentor', description: 'Chat com o mentor até a data Z', dueDate: new Date('2024-07-10') },
  ];

  currentSubjects: Subject[] = [
    { name: 'Disciplina A', description: 'Descrição da disciplina A' },
    { name: 'Disciplina B', description: 'Descrição da disciplina B' },
    { name: 'Disciplina C', description: 'Descrição da disciplina C' },
  ];

  extraCourses: ExtraCourse[] = [
    { name: 'Curso Extra 1', description: 'Descrição do curso extra 1' },
    { name: 'Curso Extra 2', description: 'Descrição do curso extra 2' },
    { name: 'Curso Extra 3', description: 'Descrição do curso extra 3' },
  ];
}
