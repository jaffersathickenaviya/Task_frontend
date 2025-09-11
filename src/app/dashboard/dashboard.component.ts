import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: any[] = [];

  newApp = {
    app_name: '',
    version: '',
    status: 'Running',
    open_issues: 0,
    resolved_tickets: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/dashboard')
      .subscribe(data => this.dashboard = data);
  }

  addSoftware() {
    this.http.post('http://localhost:3000/dashboard', this.newApp)
      .subscribe({
        next: () => {
          alert('Software added ✅');
          this.newApp = { app_name: '', version: '', status: 'Running', open_issues: 0, resolved_tickets: 0 };
          this.loadData(); // refresh table
        },
        error: (err) => {
          console.error('Error adding software:', err);
          alert('❌ Failed to add software');
        }
      });
  }

  deleteSoftware(id: number) {
    if (confirm('Are you sure you want to delete this software?')) {
      this.http.delete(`http://localhost:3000/dashboard/${id}`)
        .subscribe({
          next: () => {
            alert('Software deleted 🗑️');
            this.loadData(); // refresh table
          },
          error: (err) => {
            console.error('Error deleting software:', err);
            alert('❌ Failed to delete software');
          }
        });
    }
  }
}
