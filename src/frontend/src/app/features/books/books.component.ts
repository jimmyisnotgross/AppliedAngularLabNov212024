import { JsonPipe, CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, resource } from "@angular/core";
import { RouterModule } from '@angular/router'; 

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, JsonPipe, RouterModule], 
  template: `
    <nav>
      <a routerLink="list" routerLinkActive="active-link">Book List</a>
      <a routerLink="stats" routerLinkActive="active-link">Book Stats</a>
    </nav>
    <div class="overflow-x-auto">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      nav {
        margin-bottom: 10px;
      }
      .active-link {
        font-weight: bold;
      }
    `
  ],
})
export class BooksComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}